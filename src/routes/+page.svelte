<script context = "module">
  import data from "../data/projects.json";
  import languageData from "../data/languages.json";
  import VanillaTilt from "vanilla-tilt";
</script>

<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import dayjs from "dayjs";
  import Icon from "@iconify/svelte";

  let age = "16";
  let discordData = "";
  let statusColor = "";
  let projects = data.projects;
  let languages = languageData.languages;

  async function getAge() {
    setInterval(() => {
      let time = dayjs().diff(dayjs(1156118401000), "year", true);
      age = time.toString().substring(0, 6);
    }, 50);
  }

  async function getDiscordData() {
    try {
      // takes request to api.lanyard.rest to get my current discord status
      let response = await axios
        .get("https://api.lanyard.rest/v1/users/492731761680187403")
        .then(function (response) {
          console.log(response.data);
          discordData = response.data.data;
          const statusColors = {
            online: "#34D399",
            idle: "#FACC15",
            dnd: "#F87171",
            offline: "#9CA3AF",
          };
          statusColor = statusColors[discordData.discord_status];
        });
    } catch (e) {
      console.log("Error fetching data");
    }
    setTimeout(getDiscordData, 25000); // refreshes every 25 seconds
  }

  async function makeRequest(url) {
    try {
      let response = await axios.get(url);
      if (response.status == 200) {
        return "website is up (code 200)";
      } else {
        return "website is down";
      }
    } catch (e) {
      return "website is down";
    }
  }

  onMount(() => {
    getDiscordData();
    getAge();
  });
</script>

<svelte:head>
  <title>index — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<div id="main" class="flex items-center justify-center">
  <div class="lg:p-20 md:p-10 p-3">
    <!-- main text -->
    <h4 class="text-2xl font-semibold">
      <span class="gradientText">hi</span> 👋<span class="gradientText">!</span>
    </h4>
    <div class="">
      <p class="text-white text-l">
        i'm marcel (aka 'dromzeh') — a {age} year old
        <span class="gradientText">full-stack</span>
        developer with my current focus being more on website development & reverse
        engineering.<br /> & i occasionally work on
        <a
          href="https://wanderer.moe"
          class="hover:bg-opacity-25 bg-indigo-400 bg-opacity-5 p-1 rounded-md font-bold text-indigo-300"
          >wanderer.moe</a
        ><span class="text-xs">(previously wtf.dromzeh.dev)</span> — built with sveltekit
        & tailwind
      </p>

      <div>
        {#if discordData.discord_status != undefined}
          <p class="text-gray-400 text-sm">
            <span style="color: {statusColor}"
              ><i class="animate-pulse fa-solid fa-circle" />
            </span>currently {#if discordData.discord_status != "offline"}<span
                class="text-white font-semibold">online</span
              >
              <span class="text-xs">({discordData.discord_status})</span
              >{:else}<span class="text-white font-semibold">offline</span>{/if}
            on discord
          </p>
          {#if discordData.listening_to_spotify == true}
            <p class="text-gray-400 text-sm">
              <i class="text-green-200 animate-pulse fab fa-spotify" />
              listening to
              <span class="text-white font-semibold"
                >{discordData.spotify.song}</span
              >
              by
              <span class="text-white font-semibold"
                >{discordData.spotify.artist}</span
              >
            </p>
          {/if}
        {/if}
      </div>
    </div>
    <br />

    <!-- contact information with href links that redirect to urls, mailto: etc.. -->
    <div class="">
      <h4 class="text-2xl font-semibold gradientText">contact me:</h4>
      <div class="flex gap-2">
        <p class="text-white">
          <a href="https://github.com/dromzeh"
            ><Icon
              icon="codicon:github-alt"
              class="text-2xl text-gray-200 hover:text-white"
            /></a
          >
        </p>
        <p class="text-white">
          <a href="https://discord.com/users/492731761680187403"
            ><Icon
              icon="radix-icons:discord-logo"
              class="text-2xl text-gray-200 hover:text-white "
            /></a
          >
        </p>
        <p class="text-white">
          <a href="https://twitter.com/dromzeh"
            ><Icon
              icon="iconoir:twitter"
              class="text-2xl text-gray-200 hover:text-white "
            /></a
          >
        </p>
        <p class="text-white">
          <a href="https://tiktok.com/@dromzeh"
            ><Icon
              icon="ph:tiktok-logo"
              class="text-2xl text-gray-200 hover:text-white "
            /></a
          >
        </p>
        <p class="text-white">
          <a href="mailto:marcel@dromzeh.dev"
            ><Icon
              icon="eva:email-outline"
              class="text-2xl text-gray-200 hover:text-white"
            /></a
          >
        </p>
      </div>
    </div>
    <br />

    <!-- programming languages & tools section -->
    <h4 class="text-2xl font-semibold gradientText">technologies i use:</h4>
    <div class="">
      <div class="flex gap-2">
        {#each languages as language}
          <p class="text-white">
            <Icon
              icon={language.iconName}
              class="text-2xl cursor-pointer text-gray-200 hover:text-white"
            />
          </p>
        {/each}
      </div>
    </div>
    <br />

    <!-- project section -->
    <h4 class="text-2xl font-semibold gradientText ">projects</h4>
    <div class="">
      <div class="grid grid-cols-1 gap-4">
        <!-- 1 column with each container having a gap of 4, else the containers will be too close to eachother -->

        <!-- scans through each project in projects.json and displays info such as name, description, uses etc -->
        {#each projects as project}
          <div data-tilt data-tilt-max="5" data-tilt-speed="100">
            <div class="relative p-1">
              <a href={project.url}>
                <div
                  class="bg-gradient-to-r p-[2px] from-violet-400 via-sky-400 to-indigo-400 transition duration-150 ease-in-out rounded md:hover:scale-105 "
                >
                  <div class="bg-[#070707] projectContainer p-4 ">
                    <div>
                      <h4 class="text-2xl font-semibold text-white">
                        {project.name}
                      </h4>
                      <p class="my-2 text-sm text-white indent-2">
                        {project.description.toLowerCase()}
                      </p>
                      <div class="flex items-center mt-4 gap-2">
                        {#each project.uses as uses}
                          <!-- as project.uses is often a list of more than one item.. -->
                          <div
                            class="hover:bg-opacity-25 bg-indigo-400 bg-opacity-5 p-2 rounded-md font-bold uppercase text-xs text-indigo-300"
                          >
                            {uses}
                          </div>

                          <!-- displays 'open source' next to a project if isopensource is true inside projects.json -->
                        {/each}
                        {#if project.isopenSource == true}
                          <div
                            class="hover:bg-opacity-25 bg-indigo-400 bg-opacity-5 p-2 rounded-md font-bold uppercase text-xs text-indigo-400"
                          >
                            <i class="fa-brands fa-github" /> open source
                          </div>
                        {/if}
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
