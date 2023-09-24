<script lang="ts">
import { formatDate } from '$lib/utils/formatDate'

export let data
const { title, author, date, categories } = data.meta
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const { content } = data as { content: any }
</script>

<svelte:head>
	<title>{title} • dromzeh.dev</title>
	<meta property="og:type" content="article" />
</svelte:head>

<article class="flex flex-grow flex-col py-24">
	<a href="/posts">
		<p
			class="mb-2 text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300">
			View all posts
		</p>
	</a>
	<div class="mb-4 text-white">
		<p class="text-2xl font-semibold">{title}</p>
		<p class="text-zinc-400">
			Published by {author} on {formatDate(date)}
		</p>
	</div>

	<div class="mb-2 flex flex-row gap-1">
		{#each categories as category}
			<p class="bg-zinc-800 px-1 font-mono text-xs text-white">
				{category}
			</p>
		{/each}
	</div>
	<article class="all-prose">
		<svelte:component this="{content}" />
	</article>
</article>
