---
title: "Fortnite Festival from the Outside"
summary: "Rebuilding Festival's clock, its scoring and the practice mode it never shipped, in Rust, without touching the game."
order: 1
visibility: "published"
canListen: false
---

*Disclaimer: this is done for educational and research purposes only. I will not be making the source code public.*

Through the Fire and Flames runs seven minutes and the part that beats me is deep into it. I played it enough that my hands memorised a wrong version, and now the real notes and the remembered notes fight each other on the way down the highway. I've had that block for over a year, most of the time the song has existed in Festival. Every attempt at the section that's beating me starts at the top of the song.

In any other rhythm game this is solved. I've played them most of my life: osu! around 2016, Robeats religiously through lockdown :note[Robeats because I was deep in the Roblox community at the time, primarily Discord bots and QA for Roblox-related communities. The rhythm game is the part of it I kept.], then [Quaver](https://quavergame.com), where I peaked inside the global top 1,700 in 4K. You convert the chart, mirror it, and your pattern memory stops recognising it, so you read it fresh again. That trick dies in Festival, because Festival is five lanes and a five-lane mirror isn't the clean swap a four-lane mirror is: the middle stays put and the hand balance changes completely. There's no practice mode either, no section looping, no speed control, none of what every rhythm game I've touched in a decade ships with.

I bounced off Festival at launch, for what it's worth: no scroll speed control, the old pre-"pro" colours, and lift notes I could not read at all. What pulled me back was a TikTok showing Magical Cure! Love Shot! in the game. It looked fun, I reinstalled, and I full-comboed it within a few days despite never having played five keys before. Keep the lifts in mind, because the mechanic that ran me off is the one I ended up teaching the tooling to draw.

So I built it. Rust is a language I've spent years in and this was the right kind of problem for it, something I needed and something I'd learn from.

Festival's publicly known Spark Tracks API :note[The most thoroughly researched API in the game, in the sense that everyone who has ever gone looking has found it, and it still only hands back track data.] hands you song data and nothing else. No score, no live state, not even where you are in the song. Everything here reads the game from the outside: it reverse-engineers the scoring off pixels recorded from the screen, and drives an overlay that syncs to a live song by pattern-matching my own playing against the chart. None of it touches the game's code or memory.

## The shape

The order things got built in is why the architecture looks the way it does, and the first piece predates the project by a long way.

I sometimes follow Star Power paths, the optimiser-computed points in a song where activating overdrive is worth the most, and holding a path in your head mid-song is its own problem. So at some point I made a small overlay that fetched the chart's path from CHOpt, watched Festival's log file to see which song had started, and drew the path on screen while I played. It synced by me pressing a key to step through the activations. Manual and dumb, it worked, and then it sat there for months.

The actual project started when Flames finally made me snap. I built the practice client, a whole playable rhythm game pointed at one job. Then I wanted to rewatch my real runs, so replays came next, fed through the same engine. Then I thought I'd like to see my own Festival scores live while I play, and remembered I had already built the log-reading thing. The old path follower got absorbed as the companion, grew a leaderboard of my previous scores, and lost its manual key press for something much better.

That reuse is the whole design. The client already had hit detection, scoring, a highway and a results screen, which is everything a replay needs. Capturing what happens in the real game and feeding it through the client I already trust beats building a second scorer that would drift out of agreement with the first. Everything gets judged by the same engine, whether the notes came from a practice run or from Fortnite.

It's a Rust workspace of three crates. `core` is the shared library: chart parsing, AES MIDI decryption, the SQLite database and settings. The launcher is a [Tauri](https://tauri.app) 2 app with a React frontend that owns everything outside the highway. The practice client is a third crate the launcher spawns as a separate process.

```bash [tree]
crates/
├── core/       # shared: chart parse, AES decrypt, SQLite, settings
├── launcher/   # Tauri 2 + React: song list, analysis, sections, replays, overlay
└── practice/   # macroquad + egui gameplay client, spawned per session
```

