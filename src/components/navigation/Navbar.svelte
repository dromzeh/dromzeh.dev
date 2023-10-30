<style lang="postcss">
.active {
	@apply bg-zinc-800 bg-opacity-30 text-white;
}
</style>

<script lang="ts">
import { Home, FileHeart, Book, Github } from 'lucide-svelte'
import { page } from '$app/stores'

interface NavItems {
	title: string
	path: string
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any - I don't know how to type this
	icon: any
}

const nav: NavItems[] = [
	{ title: 'home', path: '/', icon: Home },
	{ title: 'projects', path: '/projects', icon: FileHeart },
	{ title: 'posts', path: '/posts', icon: Book },
	{ title: 'github', path: 'https://git.dromzeh.dev/', icon: Github }
]
</script>

<header
	class="sticky top-0 z-50 border-b border-gray-600/10 pb-0 pt-0 backdrop-blur-lg backdrop-filter">
	<nav class="flex flex-wrap items-center justify-between bg-secondary-700 bg-opacity-70">
		<div class="mx-auto max-w-[90ch]">
			<div class="align-center m-2 flex gap-3 transition-all">
				{#each nav as item}
					<a
						href="{item.path}"
						class="link-underline flex items-center gap-2 rounded-md p-1 px-2 font-semibold text-zinc-400 duration-300 hover:bg-zinc-700/30 hover:text-white"
						class:active="{item.path === '/'
							? $page.url.pathname === '/'
							: $page.url.pathname.startsWith(item.path)}">
						{#if item.icon}
							<svelte:component this="{item.icon}" class="inline-block h-4 w-4" />
						{/if}
						{item.title}
					</a>
				{/each}
			</div>
		</div>
	</nav>
</header>
