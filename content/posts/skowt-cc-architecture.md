---
title: Type What You Remember
summary: How skowt.cc is built, and how a database learned to answer "does anyone know an asset with…"
order: 3
visibility: published
---

Nobody remembers a filename. They remember the blue hair, and that it was from that one game. The file is called `IMG_4471.png`. A filename search was never going to find it.

[skowt.cc](https://skowt.cc) is an asset database for game art. Contributors upload assets, a lot of them from :speak[gacha]{as="gah-cha"} games, and other people pull them back down, often a few hundred at once. It has run since 2022 :note[First as a raw file index, then as wanderer.moe, now as skowt. Same data the whole way through, on SQLite and now Postgres.] on one bias: keep the request path cheap, and never make the API do work it can hand to something else.

The bias is older than the design. I started it at 15 as an [h5ai](https://larsjung.de/h5ai/) directory listing on a VPS running on student credits. People couldn't use it, so it got a real frontend in [SvelteKit](https://svelte.dev), and since I was broke, the frontend was also the storage: every asset pulled in with `import.meta.glob` at build time and shipped inside the site, about 500MB of it. No server, because a server was a bill.

The first money I had went on an API, a Worker that did nothing but index R2. The habit stuck. Every request should be as close to free as it can be, because for years free was the budget.

It sounds like a lot of effort for something this niche. It isn't, for two reasons. The site kept getting bigger, and at some point a thing that handles more has to handle whatever gets thrown at it, so the design either grows up or falls over. And skowt is where I try things out on real people. It has never made money, but it has a userbase, and that is the one thing a side project can't buy: something ships, and within a day I know whether anyone wanted it. This is how it holds up now, and why the search is the part I'm proudest of.

## The shape

It's a monorepo. `apps/web` is a [TanStack Start](https://tanstack.com) SPA, `apps/server` is an [Elysia](https://elysiajs.com) process on [Bun](https://bun.sh) with a [tRPC](https://trpc.io) adapter mounted on it, and `apps/asset-redirect` is a Cloudflare Worker that owns the public read path. Everything lives in [R2](https://developers.cloudflare.com/r2/) under plain file names, originals included, and the worker exists so nobody can reach an original by guessing its name: every image read resolves at the edge, gets redirected or refused there, and never enters the API. Two more apps do inference: a small CPU sidecar that turns a search query into a vector and embeds new uploads in the background, and a GPU image on rented hardware that captions every asset and embeds it on the fast path. The split is about who's waiting. Every text search embeds its query while someone watches the spinner, so that model has to be always on, and the GPU scales to zero between uploads. A CPU process that's running anyway, with both towers already in memory, can embed a new upload in the background for nothing, and nobody minds that it takes a few seconds.

:::fig{caption="The serving side. Images and zip packs resolve at the edge worker and never touch the API. Everything else is one typed tRPC client into the Elysia process, which owns the three stores."}
::flow-diagram
---
columns:
  - - id: browser
      title: Browser
      icon: earth
      sub: apps/web
    - id: bot
      title: Discord bot
      icon: discord
      sub: Slash uploads
  - - id: worker
      title: Edge worker
      icon: workers
      sub: apps/asset-redirect
    - id: api
      title: API
      icon: server
      sub: Bun + Elysia
  - - id: r2
      title: R2
      icon: database
      sub: Files
    - id: postgres
      title: Postgres
      icon: postgres
      sub: Database
    - id: redis
      title: Redis
      icon: redis
      sub: Sessions, queues
edges:
  - from: browser
    to: worker
    label: Images
  - from: browser
    to: api
    label: tRPC
  - from: bot
    to: api
    label: Same ingest
  - from: worker
    to: r2
  - from: api
    to: r2
    label: Presigned
  - from: api
    to: postgres
  - from: api
    to: redis
---
::
:::

Three stores, each holding what it's best at. Relational data lives in [PostgreSQL](https://www.postgresql.org) 18 on [Railway](https://railway.com), with [pgvector](https://github.com/pgvector/pgvector) and [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html) loaded, so search is indexes and columns in the same database rather than a separate service. Files live in [Cloudflare R2](https://developers.cloudflare.com/r2/). [Redis](https://redis.io) holds the ephemeral state: sessions, rate-limit windows, download batches, the enrichment queue, and a cache in front of the hot reads.

### One dataset, two engines

It wasn't always Postgres. For most of its life the database was [Turso](https://turso.tech), hosted [libSQL](https://github.com/tursodatabase/libsql), which is SQLite with a server in front, and for a long time that was plenty. Then skowt kept growing, and v6 wanted things SQLite was never going to be good at: real search indexes, 3D models with structured metadata, and a lot more rows. Turso had also just been bought by Supabase, so the ground under it was moving anyway.

The scale part made itself clear when one SQLite query plan decided to walk the whole asset table, the database wedged on it, and every API request queued up behind it until the server ran out of memory. Nothing bounded a bad query, so one bad query took the site down.

Postgres wouldn't have picked a better plan by itself. What it has is the tooling to catch a bad one, `EXPLAIN ANALYZE`, `pg_stat_statements` and real statistics, plus actual `timestamptz`, `boolean` and `jsonb` columns where SQLite had integers and text doing impressions. v6 shipped on it.

The move itself is three scripts, each safe to re-run. The first loads a dump of the old database into a SQLite file, the second runs v6's migrations on it, and the third copies every table into Postgres parents-first in one transaction, then compares every row back. On the production data that was 43,616 assets with every table matching, in under 80 seconds over the internet, and an embedding that read back bit for bit.

Point-in-time recovery came with the move. Every WAL segment is archived, and a restore drill to an exact second took 2 minutes 26 seconds, from the request to a copy whose md5 over every row matched the source. A backup nobody has restored from is a hope, so the drill ran before any traffic did.

## Plans

A database is exactly as fast as the plan it picks, and both of skowt's worst days came down to one bad plan.

First, a quiet game's page read all 43,000 rows to fill a single page. A week later the "more from this category" row on an asset page did the same for a rare category: it walked the whole status index looking for a handful of matches, once per asset page view, and that's the query that wedged the database. Neither query was slow on average. The busy games and the common categories were fine. The rare ones fell off a cliff, and rare is exactly what an average hides.

The fix both times was an index in the query's own shape, so it seeks straight to its rows instead of filtering its way there.

```ts [asset.ts]
index("asset_category_status_created_idx").on(
  table.categoryId, // 1
  table.status,
  table.createdAt, // 2
  table.id, // 3
)
```

:clause[The category comes first]{n=1}, so a rare category is a short range of the index rather than a needle in all of it. :clause[Status and date follow]{n=2} in the order the query filters and sorts, so "approved, newest first" is a backwards read with nothing left to sort. :clause[The id breaks ties]{n=3}, which is what keyset pagination needs to resume at an exact row. On a copy of production the related-files query now takes 0.07 to 0.13 ms. The game page has the same index with the game first: 0.3 ms for a game with 29 files, 1.5 ms for the busiest, with 15,911.

Postgres can also bring that failure back on its own. Drivers prepare statements by default: parse once, plan once, reuse. After five runs of the same named statement, Postgres is allowed to swap the real-parameter plan for a generic one, a single plan for every input, and a generic plan can't tell a rare category from a common one. That's the incident above, rebuilt as an optimisation.

```ts [client.ts]
return postgres(url, {
  prepare: false, // 1
  connection: {
    statement_timeout: limits.statementTimeoutMs, // 2
    lock_timeout: limits.lockTimeoutMs,
    idle_in_transaction_session_timeout: limits.idleInTransactionTimeoutMs,
  },
})
```

:clause[Every statement goes out unnamed]{n=1}, so Postgres plans each one with its real parameters. It costs one extra round trip per parameterised query, which is cheap next to a plan that walks the table, and it keeps PgBouncer in transaction mode workable if it ever goes in front. :clause[Every session starts with its limits]{n=2}, sent in the startup packet, so no statement runs before they apply.

Those limits are the other half. On SQLite nothing bounded a bad query, so one bad query became everyone's problem. Now every layer has a ceiling, each a little above the one below it: 5 seconds per statement and 3 waiting on a lock, 10 seconds per API procedure, a pool gate that lets 500 queries wait for 10 connections and none of them for more than 3 seconds, and 12 seconds before the web server gives up on the API. A bad plan costs one request a 503 instead of costing everyone the site. Scripts and migrations get presets of their own, so a backfill isn't cut off by limits meant for a page view.

None of the numbers are guesses. A script runs the real API procedures against a database and `EXPLAIN ANALYZE`s every statement they send. On a copy of production, 45 of the 46 hot statements run in 0.03 to 3.1 ms. The 46th is the two-letter name search, a sequential scan at 20 to 30 ms, and I've left it there on purpose. No index serves a two-character substring, and the fix that would, matching only at the start of a word, changes what people see when they search two letters. That's a product decision dressed up as a database one, so it stays a scan, cached for two minutes.

Every database also runs the builtin `C.UTF-8` collation, so text sorts by code point exactly the way SQLite's did. Keyset cursors over names resume where they did before the move, and no operating system update can reorder an index underneath them.

## Uploads

The API never handles file bytes. An upload is a three-step handshake and the server only touches the first and last step.

A presigned PUT pins nothing. Not the content type, not the byte count. The browser can declare a 2MB PNG and push 400MB of whatever it likes at the URL, so `commitUpload` treats the object as hostile and re-derives the truth off one read.

```ts [commit-upload.ts]
const head = await bucket.head(key) // 1
if (head.size > MAX_BYTES) return reject(key, "too large")

const uploaded = await bucket.get(key)
if (!hasImageSignature(uploaded)) return reject(key, "not an image") // 2

const bytes = stripMetadata(uploaded) // 3
const hash = sha256(bytes) // 4
if (await findDuplicateByHash(hash, pending.id)) // live rows only
  return reject(key, "duplicate")

const variants = await derive(bytes) // 5
if (!variants.thumb || !variants.preview) return reject(key, "variants failed")
```

:clause[It stats the size]{n=1}, which is the only real size enforcement in the flow, capped at 50MB. :clause[It checks the magic bytes]{n=2} and rejects anything that isn't an image, whatever the browser said. :clause[It strips the metadata]{n=3}: EXIF with its GPS and camera fields, XMP, IPTC and text chunks come off losslessly, and the stored original is rewritten with the clean bytes before the row can go public. A file the stripper can't walk is rejected rather than kept dirty. :clause[It hashes the clean content]{n=4} and checks it against every live asset, so the same bytes can't enter twice. :clause[And it generates the thumbnail and 1024px preview fail-closed]{n=5}: a commit that can't produce both is rejected rather than letting a broken original in. Every rejection purges the object and the pending row, so the moderation queue never shows a ghost with no bytes behind it.

The lookup is the fast path, there so a duplicate gets a friendly message. The guarantee is a partial unique index on `asset(hash)` over live rows, `WHERE status IN ('approved', 'pending')`. It covers live rows only because denied and deleted uploads keep their hash, and uploading those bytes again is allowed. Two identical files committing at once can both pass the lookup, but only one gets past the index. The other gets the same 409 as any duplicate, naming the asset that won, and cleans up everything it wrote: the pending row, the original, and the thumbnail and preview.

Untrusted uploads write to a `limbo/` prefix that the edge worker refuses to route at all. A pending upload physically sits somewhere unservable until a moderator copies it to the public prefix. That split is enforced by storage layout, not by an access check I have to remember to write.

## The read path

For a long time downloads had no gate. Anyone could construct a CDN URL and skip the counter, and the thumbnails leaned on Cloudflare's image resizing, which ran into the hundreds some months. The whole read path now sits behind a Worker, and the public read policy is one pure function.

```ts [decide.ts]
export function decide(host: string, path: string): Decision {
  const preview = rawPreviewRedirect(path) // 1
  if (host === "images.wanderer.moe") // 2
    return { kind: "redirect", to: preview ?? `https://pack.skowt.cc${path}` }
  if (preview) return { kind: "redirect", to: preview } // 3
  if (isPublicReadKey(path)) return { kind: "serve", key: path.slice(1) } // 4
  return { kind: "deny" } // 5
}
```

:clause[A raw original, `asset/{id}.{ext}`, maps to its preview]{n=1}, whatever the extension, so a new file type is locked from the day it arrives. :clause[The old wanderer.moe image domain only ever redirects]{n=2} and never reads the bucket. :clause[On skowt's own host the raw-original redirect wins first]{n=3}, before any serve decision, even though the object exists. :clause[The allowlist is derived files only]{n=4}: thumbnails and previews, a 3D model's viewer files, game art variants and the animated game headers, each matched by an exact shape. `limbo/` has no branch, `trash/` has no branch, and :clause[everything else 404s]{n=5} before the bucket is ever read. Every read that does happen is cached at the edge, because each one is billed.

The redirect, not a 404, is deliberate. Previews were always meant to be public, and years of asset URLs are sitting on Pinterest and in Google, which is traffic I want. So every URL that was ever posted still resolves, old domain included. It just lands on the preview now, and the original is only reachable through a presigned GET. Deleting an asset moves its public files into the private `trash/` prefix, so a deleted file stops resolving the moment it's gone.

::scene-decide
Five requests through the policy. The last column is whether R2 was asked, and the point of the figure is how often it says no.
::

Downloads are presigned too. For years they didn't need to be: nothing required a login, so a presigned link would only have stopped the polite. That changed when downloading started to need a Discord sign-in, which is how one person keeps abusive users off the site. A sign-in check is only real if there's no way around it, so the originals had to stop being public URLs. The worker made the direct URLs dead, and the presigned GET became the only path left to the bytes.

`downloads.generate` checks who's asking, verifies the ids, records the batch in Redis, ticks each file's download count at most once a day per account, and mints a short-lived presigned GET per asset. Recording and delivery are one call, so an honest client can't skip the counter.

Whole-game packs bake nothing. `downloads.generatePack` builds a manifest from the live database, cached for at most a minute, and returns one [HMAC](https://en.wikipedia.org/wiki/HMAC)-signed URL. The worker verifies it, pulls the manifest back from the API, and streams a store-mode zip. Store mode means the archive size is computable up front, so the browser gets a real `content-length` and an honest progress bar instead of chunked encoding's shrug.

## Search

Searching by filename is one filter on the asset query. Searching for what's actually in the picture is a different problem, and the way to get there is to start with the filename search and keep breaking it.

The first version was the one everybody writes.

```ts [search.ts]
return like(asset.name, `%${term}%`)
```

A `LIKE` with a wildcard on both ends can't use an ordinary index, so it's a full scan, every row, every query, and on SQLite it was case-sensitive in ways that surprise people. It worked for years because the table was small. Then it wasn't.

::scene-search
The same eight files from one game, under every version of the search. What changes is which lane reads them, how many rows it touched, and what came back.
::

:pin{scene="search" step="1"}The fix is a trigram index. [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html) breaks every name into three-character pieces and keeps them in a GIN index, and Postgres can answer `ILIKE '%term%'` straight from it. Same substring feel as `LIKE`, case-insensitive, and indexed, so the query keeps its shape and only the plan changes.

```ts [asset.ts]
index("asset_name_trgm_idx").using("gin", table.name.op("gin_trgm_ops")) // 1
```

:clause[It's an ordinary index on an ordinary column]{n=1}, declared in the Drizzle schema next to every other index, so migrations own it and nothing has to provision it at boot. On a copy of production, a three-letter search comes back in 0.06 to 1.8 ms.

:pin{scene="search" step="2"}Then someone types two letters. A term under three characters has no trigram to look up, so Postgres scans the name column instead. That's 24 to 30 ms over 43,000 names, and it's fine, because a two-letter search returns half the database whatever you do.

:pin{scene="search" step="3"}Before making it better, the version above is already broken in a way that doesn't show up in testing. `LIKE` has its own wildcards: `%` matches anything and `_` matches any single character. Pass raw input through and `sw_rd` finds `sword`, and a lone `%` matches every row. The escape puts a backslash in front of each wildcard, so every character the user typed only matches itself.

```ts [fts.ts]
function escapeLike(term: string): string {
  return term.replace(/[\\%_]/g, (c) => `\\${c}`) // 1
}
```

:clause[Every wildcard gets a backslash in front]{n=1}. Backslash is Postgres's default `LIKE` escape character, so a backslash the user typed gets one too. The same condition also ORs in a set's other names, which is how "Childe" finds the files filed under Tartaglia.

That's filename search, done. It has nothing to say about `IMG_4471.png`.

### Two lanes

The reason the next part exists is a Discord channel. My server had one called :mention[asset-hunt], and it got used a lot: does anybody know an asset with such and such, where do I get this from, half of it asked in the wrong channel anyway. People kept asking for tags, and I wasn't going to have anyone sit there tagging tens of thousands of images by hand, me least of all. I wanted "hey, does anyone know" to be a question the database could answer itself, and when the monorepo rewrite happened, that was the thing I decided to solve.

:pin{scene="search" step="4"}A description gets answered by two indexes at once. The caption lane is a full-text index over the captions and tags a vision model wrote for every asset: a generated `tsvector` column with its own GIN index, built with English stemming and no stop words, because a caption is an English sentence and "sword" should match "swords". Every word typed has to appear, and hits rank by `ts_rank`. The semantic lane is cosine similarity over image embeddings: the query is embedded into the same vector space the pictures live in, and the nearest vectors come back ranked.

Neither lane is much good alone, and the reason is the shape of what each stores. An embedding is dense and approximate. Every asset scores against every query, so there's always a full ranked list, and the bottom of it is noise with a number attached. A caption index is sparse and exact. A word is either written on that asset or it isn't, and when it is, that's a much harder fact than a cosine of 0.31.

:pin{scene="search" step="5"}So caption hits rank first and the semantic lane fills in behind, catching the phrasings nobody's caption happened to use. When both lanes turn up the same asset, the blend keeps the semantic score rather than inventing one. Captions also carry the entire weight for the half of the assets whose filenames are machine ids, hashes and export numbers from whatever tool ripped them. No tokeniser saves you there. The caption index is the only place real words exist for those assets.

### A vector is only comparable to itself

This is the part that's easy to get wrong. A vector means nothing on its own. It's only meaningful next to vectors from the same model, at the same precision, normalised the same way. Change any of that and you haven't made retrieval slightly worse, you've started comparing two different spaces.

Backfilling the initial 43,000 took genuinely forever, and the first pass ran partly on my own 5070 at home, quantised down to fit, because I wasn't going to pay for a full-precision run before knowing whether anyone would use the thing. The telemetry answered that fast. People leaned on it far harder than I expected, so I went all out.

The catalog is embedded with `siglip2-base-patch16-512` at fp16 on a GPU, and the fp16 matters as much as the model id. A q8-quantised build of the same model, measured against fp16 on the same images, lands anywhere from cosine 0.70 to 0.93. Nothing errors on a number like that. It's still 768 floats, search still returns a full page, and the results are quietly wrong in the only way you ever find out about: searching for something you know is in there and not seeing it.

:::fig{caption="Vision-tower cosine against the fp16 GPU vectors, on the same production previews. The q8 build isn't a lossy version of the same space, it's a different one. fp32 on a CPU is close enough to share it."}
::bar-chart
---
axis: true
max: 1
data:
  - label: Q8, worst case
    sublabel: Against fp16
    value: 0.7
    display: "0.70"
  - label: Q8, best case
    sublabel: Against fp16
    value: 0.93
    display: "0.93"
  - label: FP32 on CPU
    sublabel: Against fp16
    value: 0.98
    display: "0.97-0.99"
    em: true
---
::
:::

So parity is a rule, and it gets measured, not assumed. Two things embed new uploads. The GPU worker runs the backfill's exact model, fp16 weights and normalisation. The background sweep runs on the CPU sidecar, which can't do fp16 at all, so before it was allowed to write a single row its vision tower was checked against the backfill on production previews. q8 failed at 0.70 to 0.93. fp32 passed at 0.97 to 0.99, so fp32 is what it runs. The text tower stays q8. Its drift against fp32 is 0.96 to 0.98, and a query vector that's slightly off shifts every score roughly the same way, so the ranking survives and the hot path stays fast.

### The scan

The obvious place to run the similarity is SQL, and it holds up right until two people search at once.

```sql [nearest.sql]
SELECT asset_id, vector_distance_cos(embedding, ?) AS d -- 1
FROM asset_vector WHERE model = ?
ORDER BY d LIMIT 60; -- 2
```

:clause[It scores every vector under the model tag]{n=1}, :clause[sorts the lot and keeps 60]{n=2}. On libSQL every query dragged ~120MB of vectors through the engine and the scans queued behind each other. p50 looked healthy at ~48ms. Production p99 was 19.5 seconds, with a 43-second worst case in the traces.

But 120MB is 120MB. The whole set fits in memory, so the scan moved out of the database and into a process-local buffer.

```ts [vector-index.ts]
const dim = rows[0]!.embedding.length // 1
const vectors = new Float32Array(rows.length * dim) // 2
for (const [i, row] of rows.entries())
  vectors.set(normalise(row.embedding), i * dim)

export function nearest(q: Float32Array, k = 60) {
  const scores = new Float32Array(rows.length)
  for (let i = 0; i < rows.length; i++) { // 3
    let dot = 0
    for (let j = 0; j < dim; j++) dot += vectors[i * dim + j]! * q[j]!
    scores[i] = dot
  }
  return topK(scores, k) // 4
}
```

:clause[The width comes from the data]{n=1}, not a constant, so a wider model doesn't need a code change. One :clause[row-major `Float32Array`]{n=2} holds every vector, normalised once at load. A search is a :clause[brute-force dot product]{n=3} across it and :clause[a top-k pass over the scores]{n=4}. No approximate-nearest-neighbour structure, no vector service, no index tuning. Arithmetic over a contiguous buffer is a thing CPUs are extremely good at. The real one also applies the game and category filters inside the loop, but that's the whole idea.

:::fig{caption="Semantic search p99, scanning vectors in SQL versus in memory. Same vectors, same assets, brute force in both cases."}
::bar-chart
---
format: ms-s
data:
  - label: Vector scan in SQL
    value: 19500
  - label: In-process index
    value: 400
    em: true
---
::
:::

Freshness is the only interesting part. Embeddings change rarely, so searches serve the current snapshot immediately and never block on being up to date. A background probe reads a handful of counts into a fingerprint at most once every 15 seconds. A fingerprint that moved kicks off a rebuild, also in the background. A new row is live in search about 15 seconds after it's written, and nobody's query ever waits on a rebuild. A forced rebuild once a day catches whatever the counts can't see, and a rebuild is cheap now: the whole snapshot loads from Postgres in one to two seconds, paged 2,000 rows at a time. From Turso it took around five minutes. Same instinct as not running [Meilisearch](https://www.meilisearch.com): the data already fits somewhere I control, so it doesn't need a process of its own.

## Enrichment

Both search lanes read derived state. A vector and a caption are functions of the image and the model, and every asset needs them computed exactly once. That work wants a GPU, and skowt owns the GPU rather than renting an API in front of someone else's: one worker with both models, deployed as a serverless endpoint on an L4 on [Modal](https://modal.com) with [RunPod](https://runpod.io) as the fallback, :note[Each host builds its own image, but both import the same model code, so a fallback never changes the vector space.] scaling to zero and billing per second, so it costs nothing between uploads.

The question is who decides an asset needs the work. Here's the first answer.

```ts [sweep.ts]
setInterval(async () => {
  const missing = await db.select({ id: asset.id }).from(asset)
    .where(notExists(vectorFor(asset.id, MODEL))) // 1
  for (const a of missing) await enrich(a.id) // 2
}, 5 * 60_000)
```

Every five minutes, :clause[find every asset with no row]{n=1} under the active model tag and :clause[enrich it]{n=2}. This is correct. It is also slow: worst case, an upload sits unsearchable for the full five minutes, and uploaders notice.

So, a queue. `commitUpload` enqueues the asset id, a worker calls the endpoint and writes both rows, and the asset is searchable about six seconds after commit.

```ts [commit-upload.ts]
await enrichQueue.add("enrich", { assetId }, { jobId: assetId })
```

`jobId` is the asset id, so enqueueing something already in flight is a no-op. Fast, and now there are two things that can go wrong instead of one.

Before fixing anything, here's the version that makes it worse. A job dies after the vector is written and before the caption is. The obvious patch is retries, and a dead-letter queue for the ones that keep dying.

```ts [worker.ts]
new Worker("enrich", enrich, {
  concurrency: 4,
  settings: { backoffStrategy: exponential },
})
queue.on("failed", async (job) => {
  if (job.attemptsMade >= 3) await deadLetters.add(job.name, job.data)
})
```

Now there's a dead-letter queue to drain, a half-finished asset with one row and not the other, and a job record whose idea of what happened has to be kept in step with the database's. Flush Redis and all of that memory is gone, along with every queued job. Two sources of truth, and a person in the middle reconciling them.

The actual design is the first version and the second version together, with the second one demoted. The sweep never went away. It split in two, and both halves still run every five minutes. The caption sweep finds assets with no caption row and drops them on the queue. The embed sweep doesn't bother with the queue at all: it finds assets with no vector and embeds them itself, one at a time, through the CPU sidecar, so a mass upload just means the next few sweeps have work. Each query is still the whole definition of pending, a missing row under the active model tag. The queue exists only for latency. Jobs retry three times and then drop on purpose, because retrying past that is a worse implementation of the sweep, and the sweep owns the long tail.

:::fig{caption="Three producers, one definition of done. The queue exists for latency, the sweeps for truth. None of them knows the others are there, because a missing row is the to-do item and a written row is the receipt."}
::flow-diagram
---
columns:
  - - id: commit
      title: Upload commit
      sub: The fast lane
    - id: sweep
      title: Caption sweep
      sub: Every 5 minutes
    - id: embedsweep
      title: Embed sweep
      sub: Every 5 minutes
  - - id: queue
      title: BullMQ queue
      sub: jobId = asset id
    - id: sidecar
      title: CPU sidecar
      sub: fp32, no queue
  - - id: gpu
      title: GPU endpoint
      sub: Modal, RunPod as fallback
  - - id: rows
      title: Derived rows
      sub: Vector + caption
edges:
  - from: commit
    to: queue
    label: Enqueue
  - from: sweep
    to: queue
  - from: embedsweep
    to: sidecar
  - from: queue
    to: gpu
  - from: gpu
    to: rows
  - from: sidecar
    to: rows
---
::
:::

There's no job record to keep in step with reality and no dead-letter queue to drain, because the absence of the row is the to-do item. A job that dies halfway leaves the row missing, so the next sweep picks it up with no idea anything went wrong. Flushing Redis throws away every queued job and costs a few minutes. Losing the entire queue costs latency and never data, which is the only reason I was willing to put a queue in at all. A job's last failed attempt does ping an ops channel on Discord, but that's so I know, not something I have to drain.

Both stores carry a `model` column and every row is written with the tag that produced it. Nothing is rewritten in place, which makes a model upgrade dull: backfill the new tag next to the old rows, flip one constant, drop the old rows whenever convenient. If the new space turns out worse, the constant flips back and the old vectors are still sitting there.

## The first paint

Fast, on the frontend, mostly means the browser has nothing left to ask for. The web app is server-rendered with streaming, and every route's loader prefetches what's above the fold on the server: the asset, its related files, the game's landing data, the session. The per-request query cache is dehydrated into the HTML, so the browser hydrates the data it was handed instead of fetching it again.

That only works if the keys match exactly. The grid's infinite query is prefetched on the precise key the browser will ask for, through a loader-side mirror of the URL-to-input logic, because a near miss is a second fetch that looks like a cache hit in every test. Cookies are forwarded to the server render too, so a signed-in visitor's saved files and votes are in the first HTML, and the API's rate limiter counts the visitor rather than the web server's IP.

Nothing moves after hydration either. The theme is in the server HTML. The grid's column count from your last visit rides a cookie into the root loader, so the server and the client lay out the same masonry. The masonry itself is shortest-column-first over each card's known aspect ratio, which means appending the next page only ever adds to the bottom of a column. CSS columns rebalance everything on append, which visibly shuffled the cards you were looking at.

Images are the bulk of every page, so none of them are resized on request. Every upload gets a 300px thumbnail and a 1024px preview at commit, and the cards pick between them with `<picture>`, lazily. Each card reserves its box from the dimensions stored at upload, washed in the artwork's dominant colour, also extracted at upload, until the image lands. Layout shift has nothing to shift.

The next page of the grid starts loading 3,000 pixels before you reach it. Hovering a link runs that route's loader, so the click paints from cache, and a hover preload skips the caption and related-files fetches, so sweeping the mouse across the grid costs one call per card, not three.

```ts [router.tsx]
retry: (failureCount, error) => {
  if (import.meta.env.SSR) return false // 1
  if (error instanceof TRPCClientError) {
    const status = error.data?.httpStatus
    if (typeof status === "number" && status < 500 && status !== 429) return false // 2
  }
  return failureCount < 3 // 3
},
```

Failure is part of the first paint too. :clause[The server never retries]{n=1}, because a retry there stalls the whole document stream for a page that's going to error anyway. :clause[A 4xx is an answer, not a blip]{n=2}: not found stays not found, and only a 429 is worth waiting out. :clause[Anything else gets three tries]{n=3} in the browser. When the API is slow, the server render gives up after 12 seconds and sends a real 503 with `Retry-After`, and a rate-limited render is a 429, so Googlebot backs off instead of marking 39,000 URLs broken.

The HTML itself is never cached at the edge, deliberately. A document can carry one signed-in visitor's rows, so it goes out `private, no-cache`, and the caching happens where it's safe: images at the edge for a year, and API reads in Redis. There's no real-user monitoring on any of this yet, so this section is mechanism rather than numbers. Measuring it is next.

## The cheap stuff

The asset query is the hot path. It runs on every game page, filter, sort and scroll, and two things carry it: a Redis cache keyed by the full parameter set, with a bounded in-memory fallback if Redis is unreachable, and keyset pagination instead of `LIMIT/OFFSET`. Keyset pins an exact boundary row and resumes past it with a tuple comparison, so deep pages don't get linearly slower and an insert between page loads can't hand you a duplicate or a gap.

Sessions run through Redis too. When the database was Turso, across the network, a session check that read the session row and then the user row was two round trips at ~57ms each, paid on every authenticated request. [better-auth](https://www.better-auth.com) takes a secondary storage adapter, so that collapsed to one sub-millisecond `GET`, and it stayed that way after Postgres moved onto Railway's private network next to the API. It isn't a dumb TTL cache either: it invalidates on sign-out and revocation, and a permission change patches the live cached session rather than waiting for a re-login.

Rate limiting is a real sliding window, not a fixed bucket. Each window is a sorted set scored by millisecond timestamp, and the trim, count and admit run as one atomic Lua script, so two concurrent requests can't both read a count under the limit and both get in.

Telemetry is the same flavour of cheap. Every request emits exactly one structured wide event at response time, built up in place as it moves through Elysia's hooks and shipped to [Better Stack](https://betterstack.com) with the standard [OTel](https://opentelemetry.io) HTTP attributes next to cheap domain identity: the user id, which procedures ran, how many database queries the request made. "Every request where this user hit a procedure that ran more than 50 database queries" is a single filter, no trace to open, and a query count over 50 flags an N+1 on its own.

::tangent{label="One case"}
One case where this came in useful was very early on. The web service was sitting at ~2GB, higher than it had any reason to be, and I was on my phone, so I asked [Railway's Discord agent](https://x.com/Railway/status/2075263674026180988) what was going on. It came back with: you have a memory leak, and it has climbed since this commit. That was the alarm, not the diagnosis. From there I went straight to Claude Code with the Railway and Better Stack MCPs, and with the wide events to query it had the exact root cause and a fix out within minutes. The commit was SEO work, SSR plus a sitemap advertising ~39,000 asset URLs, and it had built the QueryClient at module scope. Crawlers walked the sitemap and every unique URL added an entry to a render cache nobody ever read. The fix builds those objects per request. The leak and the invitations went out in the same commit.
::

## The end

As of v6, that's tens of thousands of assets, run by one person plus the Discord regulars I trust not to get phished. The first version of this post called expanding past images "the next pressure". It already happened. v6 shipped 3D models for Genshin Impact, Honkai: Star Rail and Zenless Zone Zero characters, with animations, a pose mode and image and video export in the browser, plus animated game headers. The raw-original lock caught `.glb` originals from the day they existed, because it never cared about image extensions, and the edge worker learned each new public file shape on purpose, one exact pattern at a time.

That's most of it. I've left out the moderation flow, the Discord bot's share of ingest, and how the caption model was chosen, which is a post of its own.