The two processes deliberately share almost nothing: a SQLite database in WAL mode, an argv contract, and an exit code. The launcher owns the song list, section management and analysis. The client keeps its verified timing and scoring stack and the launcher never links against it, so neither can quietly break the other.

Inside, the client is a game state machine. :speak[macroquad]{as="macro-quad"} handles the 3D rendering of the note highway and :speak[egui]{as="ee gooey"} handles menus and HUD as an immediate-mode overlay; each frame polls input, advances logic and renders. Its states are short, because most of them went away when it moved under the launcher.

```rust [practice/app.rs]
enum AppState {
    Practicing(PracticingState),
    Results(ResultsState),
    WatchingReplay(WatchingReplayState),
}
```

The old `Loading`, `SongSelect`, `Playing` and `Paused` states are gone. Song browsing belongs to the launcher now, so a spawned client goes straight into gameplay. Live play always enters `Practicing`, where a full song is simply a section spanning the whole chart; from there it moves to `Results`, or, when the launcher spawns it with `--replay`, into :speak[`WatchingReplay`]{as="Watching Replay"}, where recorded input events run back against the original chart. Some of this diverges from Festival on purpose, because it was built around how I wanted to practise rather than as a clone, and most of those differences are settings you can tune.

## Charts

Each decrypted MIDI carries instrument tracks at four difficulty tiers, and the MIDI note numbers map to fret positions.

| Difficulty | MIDI note range | Frets |
| ---------- | --------------- | ----- |
| Easy       | 60-63           | 4     |
| Medium     | 72-75           | 4     |
| Hard       | 84-87           | 4     |
| Expert     | 96-100          | 5     |

Markers around those encode the mechanics. Note 116 defines overdrive phrase boundaries, where note-on starts a phrase and note-off ends it. Base+6 through base+10 are lift notes. Notes sharing a MIDI tick are detected as chords. What comes out the other side is one struct per note.

```rust [core/chart/note.rs]
pub struct Note {
    tick: u32,
    time_ms: f64,
    fret: u8, // 1
    sustain_ticks: u32,
    sustain_ms: f64,
    sustain_beats: f32, // 2
    flags: NoteFlags, // 3
}
```

:clause[The fret is 0 to 4]{n=1}, green through orange. :clause[The sustain is kept three ways at once]{n=2}, in ticks, milliseconds and beats, because the highway scales tails by beat and the scorer pays them by beat while everything else runs in milliseconds. :clause[The flags are a bitfield]{n=3} from the `bitflags` crate: tap, overdrive, lift, chord. The same MIDI also carries a SECTION track of named landmarks, intro, verse, chorus and so on, and the launcher reads those as the anchors you build practice sections around.

## The clock

The client's audio position originally came straight from the audio engine. That was the wrong source of truth, and it took a while to admit it.

The engine reports position in roughly 45ms steps, one audio buffer at a time. The first release smoothed the steps over with interpolate-then-snap logic, which traded visible stepping for wobble and was not an improvement. In a game where the perfect window is ±25ms, a clock that quantises at 45ms is disqualified before the smoothing starts.

The fix inverts the relationship. A wall-anchored timer is the position: anchor the moment playback starts, advance on the monotonic clock, re-anchor on every seek, pause and speed change. The engine's reported position is consulted only as a drift check, through one small pure function that takes the predicted position and the raw report and returns a correction only when they disagree by more than 150ms.

When I finally probed the engine headless for a full song, it tracked the wall clock within ±7ms over 412 seconds with all five stems in lockstep, which means the safety net has likely never fired in anger. The stepping was the problem, not the engine's accuracy.

At practice speeds the anchor advances at the playback rate, so slowing a section to 0.5x slows time itself. The highway, the count-in and the hit windows all stay glued to the audio for free, and because hit windows are defined in chart time, half speed also means double the real-time margin for your hands, which is the entire point of a practice speed.

