<style lang="postcss">
.highlight {
  @apply text-white;
}
</style>

<script>
import dayjs from "dayjs";
import moment from "moment-timezone";
import InfoGrid from "../components/InfoGrid.svelte";

export let data;

let allProjects = data.projects.projects;
let allAlbums = data.albums.albums;

let age = "16"; // also incase getAge function fails for some reason..
let myTime = moment().tz("Europe/London").format("HH:mm:ss");

// console.log(allProjects.filter((project) => project.active === true));

setInterval(() => {
  let time = dayjs().diff(dayjs(1156118401000), "year", true);
  age = time.toString().substring(0, 7);
  myTime = moment().tz("Europe/London").format("HH:mm:ss");
}, 50);
</script>

<svelte:head>
  <title>dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<body class="min-h-screen text-gray-100">
  <!-- center div in the middle of the page -->
  <div class="mx-auto max-w-screen-lg px-3 py-6">
    <!-- header -->
    <div id="header" class="mb-3">
      <h1 class="mb-6 text-3xl font-semibold text-white">
        <span class="text-emerald-300">λ</span> dromzeh.dev
      </h1>
      <div class="mb-6 font-normal">
        <p class="text-white">
          hi, i'm Marcel. i'm {age} years old, software and reverse engineer.
        </p>
        <p class=" text-white">
          i work with svelte, c#, python, javascript, typescript & ida. i also
          made <a
            class="text-white underline hover:text-emerald-300"
            href="https://wanderer.moe">wanderer.moe</a
          > ( genshin impact asset database )
        </p>
      </div>
      <div class="mb-6 font-normal">
        <p class="text-white">
          for me, it is currently {myTime}
          <span class="text-gray-500">// Europe/London time</span>
        </p>
        <a
          class="text-white underline hover:text-emerald-300"
          href="https://github.com/dromzeh">github</a
        >
        |
        <a
          class="text-white underline hover:text-emerald-300"
          href="https://discord.com/users/492731761680187403">discord</a
        >
        |
        <a
          class="text-white underline hover:text-emerald-300"
          href="mailto:marcel@dromzeh.dev">marcel@dromzeh.dev</a
        >
        |
        <a
          class="text-white underline hover:text-emerald-300"
          href="https://tech.lgbt/@marcel">@marcel@tech.lgbt</a
        >
      </div>
    </div>
    <!-- end of header -->

    <!-- info grid -->
    <div id="infoGrid" class="mb-3">
      <InfoGrid />
    </div>
    <!-- end of info grid -->

    <!-- projects grid -->
    <div id="projectsGrid" class="mb-3">
      <h1 class="mb-6 text-3xl font-semibold text-white">projects</h1>
      {#each allProjects as project}
        {#if project.active === true}
          <p class="mb-6 font-normal text-gray-400">
            <a
              class="text-white underline hover:text-emerald-300"
              href="{project.url}">{project.name}</a
            >
            <span class="text-sm italic text-gray-500"
              >// {project.description}</span
            >
          </p>
        {/if}
      {/each}
    </div>
    <!-- end of projects grid -->

    <!-- favourite albums -->
    <div id="favouriteAlbums" class="mb-3">
      <h1 class="mb-6 text-3xl font-semibold text-white">favourite albums</h1>
      <div class="flex flex-row flex-wrap justify-center gap-3">
        {#each allAlbums as album}
          <a href="{album.url}" target="_blank" rel="noreferrer">
            <img
              class="h-24 w-24 rounded-md border-2 border-gray-600/10"
              src="./images/albums/{album.path}.png"
              alt="{album.album}"
            />
          </a>
        {/each}
      </div>
    </div>
    <!-- end of favourite albums -->
  </div></body
>
