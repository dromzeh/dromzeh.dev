<style lang="postcss">
.active {
  @apply underline decoration-emerald-300;
}
</style>

<script>
import { page } from "$app/stores";
import Icon from "@iconify/svelte";

const nav = [
  { title: "home", path: "/" },
  { title: "posts", path: "/posts" },
  { title: "projects", path: "/projects" },
];
</script>

<!-- navigation bar stays at the top of the page at all times and has a slight blur when scrolling down for a pretty cool effect .. -->
<header class="sticky top-0 z-10 pt-0 pb-0 backdrop-blur-lg backdrop-filter">
  <nav
    class="h-15 after:shadow-hr flex flex-wrap items-center justify-between bg-[#121212] bg-opacity-70 p-4 text-sm after:absolute after:inset-x-0 after:z-[-1] after:h-12 after:w-full"
  >
    <div class="align-center mr-6 flex">
      {#each nav as item}
        <a
          href="{item.path}"
          class="mr-4 rounded-md bg-white bg-opacity-0 p-1 px-2 text-xl text-gray-400 hover:bg-opacity-5 hover:font-semibold hover:text-white"
          class:active="{item.path === '/'
            ? $page.url.pathname === '/'
            : $page.url.pathname.startsWith(item.path)}">{item.title}</a
        >
      {/each}
    </div>

    <div class="ml-6 text-white">
      <p>
        <a href="https://github.com/dromzeh/dromzeh.dev"
          ><Icon
            icon="codicon:github-alt"
            class="hover:text-white-100 text-2xl text-white"
          />
        </a>
      </p>
    </div>
  </nav>
</header>
