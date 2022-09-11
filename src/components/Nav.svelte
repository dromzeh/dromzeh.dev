<script>
  import Icon from "@iconify/svelte";
</script>

<!-- navigation bar stays at the top of the page at all times and has a slight blur when scrolling down for a pretty cool effect .. -->
<header class="sticky top-0 z-10 pt-0 pb-0 backdrop-filter backdrop-blur-lg">
  <nav
    class=" h-15 text-sm after:absolute after:inset-x-0 bg-opacity-70 after:w-full after:h-12 after:shadow-hr after:z-[-1] flex items-center justify-between flex-wrap bg-[#0a0a0a] p-4"
  >
    <div class="flex items-center mr-6">
      <a href="/"><p class="text-xl font-semibold text-white">dromzeh.dev</p></a>
    </div>

    <div class="text-white ml-6">
      <p>
        <a href="https://github.com/dromzeh/dromzeh.dev"
          ><Icon
          icon="codicon:github-alt"
          class="text-xl text-white hover:text-indigo-200"
        />
      </p>
    </div>
  </nav>
</header>
