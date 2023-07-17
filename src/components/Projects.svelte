<style lang="postcss">
.arrow {
	transition: transform 0.1s ease-in-out;
	transform: rotate(-45deg);
}

.project:hover .arrow {
	transform: rotate(0deg);
	@apply text-white;
}

.project:hover .desc {
	@apply text-gray-300;
}
</style>

<script lang="ts">
import { onMount } from 'svelte'
import type { Project } from '$lib/types/project'
import projectsListData from '../data/projects.json'

export let showProjects = 0

interface ProjectWithHover extends Project {
	isHovered: boolean
}

let projectsList: ProjectWithHover[] = projectsListData.projects.map((project) => ({
	...project,
	isHovered: false
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
		<hr class="border-primary-600/10" />
		{#each projectsList as proj}
			<a href="{proj.url ? proj.url : proj.gitUrl ? proj.gitUrl : '#'}" target="_blank">
				<div
					class="project transition-all"
					on:mouseenter="{() => (proj.isHovered = true)}"
					on:mouseleave="{() => (proj.isHovered = false)}">
					<p class="mb-1 text-xl font-semibold text-white">
						{proj.name}
					</p>
					<div class="mb-2 flex flex-row gap-1">
						{#each proj.categories.slice(0, 3) as category}
							<span
								class="rounded-md bg-primary-400/10 px-1.5 py-1 text-xs uppercase text-primary-300 ring-1 ring-inset ring-primary-500/20">
								{category}
							</span>
						{/each}
						{#if proj.categories.length > 3}
							<span
								class="rounded-md bg-primary-600/10 px-1.5 py-1 text-xs uppercase text-primary-400 ring-1 ring-inset ring-primary-500/20">
								{#if proj.categories.length > 4}
									+
									{proj.categories.length - 3} more
								{:else}
									{proj.categories[3]}
								{/if}
							</span>
						{/if}
					</div>
					<p class="desc text-sm transition">
						{proj.description}
					</p>
					<p class="text-right"><i class="fa fa-arrow-right arrow"></i></p>
				</div>
			</a>
			<hr class="border-primary-600/10" />
		{/each}
	</div>
</div>
