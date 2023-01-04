<style lang="postcss">
.active {
  @apply text-white;
}

.monofont {
  font-family: "jetbrains mono", monospace !important;
}
</style>

<script>
import { page } from "$app/stores";
import Icon from "@iconify/svelte";

const nav = [
  { title: "home", path: "/" },
  { title: "posts", path: "/posts" },
];
</script>

<!-- navigation bar stays at the top of the page at all times and has a slight blur when scrolling down for a pretty cool effect .. -->
<header class="sticky top-0 z-10 pt-0 pb-0 backdrop-blur-lg backdrop-filter">
  <nav
    class="h-15 after:shadow-hr flex flex-wrap items-center justify-between bg-[#030303] bg-opacity-70 p-4 text-sm after:absolute after:inset-x-0 after:z-[-1] after:h-12 after:w-full"
  >
    <div class="mr-6 flex items-center">
      {#each nav as item}
        <a
          href="{item.path}"
          class="monofont mr-4 rounded-md bg-white bg-opacity-0 p-1 px-2 text-xl font-semibold text-gray-400 hover:bg-opacity-5 hover:text-white"
          class:active="{$page.url.pathname == item.path}">{item.title}</a
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
