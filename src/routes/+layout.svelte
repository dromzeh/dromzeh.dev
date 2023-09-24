<script lang="ts">
import '../app.css?v=24092023'
import Navbar from '../components/navigation/Navbar.svelte'
import Footer from '../components/navigation/Footer.svelte'
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

<Navbar />
<div class="mx-auto min-h-screen max-w-[90ch] break-normal px-4 sm:px-6 lg:px-8">
	<slot />
</div>
<Footer />
