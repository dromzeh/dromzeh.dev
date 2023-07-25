<script lang="ts">
import ProjectsContainer from '../../components/Projects/ProjectsContainer.svelte'
</script>

<svelte:head>
	<title>projects • dromzeh.dev</title>
</svelte:head>

<div class="py-24 text-gray-400">
	<h1 class="text-4xl font-semibold text-white">Projects</h1>
	<p class="text-lg font-semibold text-white">
		Some things I've made. I make most of my stuff open-source, so feel free to check out the
		code on GitHub.
	</p>
	<div class="mb-2 mt-8 flex flex-col gap-3">
		<ProjectsContainer />
	</div>
</div>
