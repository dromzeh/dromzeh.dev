<script lang="ts">
import { onMount } from 'svelte'
import type { Post } from '$lib/types/post'
import { formatDate } from '$lib/utils/formatDate'

export let showPosts = 0

let posts: Post[] = []

onMount(async () => {
	const response = await fetch('api/posts')
	posts = await response.json()
	if (showPosts > 0) {
		posts = posts.slice(0, showPosts)
	}
})
</script>

<div>
	<div class="grid gap-3 py-2">
		{#each posts as post}
			<a href="/posts/{post.id}">
				<div
					class="relative rounded-md bg-gray-400 bg-opacity-5 p-3 transition-all hover:bg-opacity-10 hover:text-gray-300">
					<p class="font-semibold text-white">
						{post.title} ({formatDate(post.date)})
					</p>
					<p class="mb-2 text-white">
						{#each post.categories as category}
							<span class="text-xs font-semibold uppercase"
								>{category}{#if category !== post.categories[post.categories.length - 1]},
								{/if}</span>
						{/each}
					</p>
					<p>{post.description}</p>
					<p></p>
				</div>
			</a>
		{/each}
	</div>
</div>
