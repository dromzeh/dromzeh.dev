<script lang="ts">
import { getCommitsRecent } from '$lib/helpers/github'
import { onMount } from 'svelte'
import Lanyard from './Lanyard.svelte'

const currentYear = new Date().getFullYear()
let commits: any[] = []

onMount(async () => {
	commits = await getCommitsRecent(1)
	console.log(commits)
})
</script>

<footer class="text-left text-gray-400">
	<div class="flex items-center justify-center p-6 text-sm lg:justify-center">
		<div class="px-3 text-center">
			{#if commits && commits.length > 0}
				<div class="mb-2 text-xs text-gray-500">
					<a href="https://git.dromzeh.dev/dromzeh.dev/commit/{commits[0].sha}">
						{commits[0].shaSpliced}[{commits[0].branch}] • {commits[0].commitMsg}
					</a>
				</div>
			{/if}
			<div class="mb-3">
				<p>
					© 2020-{currentYear} • dromzeh.dev, powered by
					<span class="text-[#EC8224]"> Cloudflare<span> </span></span>
				</p>
				<p>
					<a
						class="link-underline font-semibold text-white"
						href="https://buymeacoffee.com/marcelmd">buymeacoffee</a>
					•
					<a
						class="link-underline font-semibold text-white"
						href="https://git.dromzeh.dev/">my github</a>
				</p>
			</div>
		</div>
	</div>
	<div class="mb-10 text-center">
		<Lanyard />
	</div>
</footer>
