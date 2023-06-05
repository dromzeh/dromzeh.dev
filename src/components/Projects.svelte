<script lang="ts">
// src/components/Projects.svelte
import { onMount } from 'svelte'
import type { Project } from '$lib/types'
import projectsListData from '../data/projects.json'

export let showProjects = 0

let projectsList: Project[] = projectsListData.projects.map((project) => ({
	...project,
	tags: []
}))

onMount(async () => {
	if (showProjects > 0) {
		projectsList = projectsList.slice(0, showProjects)
	}
	// console.log(projectsList)
})
</script>

<div>
	<div class="grid gap-3 py-2">
		{#each projectsList as proj, i}
			<a href="{proj.url}">
				<div
					class="relative rounded-lg bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-5">
					<p class="font-semibold text-primary-100">
						{i + 1}. {proj.name}
						<span class="text-sm font-normal text-gray-500"
							>({#if proj.isOpenSource}Open Source{:else}Closed Source{/if})</span>
					</p>
					<p>{proj.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
