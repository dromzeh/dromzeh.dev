<script context = "module">
  // TODO: move this to a separate file..
  import projectsList from "../data/projects.json";
</script>

<script>
  import VanillaTilt from "vanilla-tilt";
  import { onMount } from "svelte";
  import axios from "axios";
  import dayjs from "dayjs";
  import Icon from "@iconify/svelte";
  import InfoGrid from "../components/InfoGrid.svelte";

  let allProjects = projectsList.projects; // :3

  let age = "16"; // also incase getAge function fails for some reason..

  async function getAge() {
    setInterval(() => {
      let time = dayjs().diff(dayjs(1156118401000), "year", true);
      age = time.toString().substring(0, 6);
    }, 50);
  }

  onMount(() => {
    getAge();
  });
</script>

<svelte:head>
  <title>index — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<body class="text-gray-400">
  <div class="mx-auto max-w-screen-lg px-3 py-6">
    <div
      class="flex flex-col items-center md:flex-row md:justify-between md:gap-x-20"
    >
      <div>
        <h1 class="text-2xl font-semibold">
          hi 👋 i'm <span class="highlight">dromzeh,</span>
        </h1>
        <p class="text-xl text-m mt-3">
          Also known as Marcel, I'm a <span class="highlight">{age}</span>
          year old developer. I currently focus more on
          <span class="highlight">front-end</span>
          website development.
        </p>
      </div>
    </div>

    <br />

    <InfoGrid />


    <div id="about" class="mb-6">
      <div class="flex flex-col align-center my-auto items-center">
        <a href="#about" class="mb-6">
          <span class="monofont text-white text-4xl font-semibold">about —</span
          >
        </a>
      </div>

      <div class="mb-6 p-1">
        <p class="text-l text-gray-400">
          I've been writing code since <span class = "highlight">2012</span> and have been focusing on learning
          and using <span class = "highlight">Svelte</span> and <span class = "highlight">Tailwind</span> for my web projects. In addition to
          Svelte and Tailwind, I also have experience with <span class = "highlight">C#</span>, <span class = "highlight">Javascript</span>, and
          <span class = "highlight">Python</span>. One of my current projects is <a class = "highlight hover:underline" href = "https://wanderer.moe/">wanderer.moe</a>, a website that
          hosts Genshin Impact assets. The site has been growing in popularity
          and I'm constantly working on improving it.
        </p>
        <br />
      </div>
    </div>

    <div id="projects" class="mb-6">
      <div class="flex flex-col align-center my-auto items-center">
        <a href="#projects" class="mb-6">
          <span class="monofont text-white text-4xl font-semibold"
            >projects —</span
          >
        </a>
      </div>
      <div class="grid gap-3">
      <!-- project grid section..-->

      {#each allProjects as project}
        <div
          class="flex flex-col backdrop-blur-lg rounded-lg shadow-md border-[#121212] border-2"
        >
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="text-2xl font-bold tracking-tight text-white monofont">
              {project.name}
            </h5>
            {#if project.uses}
              <div class="flex flex-row gap-1 mb-2">
                {#each project.uses as uses}
                  <p
                    class="flex flex-row pl-2 pr-2 items-center justify-center text-xs font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]"
                  >
                    {uses}
                  </p>
                {/each}
              </div>
            {/if}
            <p class="mb-3 font-normal text-gray-400">
              {project.description}
            </p>
            {#if project.isopenSource}
              <div class="flex flex-row">
                <a
                  href={project.url}
                  class="flex flex-row items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]"
                >
                  <p>View on GitHub</p>
                </a>
              </div>
            {/if}
            {#if project.isopenSource == false && project.url}
              <div class="flex flex-row">
                <a
                  href={project.url}
                  class="flex flex-row items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]"
                >
                  <p>View {project.url}</p>
                </a>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
    <!-- end of project grid -->
  </div>
</body>

<style lang="postcss">
  .monofont {
    font-family: "jetbrains mono", monospace !important;
  }
  .highlight {
    color: #ffffff;
  }
</style>