## Sections

Sections are created against a picture of the song rather than typed as timestamps. The launcher renders the whole chart as a notes-per-second heat strip, resampling the cached 500ms NPS buckets into a fixed number of columns with area weighting so long songs don't alias, and draws the chart's own section names underneath as landmarks. You drag across the strip and the create form prefills with the range. Clicking a section label snaps to that section exactly and takes its name.

Saved sections live in the shared database and each row has a play button. Launching one forwards the range on the command line as `--range-start-ms` and `--range-end-ms`, and the client turns that into a synthetic section through the same code path a chart section uses, so count-in, looping and auto-restart behave identically whether the range came from the chart or from a drag.

On the client side the practice engine in :speak[`game/practice.rs`]{as="game, practice dot r-s"} runs the loop. A count-in plays the audio with no notes for a number of beats, four by default, so you can orient yourself before notes appear. Auto-restart watches the miss count during a section and loops back to the start, count-in and all, once it crosses the threshold. Every run, a whole song or a single section, is recorded as a stream of timestamped fret presses, releases and overdrive activations, saved to the shared database as one row: the summary next to the whole event list. A run you quit halfway is kept too, and replays exactly that far.

## The scoring

The engine agrees with the game to within 25 points on a 335,000-point run, and every constant in it traces to a frame of recorded gameplay. The reason any of it exists is that I was convinced my own client was broken.

It started with Paradise City. Playing it in the client felt late compared to Festival, off in a way I couldn't pin down, and it was driving me mental. So I recorded myself playing it in Fortnite, recorded the same song in the client, and compared the two videos frame by frame expecting to find drift. There wasn't any, the notes were exactly on time in both.

The real cause was the stem mix. The client boosts the lead stem, the instrument you're playing, at 1.5x to copy Festival's you-hear-yourself behaviour, and it was loud enough to warp my sense of where the beat was. The client was innocent, my ears were the bug.

The comparison rig turned out to be worth far more than the bug it acquitted. Two recordings and a frame counter. If I could line video up against the client's scoring, I could line video up against Festival's scoring, and Festival publishes every number that matters, sixty times a second, in the corner of the screen.

The rules as they actually are:

| Rule            | Value                                                                              |
| --------------- | ---------------------------------------------------------------------------------- |
| Base note       | 30 points                                                                          |
| Perfect (±25ms) | ×1.2 → 36                                                                          |
| Good (±100ms)   | ×1.0 → 30                                                                          |
| Combo           | Delayed: steps every ten notes, the eleventh is the first 2x                       |
| Combo cap       | 4x lead and drums · 6x bass and vocals                                             |
| Sustain         | 12 points per beat × combo; under one beat pays nothing                            |
| Overdrive       | ×2 on whatever is true; the window extends when another phrase completes inside it |

### The screen as an answer key

I worked those rules out myself, and a rule you've worked out is a guess until something independent agrees with it. Festival is that something. It prints the real score in the corner of the screen, sixty times a second.

So the check is a loop. Play a song in the real game, record it at 60fps, and capture every input with a timestamp. Replay those inputs through the client's engine and it predicts a score. Then crop the game's own counter out of every frame, binarise it and OCR it: 18,671 frames for one run. The OCR never scores anything. It's the answer key the prediction gets marked against.

And it's a very good answer key. The counter snaps instantly on every note, and a cumulative, monotonic counter sampled at 60Hz isn't a picture of the score, it's a ledger of every note's exact value. On a full combo with no overdrive the comparison is total. Combo equals note index, so the multiplier schedule is fully determined, and every increment factors uniquely as a perfect or a good at a known multiplier. The prediction doesn't just have to land on the right total. It has to agree with the game on every single note.

