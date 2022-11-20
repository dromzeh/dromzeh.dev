<script>
  import Icon from "@iconify/svelte";
  import VanillaTilt from "vanilla-tilt";

  export let data;
</script>

<svelte:head>
  <title>posts — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<body class="text-gray-100">
  <div class="mx-auto max-w-screen-lg px-3 py-6">
    <div id="projects" class="mb-6">
      <div class="flex flex-col align-center my-auto items-center">
        <span class="highlight text-4xl font-semibold mb-6">#posts —</span>
      </div>
      <div class="grid grid-cols-1 gap-3" />
      <!-- project grid section..-->

      {#each data.posts as post}
        <div data-tilt data-tilt-max="5" data-tilt-speed="100">
          <div
            class="flex flex-col bg-black backdrop-blur-lg bg-opacity-50 rounded-lg mt-6 shadow-md"
          >
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5
                class="text-2xl font-bold tracking-tight text-blue-100 monofont"
              >
                {post.meta.title}
              </h5>
              {#if post.meta.tags}
                <div class="flex flex-row gap-1">
                  {#each post.meta.tags as tags}
                    <p
                      class="flex flex-row p-[1px] items-center justify-center text-xs font-medium leading-5 text-white hover:text-blue-100 transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]"
                    >
                      {tags}
                    </p>
                  {/each}
                </div>
              {/if}
              <p class="mb-3 font-normal text-gray-100">
                {post.meta.description}
              </p>
              <div class="flex flex-row">
                <a
                  href={post.path}
                  class="flex flex-row items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white hover:text-blue-100 transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]"
                >
                  <p>View</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    <!-- end of posts grid -->
  </div>
</body>

<style lang="postcss">
  .highlight {
    @apply text-blue-100 bg-[#2a2a2a] rounded-md p-1;
    font-family: "jetbrains mono", monospace;
  }
  .monofont {
    font-family: "jetbrains mono", monospace !important;
  }
</style>
