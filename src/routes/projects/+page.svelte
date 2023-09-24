<script lang="ts">
import ProjectsContainer from '../../components/projects/ProjectsContainer.svelte'
</script>

<svelte:head>
	<title>projects • dromzeh.dev</title>
</svelte:head>

<div class="py-24 text-zinc-400">
	<h1 class="text-4xl font-semibold text-white">Projects</h1>
	<div class="mb-2 mt-8 flex flex-col gap-3">
		<ProjectsContainer />
	</div>
</div>
