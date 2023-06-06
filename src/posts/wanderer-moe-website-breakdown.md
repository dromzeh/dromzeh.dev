---
title: 'wanderer.moe - Website Breakdown'
description: 'Breaking down wanderer.moe, including how it works and using analytics to calculate how much it costs yearly and monthly to run the site.'
date: '2023-05-12'
categories:
    - cloudflare
    - finance
published: true
author: 'dromzeh'
---

## Basic Explanation

wanderer.moe is mostly powered with Cloudflare, it's a collection of all sorts of different services & I go into detail about each service below.

The whole website is [open source](https://git.wanderer.moe/), main site is hosted on Cloudflare Pages, the CDN is hosted on Cloudflare R2, the API is hosted on Cloudflare Workers, and the status page is [hosted with Github Pages & Actions](https://git.wanderer.moe/status/).

The reason why I've split the website like this instead of hosting all assets on the main site is because it's **cheaper, and it's easier to manage, build and deploy the specific sections of the site**.

This means that if I wanted to add more assets, **I can just upload them to the CDN, and they will be automatically added to the site immediately**, without having to rebuild the site.

The same applies for the websites OC Generator, I just have to upload a folder into the `oc-generator` folder on the CDN, include a `.json` file with the data, and it will be automatically added to the site.

## cdn.wanderer.moe (CF R2)

The CDN is hosted using Cloudflare's [R2 Storage](https://www.cloudflare.com/products/r2/). The CDN is used to host all static assets, such as images, `.json` files, and other files that are not hosted on the main site.

I upload and manage the R2 Bucket using [rclone](https://rclone.org/), which is a free tool that allows you to manage cloud storage.

Why use R2 to host assets instead of another service? R2 has Zero egress fee storage, meaning nothing is charged extra for any users downloading data, making it great for hosting assets, and it's also very affordable compared to other services such as AWS S3.

wanderer.moe **used to store all Static Images on the root domain**, as more images started to be uploaded but this caused the site to be slow, build times to be long, and it was hard to manage the images without having to rebuild the site each time.

According to Cloudflare's statistics, on average there are `30,000` requests made per hour, equal to `720,000` requests per day.

To get the total amount of requests per month, we multiply `720,000` by `30`, which is equal to `21,600,000` requests per month.

Using [Cloudflare's R2 Pricing Calculator](https://r2-calculator.cloudflare.com/) we can calculate the total cost of the CDN, this is set to be `4.18 USD` per month, equal to `50.11 USD` per year.

## api.wanderer.moe (CF Workers)

The API is hosted using a Cloudflare Worker, a serverless function that is hosted on Cloudflare's edge network. In wanderer.moe, it is used to handle all the following for the website:

The worker has the following routes:

-   `/games` - Used to get all the games that have assets [(View Example)](https://api.wanderer.moe/games)
-   `/game/:game` - Used to get the subfolders (asset folders) for a specific game. [(View Example)](https://api.wanderer.moe/game/genshin-impact)
-   `/game/:game/:asset` - Returns the data for a specific asset [(View Example)](https://api.wanderer.moe/game/genshin-impact/character-sheets)
-   `/oc-generators` - Used to get the data for the OC Generator [(View Request)](https://api.wanderer.moe/oc-generators)
-   `/oc-generators/:game` - Used to get the data for a specific OC Generator [(View Example)](https://api.wanderer.moe/oc-generator/genshin-impact)

Workers works great for my use-case as it is directly bound to the R2 Bucket, meaning workers can directly access the Bucket & making the API easier to manage. I can just upload a folder or assets to the R2 Bucket where it will automatically be added to the site.

If I wanted to add a new game to the OC Generator, I can just upload a folder with a `.json` file containing data to the R2 Bucket's `oc-generator` folder, and it will automatically be added to the site - continuously saving on build times.

If you're interested, the code for the API is open-source on GitHub and can be found [here](https://git.wanderer.moe/api/).

My Cloudflare account is under the [paid plan](https://developers.cloudflare.com/workers/platform/pricing/), this allows for 10 million requests per month, which is more than enough for the site. This costs me `5 USD` per month, equal to `60 USD` per year.

## status.wanderer.moe (Github Pages & Actions)

The status page is powered by [upptime](https://github.com/upptime/upptime), a free uptime monitor and is completely open-source.

The status page is hosted on [Github Pages](https://git.wanderer.moe/status/), and the uptime monitor is hosted on [Github Actions](https://git.wanderer.moe/status/actions).

## wanderer.moe (CF Pages)

The main site is hosted using Cloudflare's Pages, using SvelteKit, TailwindCSS & then `@sveltejs/adapter-cloudflare`, open source [here](https://git.wanderer.moe/site/)

The `[game]` and `[assets]` route is done by having a `[game]` folder in `src/routes` and then an `[asset]` subfolder, which are both parameters, where `+page.server.js` is used to get the data for the game, and then `+page.svelte` is used to render the data.

Code snippet `+page.server.js` used on the `[game]/[asset]` page:

```svelte
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const { game, asset } = params
    try {
        const res = await fetch(
            `https://api.wanderer.moe/game/${game}/${asset}`
        )
        if (res.ok) {
            const response = await res.json()
            if (response.error) throw error(404, 'API Error or Page Not Found')
            const data = {
                response,
                game,
                asset,
                images: response.images,
            }
            return data
        }
    } catch (err) {
        throw error(404, 'API Error or Page Not Found')
    }
}
```

This is used to get the data for the game, and then the data is passed to `+page.svelte` to render the data.

This works great as it means I don't have to write each asset page or every possible outcome unlike what was previously used when wanderer.moe was a CSR Static Site.

Cloudflare's Workers Paid plan is [bundled with Pages](https://developers.cloudflare.com/workers/platform/pricing/), so I don't have to pay separately. This costs me nothing as the price is included in the Workers Paid plan.

## Crowdin (Localization & Translations)

[Crowdin](https://crowdin.com/) is what wanderer.moe uses for translations and localization.

Crowdin is linked with wanderer.moe's `development` branch with [GitHub Integration](https://support.crowdin.com/github-integration/), so whenever new text is added to the site, it is automatically added to crowdin for translators to translate.

Plus, Crowdin has free plans for open-source projects, and also offers a 1 year plan for anyone with the Github Student Developer Pack.

The same applies the other way around, if a translation is changed, removed or added on crowdin, it is automatically added to the site.

## Domain Names Pricing

The domain `wanderer.moe` is registered with Namecheap, everything else is managed by Cloudflare. The domain name costs around `17 USD` per year.

I include `dromzeh.dev` into the price on wanderer.moe because `wtf.dromzeh.dev` was the old domain name of `wanderer.moe`, costing the same as `wanderer.moe`, which is another `17 USD` per year.

## Cost Breakdown

The total cost of wanderer.moe is `144.11 USD` per year, equal to `12.01 USD` per month.

(btw, if you like the site [or the other stuff I do](https://git.dromzeh.dev?tab=repositories), consider [donating](https://buymeacoffee.com/marcelmd) to help me keep it running :3)