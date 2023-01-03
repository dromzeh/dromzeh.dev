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
  let myTime;
  let respondStatus;
  let age = "16"; // also incase getAge function fails for some reason..

/* 
The code below does the following:
1. Get the current time in London, UK ( my time )
2. Check if it's between 8am and 2am, if so, respondStatus is set to "I am most likely awake."
3. If not, it will check if I'm online on Discord. If so, respondStatus is set to "I am most likely awake."
4. If I'm offline on Discord and the time isn't between specified, respondStatus is set to "I am most likely asleep."
*/
async function getTime(){
  const date = new Date();
  const options = {
    timeZone: "Europe/London",
    hour: "numeric",
    minute: "numeric",
  };
  myTime = date.toLocaleString("en-GB", options);
}

setInterval(() => {
  getTime();
}, 5000);

setInterval(() => {
  let time = dayjs().diff(dayjs(1156118401000), "year", true);
  age = time.toString().substring(0, 12);
}, 50);


onMount(() => {
  getTime();
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
        <p class="text-xl text-m mt-3 break-words">
          Also known as Marcel, I'm a <span class="highlight">{age}</span>
          year old developer. I currently focus more on
          <span class="highlight">front-end</span>
          website development. I'm also the developer of <a href="https://wanderer.moe" target="_blank" rel="noreferrer" class="highlight hover:underline">wanderer.moe</a>, a Genshin Impact Assets website.
        </p>
      </div>
    </div>

    <br />

    <InfoGrid />


    <div id="contact" class="mb-6">
      <div class="flex flex-col align-center my-auto items-center mb-6">
        <a href="#contact">
          <span class="monofont text-white text-4xl font-semibold">connections —</span
          >
        </a>
        {#if myTime != undefined}
          <p class = "text-gray-400">It is currently <span class = "text-white">{myTime}</span> for me.</p>
        {/if}
      </div>

      <div class = "flex flex-row flex-wrap gap-1 my-auto justify-center">
      
        <a href="https://discord.com/users/492731761680187403" target="_blank" rel="noreferrer">
          <button class = "flex flex-row items-center justify-center rounded-lg  px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]">
            <Icon icon="ic:baseline-discord" class = "mr-2 text-xl text-[#6370F4] "/>
            <p>Discord</p>
          </button>
        </a>

        <a href="https://twitter.com/dromzeh" target="_blank" rel="noreferrer">
          <button class = "flex flex-row items-center justify-center rounded-lg  px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]">
            <Icon icon="logos:twitter" class = "mr-2 text-l" />
            <p>Twitter</p>
          </button>
        </a>

        <a href="mailto:marcel@dromzeh.dev" target="_blank" rel="noreferrer">
          <button class = "flex flex-row items-center justify-center rounded-lg  px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]">
            <Icon icon="ic:baseline-mail" class = "mr-2 text-xl" />
            <p>marcel@dromzeh.dev</p>
          </button>
          </a>

        <a href="https://akatsuki.pw/u/41379?mode=3&rx=0 " target="_blank" rel="noreferrer">
          <button class = "flex flex-row items-center justify-center rounded-lg  px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]">
            <Icon icon="material-symbols:link-rounded" class = "mr-2 text-xl" />
            <p>akatsuki</p>
          </button>
        </a>

        <a href="https://stats.fm/dromzeh " target="_blank" rel="noreferrer">
          <button class = "flex flex-row items-center justify-center rounded-lg  px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]">
            <Icon icon="logos:spotify-icon" class = "mr-2 text-xl" />
            <p>stats.fm</p>
          </button>
        </a>

        <a href="https://tiktok.com/@dromzeh " target="_blank" rel="noreferrer">
          <button class = "flex flex-row items-center justify-center rounded-lg  px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#121212] hover:bg-[#0A0A0A]">
            <Icon icon="akar-icons:tiktok-fill" class = "mr-2 text-xl" />
            <p>TikTok</p>
          </button>
        </a>

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
          class="flex flex-col backdrop-blur-lg rounded-lg shadow-md border-[#121212] hover:border-gray-600/50 border-2 "
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
