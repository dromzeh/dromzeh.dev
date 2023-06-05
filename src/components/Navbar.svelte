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
	{ title: 'posts', path: '/posts' }
]
</script>

<header
	class="sticky top-0 z-10 border-b-[1px] border-gray-100/20 pb-0 pt-0 backdrop-blur-lg backdrop-filter">
	<nav
		class="after:shadow-hr flex flex-wrap items-center justify-between bg-secondary-100 bg-opacity-95 p-1 text-sm after:absolute after:inset-x-0 after:z-[-1] after:h-12 after:w-full">
		<div class="align-center mr-6 flex gap-4">
			{#each nav as item}
				<a
					href="{item.path}"
					class:active="{item.path === '/'
						? $page.url.pathname === '/'
						: $page.url.pathname.startsWith(item.path)}"
					class="relative p-1 text-gray-400 transition-colors hover:text-white">
					{item.title}
					<!-- <i
						class="fa-solid fa-arrow-up-right-from-square absolute right-[-3] top-2 ml-1 text-xs"
					></i> -->
				</a>
			{/each}
		</div>

		<div class="ml-6">
			<p>
				<a href="https://git.dromzeh.dev/dromzeh.dev">
					<i
						class="fab fa-github bg-opacity-0 px-2 text-lg text-gray-400 transition-colors hover:text-white"
					></i>
				</a>
			</p>
		</div>
	</nav>
</header>
