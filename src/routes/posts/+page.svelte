<script>
import Icon from "@iconify/svelte";
import VanillaTilt from "vanilla-tilt";

export let data;
</script>

<svelte:head>
  <title>posts — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<body class="min-h-screen text-gray-100">
  <div class="mx-auto max-w-screen-lg px-3 py-6">
    <div id="postsHeader" class="mb-3">
      <h1 class="mb-6 text-3xl font-semibold text-white">posts</h1>
      {#each data.posts as post}
        <p class="mb-6 font-normal text-gray-400">
          <a
            class="text-white underline hover:text-emerald-300"
            href="{post.path}">{post.meta.title}</a
          >: {post.meta.description}
          <span class="text-sm italic text-gray-500"
            >// {#each post.meta.tags as tag, i}
              {tag}{#if i < post.meta.tags.length - 1},&nbsp;{/if}{/each}</span
          >
        </p>
      {/each}
    </div>
    <!-- end of posts grid -->
  </div>
</body>
