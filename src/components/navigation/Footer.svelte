<script lang="ts">
import { getCommitsRecent } from '$lib/helpers/github'
import { onMount } from 'svelte'
import Lanyard from '../Lanyard.svelte'

const currentYear = new Date().getFullYear()

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
let commits: any[] = []

onMount(async () => {
	commits = await getCommitsRecent(1)
	console.log(commits)
})
</script>

<footer class="text-left text-zinc-400">
	<div class="flex items-center justify-center lg:justify-center">
		<div class="text-center">
			{#if commits && commits.length > 0}
				<div class="mb-2 text-xs text-gray-500">
					<a href="https://git.dromzeh.dev/dromzeh.dev/commit/{commits[0].sha}">
						{commits[0].shaSpliced}[{commits[0].branch}] • {commits[0].commitMsg}
					</a>
				</div>
			{/if}
			<div class="my-2">
				<p>
					© 2020-{currentYear} • dromzeh.dev, built with SvelteKit.
				</p>
			</div>
		</div>
	</div>

	<div class="mb-10 text-center">
		<Lanyard />
	</div>
</footer>
