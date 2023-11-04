<script lang="ts">
import '../app.css?v=30102023'
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
	<!-- TODO: fix duplicate navbar when this can be merged with correct css, current method is just temporary -->
	<Navbar classNames="sticky sm:top-0 z-50 sm:block hidden" />
	{#key data.url}
		<div in:fly="{{ y: 20, duration: 300 }}">
			<div class="mx-auto min-h-screen max-w-[90ch] break-normal px-4 sm:px-6 lg:px-8">
				<slot />
			</div>
		</div>
	{/key}
	<Footer />
	<Navbar classNames="sticky bottom-0 z-50 sm:hidden block" />
</main>
