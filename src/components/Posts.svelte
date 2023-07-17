<style lang="postcss">
.arrow {
	transition: transform 0.1s ease-in-out;
	transform: rotate(-45deg);
}

.project:hover .arrow {
	transform: rotate(0deg);
	@apply text-white;
}

.project:hover .desc {
	@apply text-gray-300;
}
</style>

<script lang="ts">
import { onMount } from 'svelte'
import type { Post } from '$lib/types/post'
import { formatDate } from '$lib/utils/formatDate'

export let showPosts = 0

interface PostWithHover extends Post {
	isHovered: boolean
}

let posts: PostWithHover[] = []

onMount(async () => {
	const response = await fetch('api/posts')
	posts = await response.json()
	if (showPosts > 0) {
		posts = posts.slice(0, showPosts)
	}
	posts = posts.map((post) => ({
		...post,
		isHovered: false
	}))
})
</script>

<div>
	<div class="grid gap-3 py-2">
		<hr class="border-primary-600/10" />
		{#each posts as post}
			<a href="/posts/{post.id}">
				<div
					class="project transition-all"
					on:mouseenter="{() => (post.isHovered = true)}"
					on:mouseleave="{() => (post.isHovered = false)}">
					<p class="mb-1 text-xl font-semibold text-white">
						{post.title}
					</p>
					<div class="mb-2 flex flex-row gap-1">
						{#each post.categories.slice(0, 3) as category}
							<span
								class="rounded-md bg-primary-400/10 px-1.5 py-1 text-xs uppercase text-primary-300 ring-1 ring-inset ring-primary-500/20"
								>{category}
							</span>
						{/each}
						{#if post.categories.length > 3}
							<span
								class="rounded-md bg-primary-600/10 px-1.5 py-1 text-xs uppercase text-primary-400 ring-1 ring-inset ring-primary-500/20">
								{#if post.categories.length > 4}
									+
									{post.categories.length - 3} more
								{:else}
									{post.categories[3]}
								{/if}
							</span>
						{/if}
					</div>
					<p class="desc text-sm transition">
						{post.description}
					</p>
					<p class="text-right"><i class="fa fa-arrow-right arrow"></i></p>
				</div>
			</a>
			<hr class="border-primary-600/10" />
		{/each}
	</div>
</div>
