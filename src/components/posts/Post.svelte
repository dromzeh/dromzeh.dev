<script lang="ts">
import type { Post } from '$lib/types/post'

export let post: Post
</script>

<div class="z-10 flex flex-col">
	<a href="/posts/{post.id}">
		<div
			class="group rounded-lg p-3 transition-all duration-150 hover:bg-zinc-500/10 hover:ring-1 hover:ring-white/50">
			<div class="flex items-center justify-between gap-2">
				<p class="text-lg text-white">
					{post.title}
				</p>
				<div class="hidden sm:block">
					<div
						class="rounded-lg px-2 py-1 font-mono text-xs text-white ring-1 ring-white/50">
						{post.categories[0]}
					</div>
				</div>
			</div>
		</div>
	</a>
</div>
