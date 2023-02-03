<script>
import Icon from "@iconify/svelte";
import VanillaTilt from "vanilla-tilt";

export let data;
let allProjects = data.projects.projects; // :3
</script>

<svelte:head>
  <title>projects — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<body class="min-h-screen text-gray-100">
  <div class="mx-auto max-w-screen-lg px-3 py-6">
    <div id="postsHeader" class="mb-3">
      <h1 class="mb-6 text-3xl font-semibold text-white">
        active development:
      </h1>

      {#each allProjects.filter((project) => project.active) as project}
        <p class="mb-6 font-normal text-gray-400">
          <a
            class="text-white underline hover:text-emerald-300"
            href="{project.url}">{project.name}</a
          >: {project.description}
          <span class="text-sm italic text-gray-500"
            >// {#each project.tags as tag, i}
              {tag}{#if i < project.tags.length - 1},&nbsp;{/if}{/each}</span
          >
        </p>
      {/each}
      <h1 class="mb-6 text-3xl font-semibold text-white">other projects:</h1>

      {#each allProjects.filter((project) => !project.active) as project}
        <p class="mb-6 font-normal text-gray-400">
          <a
            class="text-white underline hover:text-emerald-300"
            href="{project.url}">{project.name}</a
          >: {project.description}
          <span class="text-sm italic text-gray-500"
            >// {#each project.tags as tag, i}
              {tag}{#if i < project.tags.length - 1},&nbsp;{/if}{/each}</span
          >
        </p>
      {/each}
    </div>
  </div>
</body>
