# [dromzeh.dev]("https://dromzeh.dev")

![MIT](https://img.shields.io/badge/license-MIT-blue)

Source code for my personal website, `dromzeh.dev`.

**Uses:**

-   [Svelte](https://svelte.dev/) & [SvelteKit](https://kit.svelte.dev/).
-   [TailwindCSS](https://tailwindcss.com/)
-   [MDSveX](https://mdsvex.com/) & [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)
-   Deployment is done using [Cloudflare Pages](https://pages.cloudflare.com/), read [here](#cf-pages-configuration).

[Lanyard](https://api.lanyard.rest/) is used to show Discord Status, Spotify Information, etc. You can view how this is done inside `./src/components/Lanyard.svelte`.

## Workflows

[cf-pages-await](https://github.com/WalshyDev/cf-pages-await/) is used to clear site cache after a CF pages deployment, inside `.github/workflows/deploy.yml`

## Running the Site

Development (port runs at `1337` unless changed in `package.json`)

```bash
  pnpm i && pnpm dev
```

Building:

```bash
  pnpm i && pnpm build
```

### CF Pages Configuration

`NODE_VERSION` is set to `18.15.0`.

`Build Output Directory` is set to `/.svelte-kit/cloudflare`

## License

dromzeh.dev is licensed under [MIT](https://mit.dromzeh.dev/)
