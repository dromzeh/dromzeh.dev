<style lang="postcss">
.active {
	@apply bg-zinc-800 bg-opacity-30 text-white;
}
</style>

<script lang="ts">
import { page } from '$app/stores'

interface NavItems {
	title: string
	path: string
}

const nav: NavItems[] = [
	{ title: 'home', path: '/' },
	{ title: 'projects', path: '/projects' },
	{ title: 'posts', path: '/posts' },
	{ title: 'github', path: 'https://git.dromzeh.dev/' } // TODO: maybe make a custom /github page?
]
</script>

<header
	class="sticky top-0 z-10 border-b border-gray-600/10 pb-0 pt-0 backdrop-blur-lg backdrop-filter">
	<nav class="flex flex-wrap items-center justify-between bg-secondary-700 bg-opacity-70">
		<div class="mx-auto max-w-[90ch]">
			<div class="align-center m-2 flex gap-3 transition-all">
				{#each nav as item}
					<a
						href="{item.path}"
						class="link-underline rounded-md p-1 px-2 font-semibold text-zinc-400 duration-300 hover:bg-zinc-700/30 hover:text-white"
						class:active="{item.path === '/'
							? $page.url.pathname === '/'
							: $page.url.pathname.startsWith(item.path)}">
						{item.title}
					</a>
				{/each}
			</div>
		</div>
	</nav>
</header>
