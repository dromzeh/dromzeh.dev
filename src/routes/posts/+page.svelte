<script>
  import Icon from "@iconify/svelte";
  import VanillaTilt from "vanilla-tilt";

  export let data;
</script>

<svelte:head>
  <title>posts — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<div id="main" class="flex items-center justify-center">
  <div class="lg:p-20 md:p-10 p-3">
    <!-- project section -->
    <h4 class="text-2xl font-semibold gradientText ">posts</h4>
    <p class="text-white">
      if you want to see how i
      implemented this using mdsvex & tailwindcss' typography — feel free to check out the source code! (•̀ᴗ•́)و ̑̑
    </p>
    <p class = "text-gray-200 text-sm">fyi: you can make a request to <code class = "text-violet-400">/api/posts</code></p>

    <div class="">
      <div class="grid grid-cols-1 gap-4">
        <!-- 1 column with each container having a gap of 4, else the containers will be too close to eachother... -->
        {#each data.posts as post}
        <div data-tilt data-tilt-max="5" data-tilt-speed="100">
          <div class="relative p-1">
            <a href="{post.path}">
              <div
                class="bg-gradient-to-r p-[2px] from-violet-400 via-sky-400 to-indigo-400 transition duration-150 ease-in-out rounded md:hover:scale-105 "
              >
                <div class="bg-[#070707] projectContainer p-4 ">
                  <div>
                    <h4 class="text-2xl font-semibold text-white">{post.meta.title}</h4>
                    <p class="my-2 text-sm text-white indent-2">{post.meta.date} - {post.meta.description}</p>
                    <div class="flex items-center mt-4 gap-2">
                      {#each post.meta.tags as tag}
                      <div
                        class="hover:bg-opacity-25 bg-indigo-400 bg-opacity-5 p-2 rounded-md font-bold uppercase text-xs text-indigo-300"
                      >
                        {tag}
                      </div>
                      {/each}

                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .gradientText {
    @apply text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-sky-100 font-semibold;
  }
</style>
