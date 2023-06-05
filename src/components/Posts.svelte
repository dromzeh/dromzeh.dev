<script lang="ts">
import { onMount } from 'svelte'
import type { Post } from '$lib/types/post'

export let showPosts = 0

let posts: Post[] = []

onMount(async () => {
	const response = await fetch('api/posts')
	posts = await response.json()
	if (showPosts > 0) {
		posts = posts.slice(0, showPosts)
	}
	// console.log(posts)
})
</script>

<div>
	<div class="grid gap-3 py-2">
		{#each posts as post}
			<a href="/posts/{post.id}">
				<div
					class="relative rounded-lg bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-5">
					<p class="font-semibold text-primary-100">
						{post.title}
						<span class="text-sm font-normal text-gray-500">{post.date}</span>
					</p>
					<p>{post.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
