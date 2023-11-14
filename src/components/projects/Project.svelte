<script lang="ts">
import type { Project } from '$lib/types/project'

export let project: Project
</script>

<div class="z-10 flex flex-col">
	<a href="{project.url ? project.url : project.gitUrl}">
		<div
			class="group rounded-lg p-3 transition-all duration-150 hover:bg-zinc-500/10 hover:ring-1 hover:ring-white/50">
			<div class="flex items-center justify-between gap-2">
				<p class="text-lg text-white">
					{project.name}
				</p>
				{#if project.gitUrl}
					<a
						href="{project.gitUrl}"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-lg px-2 py-1 font-mono text-xs text-white ring-1 ring-white/50">
						Open Source
					</a>
				{/if}
			</div>
			<p class="">
				{project.description}
			</p>
		</div>
	</a>
</div>
