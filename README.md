# dromzeh.dev

Source for [dromzeh.dev](https://dromzeh.dev).

Nuxt 4 and Nuxt Content, prerendered to static files and served from Cloudflare. Tailwind v4, Newsreader, Inter and Commit Mono.

## Running it

```sh
bun install
bun run dev
bun run generate
bun run typecheck
```

`generate` writes the static site to `.output/public`, which `wrangler.jsonc` serves.

## Layout

- `content/posts`: the writing, as Markdown with MDC components
- `app/components/content`: the components those posts use (charts, flow diagrams, the animated scenes, code blocks)
- `app/components/music`: the now playing card, from [Lanyard](https://lanyard.rest) with a Last.fm fallback
- `app/data`: projects, craft pieces and the FAQ
- `server/routes`: RSS, sitemap and `llms.txt`
- `shared/site.ts`: the site URL, name and description, used by both the app and the server

## License

The code is licensed under [AGPL-3.0](LICENSE).

The writing in `content/` is © dromzeh (Marcel Elias), all rights reserved. It is not covered by the AGPL and may not be republished without permission.