That's also where the edge cases had to hold up. The results screen number is a count-up animation, which matters if a screenshot catches it mid-roll and the game appears to disagree with itself by six and a half thousand points. Sustains under a beat pay nothing: an entire section of quarter-beat trails paid a flat +144 per note, no trickle. Qualifying sustains are multiplied: one isolated 1.5-beat hold, sitting before an eleven-second break with nothing else to contaminate the reading, paid exactly 72 points, which is 18 for the sustain times the 4x multiplier that supposedly never applies there.

A second recording with overdrive checked the window-extension rule the same way, from the lengths of the doubled regions alone. When the engine's predicted total first landed within spitting distance of the game's real one, my honest reaction at the desk was: what have I made? At that point it wasn't a practice tool. I'd made an entire rhythm game.

### The last few hundred points

The last few hundred points are not reachable, and the reason is better than a bug. The remaining gap comes from the game sampling input on its own tick. The design window for a perfect is ±25ms, but Unreal judges a keypress on its engine's schedule while the capture timestamps the same keypress on a wall clock, so the edge of the perfect window never lines up exactly with real time. Measured from outside, the effective boundary between the two clocks landed at 27.0ms in one session and 25.5ms in another, with mixed early and late signs that rule out a constant offset. A dense chart stacks enough notes right on that boundary that the wobble is worth a few hundred points on any fixed window.

:::fig{caption="The perfect-window boundary as measured from outside the game. The design window is ±25 ms, the two sessions landed at 25.5 ms and 27.0 ms, and the engine adopts the midpoint of the two measurements."}
::bar-chart
---
axis: true
max: 30
data:
  - label: Design window
    value: 25
    display: 25 ms
  - label: Session B
    value: 25.5
    display: 25.5 ms
  - label: Session A
    value: 27
    display: 27.0 ms
  - label: Adopted
    value: 26.25
    display: 26.25 ms
    em: true
---
::
:::

The engine takes the midpoint, 26.25ms, and stops there, because the residual isn't an error in either scorer. It's two clocks watching one finger and disagreeing about the edge. The verification loop is the same every time: play a session in the real game, capture every input with timestamps, score it through the one engine, and compare against what the game displayed, note by note when a recording exists.

## The anchor

The companion side of the launcher needs to know what's happening inside a running song. Festival's API only lists songs and says nothing about a live one. Fortnite tells you anyway, if you listen in the right places, but it takes two of them and neither is enough alone.

### The log

