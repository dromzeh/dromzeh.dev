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
		<p class="mb-2 text-lg text-gray-400 transition-all hover:text-white">View all posts</p>
	</a>
	<div class="mb-4 text-white">
		<p class="text-4xl font-semibold">{title}</p>
		<p class="text-lg text-gray-400">
			Published by {author} on {formatDate(date)}
		</p>
	</div>

	<div class="mb-2 flex flex-row gap-1">
		{#each categories as category}
			<p class="bg-primary-200/10 px-1 text-sm uppercase text-primary-200">
				{category}
			</p>
		{/each}
	</div>
	<article class="all-prose">
		<svelte:component this="{data.content}" />
	</article>
</article>
