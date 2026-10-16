const FREQ = 440;
const PEAK = 0.02;
const DECAY_MS = 90;

let ctx: AudioContext | null = null;

export function tick(semitones = 0) {
  if (reducedMotion()) return;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = FREQ * Math.pow(2, semitones / 12);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(PEAK, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + DECAY_MS / 1000);

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + DECAY_MS / 1000 + 0.02);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}
