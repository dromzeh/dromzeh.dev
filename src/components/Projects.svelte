<script lang="ts">
import { onMount } from 'svelte'
import type { Project } from '$lib/types/project'
import projectsListData from '../data/projects.json'

export let showProjects = 0

let projectsList: Project[] = projectsListData.projects.map((project) => ({
	...project
}))

onMount(async () => {
	if (showProjects > 0) {
		projectsList = projectsList.slice(0, showProjects)
	}
	console.log(projectsList)
})
</script>

<div>
	<div class="grid gap-3 py-2">
		{#each projectsList as proj}
			<a href="{proj.url}">
				<div
					class="relative rounded-lg bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-5">
					<p class="font-semibold text-primary-100">
						{proj.name}
						<span class="text-sm font-normal text-gray-500"
							>({#if proj.isOpenSource}Open Source{:else}Closed Source{/if})</span>
					</p>
					<p class="mb-2">
						{#each proj.categories as category}
							<span class="text-xs font-semibold uppercase text-gray-400"
								>{category}{#if category !== proj.categories[proj.categories.length - 1]},
								{/if}</span>
						{/each}
					</p>
					<p>{proj.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
