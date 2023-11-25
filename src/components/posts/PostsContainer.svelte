<style lang="postcss">
.year {
	-webkit-text-stroke: 2px #a1a1aa;
	-webkit-text-fill-color: transparent;
}
</style>

<script lang="ts">
import type { Post as PostTyped } from '$lib/types/post'
import Post from './Post.svelte'
import { onMount } from 'svelte'

let posts: PostTyped[] = []

function groupPostsByYear(posts: PostTyped[]) {
	const groups = new Map<string, PostTyped[]>()
	for (const post of posts) {
		const year = post.date.split('-')[0]
		if (!groups.has(year)) {
			groups.set(year, [])
		}
		groups.get(year)!.push(post)
	}
	return Array.from(groups.entries())
}

let groupedPosts: [string, PostTyped[]][] = []

onMount(async () => {
	const response = await fetch('api/posts')
	posts = await response.json()
	groupedPosts = groupPostsByYear(posts)
})
</script>

<div class="mt-6 flex flex-col gap-12">
	{#each groupedPosts as [year, yearPosts]}
		<div class="relative">
			<div
				class="year absolute translate-x-[-30px] translate-y-[-20px] font-mono text-8xl font-bold opacity-20">
				{year}
			</div>
			<div class="flex flex-col gap-2">
				{#each yearPosts as post}
					<Post {post} />
				{/each}
			</div>
		</div>
	{/each}
</div>
