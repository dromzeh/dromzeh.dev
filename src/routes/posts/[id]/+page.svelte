<script lang="ts">
import { formatDate } from '$lib/utils/formatDate'

export let data
const { title, author, date, categories } = data.meta
</script>

<svelte:head>
	<title>{title} • dromzeh.dev</title>
	<meta property="og:type" content="article" />
</svelte:head>

<article class="flex flex-grow flex-col py-24">
	<a href="/posts">
		<p class="mb-2 text-sm text-gray-400 transition-all hover:text-primary-100">
			<i class="fas fa-arrow-left"></i> View all posts
		</p>
	</a>
	<div class="mb-4 text-white">
		<p class="text-4xl font-bold">{title}</p>
		<p class="text-lg text-gray-400">
			Published by {author} on {formatDate(date)}
		</p>
	</div>

	<div class="mb-2 flex flex-row gap-1">
		{#each categories as category}
			<p
				class="rounded-full bg-primary-400/10 px-3 py-1.5 text-xs text-primary-300 ring-1 ring-inset ring-primary-500/20">
				{category}
			</p>
		{/each}
	</div>
	<article class="all-prose">
		<svelte:component this="{data.content}" />
	</article>
</article>
