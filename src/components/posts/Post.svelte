<script lang="ts">
import { ExternalLink } from 'lucide-svelte'
import type { Post } from '$lib/types/post'
import { formatDate } from '$lib/utils/formatDate'

export let post: Post

let postHovered = false
</script>

<div
	class="flex flex-col"
	on:mouseenter="{() => (postHovered = true)}"
	on:mouseleave="{() => (postHovered = false)}">
	<div class="py-3">
		<div class="mb-2 flex items-center justify-between gap-2">
			<a
				class="text-lg text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
				href="/posts/{post.id}">
				{post.title}
			</a>
			<div class="hidden sm:block">
				<div class="mb-3 flex flex-row gap-2">
					<div class="bg-zinc-800 px-1 font-mono text-xs text-white">
						{post.categories[0]}
					</div>
				</div>
			</div>
		</div>
		<p class="">
			{post.description}
		</p>
	</div>
</div>
