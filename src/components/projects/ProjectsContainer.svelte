<style lang="postcss">
.category {
	-webkit-text-stroke: 2px #a1a1aa;
	-webkit-text-fill-color: transparent;
}
</style>

<script lang="ts">
import projectsListData from '../../data/projects.json'
import type { Project as ProjectTyped } from '$lib/types/project'
import Project from './Project.svelte'
import { onMount } from 'svelte'

let projectsList: ProjectTyped[] = projectsListData.projects.map((project) => ({
	...project
}))

type Category = 'Open Source' | 'Closed Source'

function groupProjectsByCategory(projects: ProjectTyped[]) {
	const groups = new Map<Category, ProjectTyped[]>()
	for (const project of projects) {
		const category = project.gitUrl ? 'Open Source' : 'Closed Source'
		if (!groups.has(category)) {
			groups.set(category, [])
		}
		groups.get(category)!.push(project)
	}
	return Array.from(groups.entries())
}

let groupedProjects: [Category, ProjectTyped[]][] = []

onMount(async () => {
	groupedProjects = groupProjectsByCategory(projectsList)
})
</script>

<div class="mt-6 flex flex-col gap-12">
	{#each groupedProjects as [category, categoryProjects]}
		<div class="relative">
			<div
				class="category absolute translate-x-[-30px] translate-y-[-50px] font-mono text-8xl font-bold opacity-20 sm:translate-y-[-20px]">
				{category}
			</div>
			<div class="flex flex-col gap-2">
				{#each categoryProjects as project}
					<Project {project} />
				{/each}
			</div>
		</div>
	{/each}
</div>
