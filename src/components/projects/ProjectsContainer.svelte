<script lang="ts">
import projectsListData from '../../data/projects.json'
import type { Project as ProjectTyped } from '$lib/types/project'
import Project from './Project.svelte'

let projectsList: ProjectTyped[] = projectsListData.projects.map((project) => ({
	...project
}))

export let numProjectsToShow: number = projectsList.length
</script>

<div class="flex flex-col gap-6">
	{#each projectsList.slice(0, numProjectsToShow) as project}
		<Project project="{project}" />
	{/each}
</div>
