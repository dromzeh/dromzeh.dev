<script lang="ts">
import '../app.css?v=24092023'
import Navbar from '../components/navigation/Navbar.svelte'
import Footer from '../components/navigation/Footer.svelte'
import 'iconify-icon'
import NProgress from 'nprogress'
import { afterNavigate, beforeNavigate } from '$app/navigation'
import { fly } from 'svelte/transition'

beforeNavigate(() => {
	NProgress.start()
})

afterNavigate(() => {
	NProgress.done()
})

export let data
</script>

<main>
	<Navbar />
	{#key data.url}
		<div in:fly="{{ y: 20, duration: 300 }}">
			<div class="mx-auto min-h-screen max-w-[90ch] break-normal px-4 sm:px-6 lg:px-8">
				<slot />
			</div>
		</div>
	{/key}
	<Footer />
</main>
