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
  import DiscordStatus from "../components/discordStatus.svelte";

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

<body class="text-gray-100">
  <div class="mx-auto max-w-screen-lg px-3 py-6">
    <div
      class="flex flex-col items-center md:flex-row md:justify-between md:gap-x-20"
    >
      <div>
        <h1 class="text-2xl font-semibold">
          hi 👋 i'm <span class="highlight">dromzeh,</span>
        </h1>
        <p class="text-xl text-m mt-3">
          Also known as Marcel, I'm a <span class="highlight">{age}</span> year
          old developer. I currently focus more on
          <span class="highlght">front-end</span>
          website development.
        </p>
      </div>
    </div>
    
    <br />

    <!-- 
    <div class=" mb-6 text-3xl font-semibold">
      <a
        class="border-l-[8px] border-purple-200 highlightUnderline"
        href={"#projects"}>view projects</a
      >
    </div>
    -->

    <DiscordStatus />

    <div id="about" class="mb-6">
      <div class="flex flex-col align-center my-auto items-center">
        <span class="highlight text-4xl font-semibold mb-6">#about —</span>
      </div>

      <div class="mb-6 p-1">
        <p class="text-xl">
          I've been 'writing' code since <span class="highlight">2012</span>. As
          of recent, I've been learning and using Svelte (+ Javascript) and
          Tailwind for usage in nearly all of my web projects. I can also
          program with C#, Javascript and Python. I'm currently working on a few
          projects, one of which is
          <a href="https://wanderer.moe" class="highlightUnderline"
            >wanderer.moe</a
          >, a website that hosts genshin impact assets (it's pretty popular for
          'some reason').
        </p>
        <br />
      </div>
    </div>

    <div id="projects" class="mb-6">
      <div class="flex flex-col align-center my-auto items-center">
        <span class="highlight text-4xl font-semibold mb-6">#projects —</span>
      </div>
      <div class="grid grid-cols-1 gap-3" />
      <!-- project grid section..-->

      {#each allProjects as project}
      <div
        class="flex flex-col bg-[#2a2a2a] rounded-lg mt-6 shadow-md"
      >
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5
            class="text-2xl font-bold tracking-tight text-purple-100 monofont"
          >
            {project.name}
          </h5>
          {#if project.uses}
          <div class = "flex flex-row gap-1">
          {#each project.uses as uses}
            <p
              class="flex flex-row p-[1px] items-center justify-center text-xs font-medium leading-5 text-white hover:text-purple-100 transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]"
            >
            {uses}
            </p>
          {/each}
          </div>
          {/if}
          <p class="mb-3 font-normal text-gray-100">
            {project.description}
          </p>
          {#if project.isopenSource}
          <div class="flex flex-row">
            <a
              href={project.url}
              class="flex flex-row items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white hover:text-purple-100 transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]"
            >
            <p>View on GitHub</p>
            </a>
            </div> 
          {/if}
          {#if project.isopenSource == false && project.url}
          <div class="flex flex-row">
            <a
              href={project.url}
              class="flex flex-row items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white hover:text-purple-100 transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]"
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
  .highlight {
    @apply text-purple-100 bg-[#2a2a2a] rounded-md p-1;
    font-family: "jetbrains mono", monospace;
  }
  .highlightUnderline {
    @apply text-purple-100 bg-[#2a2a2a] rounded-md p-1 hover:underline;
    font-family: "jetbrains mono", monospace;
  }
  .monofont{
    font-family: "jetbrains mono", monospace !important;
  }
</style>