The first place is the log file. The game writes `LogPilgrim*` lines :note[Pilgrim is Festival's internal codename.] for every meaningful transition, so tailing the log and running each line through a handful of regexes gets you a clean event stream.

```rust [companion/log.rs]
pub enum LogEvent {
    SongStarted { instrument: Instrument, difficulty: String }, // 1
    SongLoaded { song_id: String }, // 2
    SongIntro, // 3
    EnteredBackstage,
    LeftBackstage,
    StoppingSong,
}

static DIFFICULTY_REGEX: Lazy<Regex> = Lazy::new(|| {
    Regex::new(r"LogPilgrimGameEvaluator: \[....\] : Song data set\. [0-9]* gems found for ").unwrap()
});
```

Three lines out of that file matter. The :clause[song data line]{n=1} carries the instrument and the difficulty, the :clause[loading line]{n=2} carries the id, and reaching the :clause[intro state]{n=3} is what finally arms the matcher.

That stream tells you which song started and on which instrument, but not where the player is inside it. The song-started line is honest about the fact and useless as a clock: it fires around the start, not at it, off by a second or so, and in multiplayer the gap varies with loading and connection wait. A second doesn't sound like much until you remember a dense chart runs 16 notes a second. So the log arms the matcher and does nothing else.

### The pattern

I sat on the rest of this for ages and pivoted more times than I want to admit. OCR off the screen was the obvious idea, and it's disqualified by its own delay. The log is off by a second. At one point I was ready to track by measure and just eat being a little wrong. Locking onto the first note the player hits sounds right and dies to reality, because one stray tap while waiting for the song anchors the whole overlay to a lie.

What actually cracked it was noticing I had already built the answer. Replay mode is an engine whose entire job is taking a stream of timestamped presses and running it against a chart, and a live Fortnite session is that same stream arriving in real time. So the companion runs replay mode in the background on my own keys, and the only thing it still needs from Fortnite is where zero is. The player is the clock, but plural: not one press, a pattern of them.

Fret presses are captured with `GetAsyncKeyState` polling on a dedicated thread, timestamped on the monotonic clock into a small ring buffer. The same poll reads the fret bindings from the shared settings, so it always watches the keys you actually play on.

Polling over a keyboard hook is deliberate and it's about latency. A low-level hook (`WH_KEYBOARD_LL`) inserts itself into the input delivery chain, so every keystroke in the system synchronously waits on your callback before the game sees it, and a slow moment in your process becomes input lag in theirs. Polling never touches that chain. It reads the key state table Windows already maintains, the game's input path stays exactly as long as it was, and the worst the companion can do to your timing is nothing at all.

The chart's opening is reduced to onset groups: clusters of note times with the lanes they occupy. Incoming presses get clustered the same way, and the matcher tries to align the two sequences. It takes a window of the first few onset groups, derives the offset that would map a candidate press cluster onto the first onset, and checks whether the following clusters land within tolerance of the following onsets on compatible lanes. A skip parameter slides the window forward, so a pre-tap or a flubbed opening note can't poison the lock.

```rust [companion/match.rs]
const MATCH_TOL_MS: f64 = 120.0; // 1
const MATCH_GROUPS: usize = 3; // 2

pub enum Lifecycle {
    Disarmed,
    Listening,
    Locked, // 3
    Degraded, // 4
}
```

:clause[Each onset has to land within 120ms]{n=1}, half an NPS bucket, and :clause[three distinct groups have to agree]{n=2} before anything commits. :clause[Then the offset becomes the anchor]{n=3}: song position is the monotonic clock minus that offset, from then on, forever, with no further press needed. :clause[If ten seconds pass with no clean lock]{n=4}, it falls back to a rough wall-clock estimate from the song-started line rather than showing nothing at all. You sync the overlay to the game by playing the game. The opening notes are the handshake.

## The overlay

The overlay is a native Win32 layered window, per-pixel alpha, clickthrough, always on top, drawn with GDI rather than a webview, because it has to coexist with a fullscreen game without stealing input or a compositor's worth of resources.

What it draws is the chart as a difficulty graph: the whole song's notes-per-second curve with a sweep line riding across it at the locked position, so the dense stretch is visible before it arrives, and a live score checked against my previous scores on that chart so a run has something to beat.

:video-clip{src="https://x.dromzeh.dev/ShareX/2026/07/fnf-ingame-overlay.mp4" caption="Beyond the Flame (Expert Lead) in-game, the overlay pinned bottom right. The sweep line rides the difficulty graph at my position, with a leaderboard of my previous scores above it. None of it reads the game: it runs entirely off the pattern-match lock from the opening notes. The clacking is my keyboard through the mic, the closest this build gets to hitsounds."}

:::fig{caption="Two sources, one anchor. The log says which song and arms the matcher; the key poll supplies the presses. Once three onset groups agree, everything downstream runs off the monotonic clock and neither source is consulted again."}
::flow-diagram
---
columns:
  - - id: log
      title: Log tail
      sub: LogPilgrim lines
    - id: keys
      title: Key poll
      sub: GetAsyncKeyState
  - - id: matcher
      title: Onset matcher
      sub: 3 groups, 120 ms
  - - id: clock
      title: Locked clock
      sub: Monotonic minus offset
  - - id: overlay
      title: Overlay
      sub: Difficulty graph, score
    - id: path
      title: Path box
      sub: Overdrive activations
edges:
  - from: log
    to: matcher
    label: Arms
  - from: keys
    to: matcher
    label: Presses
  - from: matcher
    to: clock
  - from: clock
    to: overlay
  - from: clock
    to: path
---
::
:::

### The path box

The overlay's other half is the descendant of that first path follower, minus the part where I press a key to advance it. A path box sits on top of the highway, pinned wherever I want it, listing the overdrive activations CHOpt worked out for the chart, with the one you're on marked.

Making that mark track the run on its own is the hard part, because Fortnite never tells the overlay where you are in the path any more than it tells it the time. It infers that too. A scoring pass runs over the run so far and counts the double-score windows you have actually opened, not the ones you whiffed, and that count is the index into the path list, so the marker only moves when the game moves.

Activation is detected the same way position is: your own key. Hitting the bound overdrive key records an activation into the capture and steps the highlight forward. Whether that press did anything is decided afterwards, by scoring it against the star power you had banked at that moment. Fire with an empty bank and you open no window, and the box flashes for a couple of seconds to tell you the activation was wasted.

Underneath, a status line reads the windows you've opened against how many the path expects by now, so you can see whether you're on plan, ahead of it, or behind. There's no callout for a mistimed phrase; a skipped or early activation shows up as running behind, and as the live score slipping under the leaderboard mark.

The count can drift. It rides on the lock holding, the clock staying aligned to the game, the scorer matching every activation to a window, and a 5ms input poll that can miss a fast double-tap. Any of those can leave it a window ahead or behind where you really are in the printed path. So two keys nudge the highlight by one in either direction, and a third freezes the auto-tracking once it's right, so a good manual correction isn't overwritten on the next pass.

The scoring pass runs slow on purpose. It re-reads the run about once a second, so the leaderboard score trails Fortnite's instant counter by up to a beat. Recomputing the whole run continuously would put real work right next to the input capture, and the companion's one rule, the same reason it polls the keyboard instead of hooking it, is to never cost the game a millisecond.

## Replays

A replay is a real run fed back through the same engine, so the client can show you the run the way the game never does. Seeking inside one works by replaying every recorded event from the start up to the target timestamp, reconstructing combo, score, overdrive meter and sustain states at that point, which is cheap because the event list is already in order.

The viewer has an analysis mode. Turn it on and every note wears its timing from the moment it spawns rather than the moment you would have hit it: gold when the press landed inside the perfect window, blue when it was early, pink when it was late, a dark X where the note was missed. A whole run's timing reads at a glance, so a section that's quietly rushing shows up as a wall of blue long before it ever costs you a note. None of that is numbers on screen. The millisecond spread shows in a corner histogram, and the full per-note breakdown lives in the headless timing tools.

:video-clip{src="https://x.dromzeh.dev/ShareX/2026/07/replay-btf-fnclient-analysis.mp4" caption="The same Beyond the Flame run in the client's replay viewer, the original Fortnite capture in the corner. One chart time drives both, so the highway and the real footage stay locked frame for frame. Analysis mode, toggled through the clip, tints each note by how it was timed: gold inside the perfect window, blue early, pink late, a dark X for a miss."}

Both are driven by one chart time, so the client's highway and the game's own footage stay locked frame for frame. That's the end-to-end check. If the replay, the timing and the scoring agree with what actually happened, they agree with the video too.

## Lifts

Path images come from [CHOpt](https://github.com/GenericMadScientist/CHOpt), a Star Power path optimiser built for Rock Band and the like with Fortnite Festival support. The launcher's relationship with it is stranger than it should be. It ships two builds side by side, stock CHOpt and a fork with Festival's scoring model patched in, and the counterintuitive part is which binary does what.

The fork runs with `--engine rb` and produces the path text; stock runs with `--engine fnf` and produces the score and the image. It reads exactly backwards, and it's the empirically proven recipe: the fork's scoring model makes the right activation decisions but doesn't total correctly, stock totals correctly but paths worse, and no single binary gets both right. Every song runs through both and the launcher stitches the results into one answer.

The image half is where lifts come in. Stock CHOpt supports Festival but didn't know lift notes existed. Its parser's note range stopped short of the lift markers, so they were dropped before the renderer ever saw them. In the MIDI, lifts live at fixed offsets above each difficulty's base note, keys 102 to 106 on Expert, one per lane. :note[The green-lane lift shares a key with a force marker, and in Festival charts the lift reading wins.]

The patch is three small layers on [a branch](https://github.com/dromzeh/CHOpt/tree/lift-triangles), and the first layer isn't in CHOpt at all. Chart parsing lives in [SightRead](https://github.com/GenericMadScientist/SightRead), a separate library CHOpt pins as a submodule. SightRead reads the MIDI into the note stream CHOpt paths and draws over, so a note class it never emits is one CHOpt can never see. The flag has to start there.

```c [sightread/note_track.hpp]
enum NoteFlags : std::uint32_t {
    // ...
    FLAGS_FORCE_STRUM = 1U << 7,
    FLAGS_LIFT        = 1U << 8,
    // ...
};
```

A collection pass walks the MIDI track once and records where lifts occur. Each difficulty's five lift keys are `base + 6` through `base + 10` in green-to-orange order, so the lane is the key minus that base, and a velocity-zero note-on is skipped. :note[A note-on with velocity zero is a note-off in disguise.] An application pass then sets the flag on any real note sharing a lift's tick and lane, and touches nothing else. That last part is the whole safety argument: positions, lengths, counts and every other flag stay exactly as they were, so the optimiser is handed an identical chart. Both passes run only for the Fortnite track type, and both hang off one line in the note builder.

```c [sightread/midi_parser.cpp]
auto notes = notes_from_event_track(event_track, {}, TrackType::FortniteFestival);
apply_fortnite_lifts(notes, fortnite_lifts_from_midi(midi_track));
```

Rather than fork the parser library for a flag and two passes, the branch vendors it: the submodule becomes plain committed files with the patch applied, which keeps the whole change self-contained in one branch CI can build with no upstream involvement.

From there CHOpt carries the flag from a parsed note to a drawn one. The image builder fills a per-lane lift mask on `DrawnNote`, set only for the note's active lanes and only when the flag is present, and the renderer reads that mask back out as a bitfield to decide what to draw. A note whose every active lane is a lift is drawn as triangles only, so its sprite is suppressed; a lift lane sitting over an otherwise normal note gets a triangle on top of the usual sprite.

```c [chopt/image_builder.cpp]
constexpr int HALF_WIDTH = 4;
constexpr int HALF_HEIGHT = 5;

const auto apex_x = x + HALF_WIDTH; // 1
const auto base_x = x - HALF_WIDTH; // 2

m_image.draw_triangle(apex_x, cy, base_x, cy - HALF_HEIGHT,
                      base_x, cy + HALF_HEIGHT, colour, 1.0F); // 3
```

:clause[The apex points right]{n=1}, down the lane, and :clause[the base sits behind it]{n=2}, nine pixels tall. It's drawn in the :clause[lane's own colour]{n=3} with a 1px black outline, which is enough to read at path-image scale without competing with the sprites. Regression on both engines confirmed non-Festival output byte-identical and Festival paths unchanged.

## The end

I won't be releasing the client or its source, and the reason is the project's own design. Everything here works from the outside: it reads the screen, tails the log, captures my own keys. Those are exactly the primitives an autoplay cheat needs, minus one step I have no interest in providing. Festival's leaderboards already carry obvious cheaters and nothing much seems to happen to them, so I'm not adding a starter kit.

I've left out the audio import, the per-chart offset calibration, and the settings layer that keeps the launcher and the client agreeing about which keys are which.

And the song that started it: thanks to the client I can read Flames lead consistently now, and I full-combo it in there almost every run. In Fortnite itself I still haven't, because somewhere in the last two minutes my nerves show up, every time, and that is not something a practice client can fix.
