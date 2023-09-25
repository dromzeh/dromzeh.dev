<script lang="ts">
import LanyardContainer from '../components/LanyardContainer.svelte'
import Intro from '../components/main/Intro.svelte'
import SocialsContainer from '../components/socials/SocialsContainer.svelte'
</script>

<svelte:head>
	<title>home • dromzeh.dev</title>
</svelte:head>

<div class="py-24 text-zinc-400">
	<div class="flex flex-col gap-3">
		<div>
			<h1 class="text-4xl font-semibold text-white">dromzeh.dev</h1>
			<div class="mb-2 mt-8 flex flex-col gap-3">
				<Intro />
			</div>
		</div>
		<SocialsContainer />
	</div>
</div>
