<script lang="ts">
import '../app.css?v=05062023'
import Navbar from '../components/Navbar.svelte'
import LoadingTransition from '../components/LoadingTransition.svelte'

export let data
</script>

<div class="layout">
	<LoadingTransition url="{data.url}">
		<Navbar />
		<main class="relative mx-auto max-w-[90ch] break-normal px-4 sm:px-6 lg:px-8">
			<slot />
		</main>
	</LoadingTransition>
</div>
