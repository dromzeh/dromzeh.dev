<script lang="ts">
import type { Post as PostTyped } from '$lib/types/post'
import Post from './Post.svelte'
import { onMount } from 'svelte'

let posts: PostTyped[] = []
export let numPostsToShow = 0

onMount(async () => {
	const response = await fetch('api/posts')
	posts = await response.json()
	if (!numPostsToShow) numPostsToShow = posts.length
})
</script>

<div class="flex flex-col gap-6">
	{#each posts.slice(0, numPostsToShow) as post}
		<Post post="{post}" />
	{/each}
</div>
