<script>
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  const nav = [
    { title: "home", path: "/" },
    { title: "posts", path: "/posts" }
  ];
</script>

<!-- navigation bar stays at the top of the page at all times and has a slight blur when scrolling down for a pretty cool effect .. -->
<header class="sticky top-0 z-10 pt-0 pb-0 backdrop-filter backdrop-blur-lg">
  <nav
    class="h-15 text-sm after:absolute after:inset-x-0 bg-opacity-70 after:w-full after:h-12 after:shadow-hr after:z-[-1] flex items-center justify-between flex-wrap bg-[#030303] p-4"
  >
    <div class="flex items-center mr-6">
      {#each nav as item}
        <a
          href={item.path}
          class="text-gray-400 hover:text-white text-xl font-semibold mr-4 rounded-md p-1 px-2 bg-opacity-0 bg-white hover:bg-opacity-5 monofont"
          class:active={$page.url.pathname == item.path}>{item.title}</a
        >
      {/each}
    </div>

    <div class="text-white ml-6">
      <p>
        <a href="https://github.com/dromzeh/dromzeh.dev"
          ><Icon
            icon="codicon:github-alt"
            class="text-2xl text-white hover:text-white-100"
          />
        </a>
      </p>
    </div>
  </nav>
</header>

<style lang="postcss">
  .active {
    @apply text-white;
  }

  .monofont {
    font-family: "jetbrains mono", monospace !important;
  }
</style>
