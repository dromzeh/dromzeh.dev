<style lang="postcss">
.highlight {
  @apply rounded-md bg-[#2a2a2a] p-1 text-white;
  font-family: "jetbrains mono", monospace;
}
.monofont {
  font-family: "jetbrains mono", monospace !important;
}
</style>

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
      <div class="align-center my-auto flex flex-col items-center">
        <span class="monofont mb-6 text-4xl font-semibold text-white"
          >posts —</span
        >
      </div>
      <div class="grid grid-cols-1 gap-3"></div>
      <!-- project grid section..-->

      {#each data.posts as post}
        <div data-tilt data-tilt-max="5" data-tilt-speed="100">
          <div
            class="mt-6 flex flex-col rounded-lg border-2 border-[#121212] bg-transparent bg-opacity-50 shadow-md hover:border-gray-600/50"
          >
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="monofont text-2xl font-bold tracking-tight text-white">
                {post.meta.title}
              </h5>
              {#if post.meta.tags}
                <div class="flex flex-row gap-1">
                  {#each post.meta.tags as tags}
                    <p
                      class="flex flex-row items-center justify-center bg-[#121212] p-[1px] text-xs font-medium leading-5 text-white duration-150 hover:bg-[#0A0A0A]"
                    >
                      {tags}
                    </p>
                  {/each}
                </div>
              {/if}
              <p class="mb-3 font-normal text-gray-400">
                {post.meta.description}
              </p>
              <div class="flex flex-row">
                <a
                  href="{post.path}"
                  class="flex flex-row items-center justify-center bg-[#121212] px-4 py-2 text-sm font-medium leading-5 text-white duration-150 hover:bg-[#0A0A0A]"
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
