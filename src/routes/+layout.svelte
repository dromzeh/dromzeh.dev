<script lang="ts">
import '../app.css?v=070620231'
import Navbar from '../components/Navbar.svelte'
import Footer from '../components/Footer.svelte'
import 'iconify-icon'

import NProgress from 'nprogress'

import { afterNavigate, beforeNavigate } from '$app/navigation'

beforeNavigate(() => {
	NProgress.start()
})

afterNavigate(() => {
	NProgress.done()
})
</script>

<div class="layout">
	<Navbar />
	<main class="relative mx-auto max-w-[90ch] break-normal px-4 sm:px-6 lg:px-8">
		<slot />
	</main>
	<Footer />
</div>
