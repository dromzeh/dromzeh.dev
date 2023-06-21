<style lang="postcss">
.active {
	@apply text-white;
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
	class="sticky top-0 z-10 border-b border-gray-400/50 pb-0 pt-0 backdrop-blur-lg backdrop-filter">
	<nav
		class="after:shadow-hr flex flex-wrap items-center justify-between bg-[#090909] bg-opacity-70 text-sm after:absolute after:inset-x-0 after:z-[-1] after:h-12 after:w-full">
		<div class="align-center m-2 flex gap-3">
			{#each nav as item}
				<a
					href="{item.path}"
					class="link-underline rounded-md p-1 px-2 font-semibold text-gray-400 hover:text-white"
					class:active="{item.path === '/'
						? $page.url.pathname === '/'
						: $page.url.pathname.startsWith(item.path)}">{item.title}</a>
			{/each}
		</div>
	</nav>
</header>
