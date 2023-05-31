<style lang="postcss">
.active {
  @apply underline decoration-indigo-300 decoration-2;
}
</style>

<script>
import { page } from "$app/stores";

const nav = [
  { title: "home", path: "/" },
  { title: "projects", path: "/projects" },
  { title: "posts", path: "/posts" },
];
</script>

<!-- navigation bar stays at the top of the page at all times and has a slight blur when scrolling down for a pretty cool effect .. -->
<header class="sticky top-0 z-10 pb-0 pt-0 backdrop-blur-lg backdrop-filter">
  <nav
    class="h-15 after:shadow-hr flex flex-wrap items-center justify-between bg-[#090909] bg-opacity-70 p-4 text-sm after:absolute after:inset-x-0 after:z-[-1] after:h-12 after:w-full">
    <div class="align-center mr-6 flex">
      {#each nav as item}
        <a
          href="{item.path}"
          class="mr-4 rounded-md bg-white bg-opacity-0 p-1 px-2 text-xl font-semibold text-gray-400 hover:bg-opacity-5 hover:text-white"
          class:active="{item.path === '/'
            ? $page.url.pathname === '/'
            : $page.url.pathname.startsWith(item.path)}">{item.title}</a>
      {/each}
    </div>

    <div class="ml-6">
      <p>
        <a href="https://git.dromzeh.dev/dromzeh.dev"
          ><i
            class="fab fa-github hover:text-white text-2xl text-gray-400 bg-white bg-opacity-0 hover:bg-opacity-5 rounded-md p-2"></i>
        </a>
      </p>
    </div>
  </nav>
</header>
