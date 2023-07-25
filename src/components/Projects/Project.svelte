<script lang="ts">
import { ExternalLink, Github } from 'lucide-svelte'
import type { Project } from '$lib/types/project'

export let project: Project

let projectHovered = false
</script>

<div
	class="flex bg-secondary-100 transition-all"
	on:mouseenter="{() => (projectHovered = true)}"
	on:mouseleave="{() => (projectHovered = false)}">
	<div class="flex flex-col gap-1 bg-secondary-300 p-3">
		{#if project.url}
			<a href="{project.url}" target="_blank" rel="noopener noreferrer">
				<ExternalLink class="transition-colors hover:text-white" />
			</a>
		{/if}
		{#if project.gitUrl}
			<a href="{project.gitUrl}" target="_blank" rel="noopener noreferrer">
				<Github class="transition-colors hover:text-white" />
			</a>
		{/if}
	</div>
	<div class="p-3">
		<p class="text-lg font-semibold text-white">{project.name}</p>
		<div class="mb-3 flex flex-row gap-2">
			{#each project.categories.slice(0, 3) as c}
				<div class="bg-primary-200/10 px-1 text-xs uppercase text-primary-200">{c}</div>
			{/each}
			{#if project.categories.length > 3}
				<div class=" bg-primary-200/10 px-1 text-xs uppercase text-primary-200">
					{#if project.categories.length > 4}
						+{project.categories.length - 3}
						more
					{:else}
						{project.categories[3]}
					{/if}
				</div>
			{/if}
		</div>
		<p class="text-sm">{project.description}</p>
	</div>
</div>
