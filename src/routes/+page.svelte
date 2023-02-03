<style lang="postcss">
.highlight {
  @apply text-white;
}
</style>

<script>
import VanillaTilt from "vanilla-tilt";
import dayjs from "dayjs";
import InfoGrid from "../components/InfoGrid.svelte";

export let data;

let allProjects = data.projects.projects; // :3
let age = "16"; // also incase getAge function fails for some reason..

// print all projects to console that are active
console.log(allProjects.filter((project) => project.active === true));

setInterval(() => {
  let time = dayjs().diff(dayjs(1156118401000), "year", true);
  age = time.toString().substring(0, 7);
}, 50);
</script>

<svelte:head>
  <title>index — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<body class="min-h-screen text-gray-400">
  <div class="mx-auto max-w-screen-lg px-3 py-6">
    <div
      class="flex flex-col items-center md:flex-row md:justify-between md:gap-x-20"
    >
      <div class="mb-6">
        <p class="text-2xl font-semibold">
          hi 👋 i'm <span class="highlight">Marcel,</span>
        </p>
        <p class="break-words">
          {age} year old Self-Taught Reverse and Software Engineer from the UK.
        </p>
        <p class="break-words">
          My current interests includes <span class="highlight"
            >web design & development, datahoarding, music, and reverse
            engineering.</span
          >
        </p>

        <p class="mt-3 text-white">
          /* view my <a href="/posts" class="underline hover:text-emerald-300"
            >posts</a
          > */
        </p>
      </div>
    </div>

    <br />

    <div id="projects">
      <div class="mb-3 flex flex-col">
        <p class="text-2xl font-semibold text-white">active development:</p>
        <p class="mb-3 font-normal text-gray-400">
          <a
            class="text-white underline hover:text-emerald-300"
            href="{allProjects.filter((project) => project.active)[0].url}"
            >{allProjects.filter((project) => project.active)[0].name}</a
          >: {allProjects.filter((project) => project.active)[0].description}
          <span class="text-sm italic text-gray-500"
            >// {#each allProjects.filter((project) => project.active)[0].tags as tag, i}
              {tag}{#if i < allProjects.filter((project) => project.active)[0].tags.length - 1},&nbsp;{/if}{/each}</span
          >
        </p>
      </div>

      <div class="mb-3 flex flex-col">
        <p class=" text-2xl font-semibold text-white">other projects:</p>
        <p class="mb-3 font-normal text-gray-400">
          <a
            class="text-white underline hover:text-emerald-300"
            href="{allProjects.filter((project) => !project.active)[0].url}"
            >{allProjects.filter((project) => !project.active)[0].name}</a
          >: {allProjects.filter((project) => !project.active)[0].description}
          <span class="text-sm italic text-gray-500"
            >// {#each allProjects.filter((project) => !project.active)[0].tags as tag, i}
              {tag}{#if i < allProjects.filter((project) => !project.active)[0].tags.length - 1},&nbsp;{/if}{/each}</span
          >
        </p>
      </div>

      <!--   {#each allProjects.filter((project) => project.active) as project}
      <p class="mb-6 font-normal text-gray-400">
        <a
          class="text-white underline hover:text-emerald-300"
          href="{project.url}">{project.name}</a
        >: {project.description}
        <span class="text-sm italic text-gray-500"
          >{#each project.tags as tag, i}
            {tag}{#if i < project.tags.length - 1},&nbsp;{/if}{/each}</span
        >
      </p>
    {/each} -->

      <div>
        <p class="mt-3 mb-12 text-white">
          /* view all <a
            href="/projects"
            class="underline hover:text-emerald-300">projects</a
          > */
        </p>
      </div>

      <InfoGrid />
    </div>
  </div>
</body>
