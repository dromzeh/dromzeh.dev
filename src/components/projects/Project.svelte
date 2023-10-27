<script lang="ts">
import type { Project } from '$lib/types/project'

export let project: Project
</script>

<div class="flex flex-col">
	<div class="py-3">
		<div class="mb-2 flex items-center justify-between gap-2">
			<a
				href="{project.url ? project.url : project.gitUrl}"
				target="_blank"
				class="text-lg text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300">
				{project.name}
			</a>
			{#if project.gitUrl}
				<a
					href="{project.gitUrl}"
					target="_blank"
					rel="noopener noreferrer"
					class="monofont bg-zinc-800 px-1 text-xs text-white">
					Open Source
				</a>
			{/if}
		</div>
		<p class="">
			{project.description}
		</p>
	</div>
</div>
