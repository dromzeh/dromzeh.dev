<script lang="ts">
import { ExternalLink } from 'lucide-svelte'
import type { Post } from '$lib/types/post'
import { formatDate } from '$lib/utils/formatDate'

export let post: Post

let postHovered = false
</script>

<div
	class="flex bg-secondary-100 transition-all"
	on:mouseenter="{() => (postHovered = true)}"
	on:mouseleave="{() => (postHovered = false)}">
	<div class="flex flex-col gap-1 bg-secondary-300 p-3">
		<a href="/posts/{post.id}">
			<ExternalLink class="transition-colors hover:text-white" />
		</a>
	</div>
	<div class="p-3">
		<p class="text-lg font-semibold text-white">{post.title}</p>
		<div class="mb-3 flex flex-row gap-2">
			{#each post.categories.slice(0, 3) as c}
				<div class="bg-white/5 text-xs uppercase text-white">{c}</div>
			{/each}
			{#if post.categories.length > 3}
				<div class=" bg-white/5 text-xs uppercase text-white">
					{#if post.categories.length > 4}
						+{post.categories.length - 3}
						more
					{:else}
						{post.categories[3]}
					{/if}
				</div>
			{/if}
		</div>
		<p class="text-sm">
			{post.description}
		</p>
		<p class="text-xs">
			Uploaded on {formatDate(post.date)}
		</p>
	</div>
</div>
