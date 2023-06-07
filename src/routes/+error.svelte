<script>
import { page } from '$app/stores'
</script>

<svelte:head>
	<title>{$page.status} • dromzeh.dev</title>
</svelte:head>

<div class="flex h-screen">
	<div class="m-auto text-center">
		<p
			class="mb-4 rounded-lg border-2 border-white bg-gray-400 px-2 text-6xl font-semibold text-secondary-300 transition-colors hover:bg-secondary-300 hover:text-white">
			{$page.status}
		</p>
		{#if $page.error?.message}
			<p class="text-xl text-gray-300">{$page.error.message}</p>
		{/if}
	</div>
</div>
