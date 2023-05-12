<style lang="postcss">
.highlight {
  @apply text-white;
}
</style>

<script>
import dayjs from "dayjs";
import moment from "moment-timezone";
import Lanyard from "../components/Lanyard.svelte";
import { onMount } from "svelte";
import StarHover from "../components/StarHover.svelte";
import Tooltip from "../components/Tooltip.svelte";

export let data;

let allProjects = data.projects.projects;
let allAlbums = data.albums.albums;

let age = "16"; // also incase getAge function fails for some reason..
let myTime = moment().tz("Europe/London").format("HH:mm:ss");

// console.log(allProjects.filter((project) => project.active === true));

setInterval(() => {
  let time = dayjs().diff(dayjs(1156118401000), "year", true);
  age = time.toString().substring(0, 13);
  myTime = moment().tz("Europe/London").format("HH:mm:ss");
}, 50);

let titleText = "dromzeh.dev";

// wait 2 seconds before changing title text
onMount(() => {
  setTimeout(() => {
    let titles = ["root@dromzeh-dev:~ $ █", "root@dromzeh-dev:~ $ "];
    // fluctuate title text between titles array
    titleText = titles[0];
    let titleIndex = 0;
    setInterval(() => {
      titleIndex = titleIndex === 0 ? 1 : 0;
      titleText = titles[titleIndex];
    }, 500);
  }, 500);
});
</script>

<svelte:head>
  <title>{titleText}</title>
  <meta name="description" content="get real" />
</svelte:head>

<body class="min-h-screen">
  <div>
    <main class="mx-6 flex flex-col items-center text-neutral-100">
      <section class="flex w-full max-w-3xl pb-12 pt-24 sm:pt-4">
        <section class="space-y-12">
          <div class="space-y-2 sm:space-y-3">
            <h1 class="text-3xl font-bold tracking-wide sm:text-3xl">
              dromzeh.dev
            </h1>
            <div>
              <div class="font-light text-neutral-100/80">
                Hi - I'm Marcel, a
                <div class="group inline-flex items-center justify-center">
                  <span
                    class="cursor-pointer font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
                  >
                    {age.substring(0, 7)}
                  </span>
                  <Tooltip tooltipText="{age}" />
                </div>
                year old Software & Reverse Engineer. I work with Svelte, C#, Javascript,
                Python & IDA. Most of my time currently goes towards
                <div class="group inline-flex items-center justify-center">
                  <a
                    href="https://wanderer.moe/?ref=dromzeh.dev"
                    rel="noreferrer"
                    target="_blank"
                    class="font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
                    >wanderer.moe</a
                  >.
                  <Tooltip
                    tooltipText="Pretty cool website to get game assets from."
                  />
                </div>
                I also contribute to and create many Open Source Projects - the source
                code to this website is
                <div class="group inline-flex items-center justify-center">
                  <a
                    href="https://github.com/dromzeh/dromzeh.dev"
                    rel="noreferrer"
                    target="_blank"
                    class="font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
                    >Open Source</a
                  >.
                  <StarHover repository="dromzeh/dromzeh.dev" />
                </div>
              </div>
            </div>
          </div>
          <Lanyard />
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold tracking-wide sm:text-[1.67rem]">
              Projects
            </h2>
            <div class="font-light text-neutral-100/80">
              This is a list of my current
              <div
                class="group inline-flex cursor-pointer items-center justify-center font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
              >
                active projects
                <Tooltip
                  tooltipText="Projects that I often update / maintain."
                />
              </div>
              - all of my projects can be viewed on my
              <a
                href="/projects"
                rel="noreferrer"
                class="font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
                >/projects</a
              > page.
            </div>
            <div class="grid grid-cols-1 gap-1.5 pt-2">
              {#each allProjects as project}
                {#if project.active === true}
                  <a href="{project.url}" target="_blank">
                    <div
                      class="flex h-full w-full flex-col rounded-lg border-[0.5px] border-white/20 bg-white/5 text-neutral-100/90 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/40 hover:bg-white hover:bg-opacity-[6.9%] hover:text-neutral-100"
                    >
                      <div
                        class="group flex w-full select-none items-center justify-between px-4 py-3"
                      >
                        <div class="font-medium">
                          {#if project.isopenSource}
                            <i
                              class="fab fa-github text-[1.1rem] text-neutral-100/80 group-hover:text-neutral-100/90"
                            ></i>
                          {:else}
                            <i
                              class="fas fa-link text-[1.1rem] text-neutral-100/80 group-hover:text-neutral-100/90"
                            ></i>
                          {/if}
                          {project.name}
                        </div>
                      </div>
                      <div
                        class="mb-3 flex h-full flex-col justify-between px-3.5"
                      >
                        <div class="text-sm font-light">
                          {project.description}
                        </div>
                        <div class="mt-2 flex flex-row gap-1">
                          {#if project.isopenSource}
                            <span
                              class="mb-2 rounded-full bg-gray-300/10 px-3 py-1.5 text-xs text-gray-300 ring-1 ring-inset ring-gray-400/20"
                              >Open Source</span
                            >
                          {/if}
                          {#each project.tags as tag}
                            <span
                              class="mb-2 rounded-full bg-indigo-300/10 px-3 py-1.5 text-xs text-indigo-300 ring-1 ring-inset ring-indigo-400/20"
                              >{tag}</span
                            >
                          {/each}
                        </div>
                      </div>
                    </div>
                  </a>
                {/if}
              {/each}
            </div>
          </div>
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold tracking-wide sm:text-[1.67rem]">
              Contact
            </h2>
            <div class="font-light text-neutral-100/80">
              I aim to respond to all messages, no matter the contact method
              within <div
                class="group inline-flex items-center justify-center font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
              >
                24 hours
                <Tooltip tooltipText="Most active from 10AM until 1AM" />
              </div>
            </div>
            <div class="text-sm font-light text-neutral-100/80">
              It is currently
              <div
                class="group inline-flex items-center justify-center font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline cursor-pointer"
              >
                {myTime}
                <Tooltip tooltipText="Europe/London" />
              </div>
              for me.
            </div>
            <div class="grid grid-cols-1 gap-1.5 pt-2">
              <a href="mailto:marcel@dromzeh.dev" target="_blank">
                <div
                  class="flex h-full w-full flex-col rounded-lg border-[0.5px] border-white/20 bg-white/5 text-neutral-100/90 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/40 hover:bg-white hover:bg-opacity-[6.9%] hover:text-neutral-100"
                >
                  <div
                    class="group flex w-full select-none items-center justify-between px-4 py-3"
                  >
                    <div class="font-medium">
                      <i
                        class="fas fa-envelope text-[1.1rem] text-neutral-100/80 group-hover:text-neutral-100/90"
                      ></i>
                      Email (marcel@dromzeh.dev)
                    </div>
                  </div>
                  <div class="mb-3 flex h-full flex-col justify-between px-3.5">
                    <div class="text-sm font-light">
                      Preferred for more formal enquiries, but not required.
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="https://discord.com/users/492731761680187403"
                target="_blank"
              >
                <div
                  class="flex h-full w-full flex-col rounded-lg border-[0.5px] border-white/20 bg-white/5 text-neutral-100/90 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/40 hover:bg-white hover:bg-opacity-[6.9%] hover:text-neutral-100"
                >
                  <div
                    class="group flex w-full select-none items-center justify-between px-4 py-3"
                  >
                    <div class="font-medium">
                      <i
                        class="fab fa-discord text-[1.1rem] text-neutral-100/80 group-hover:text-neutral-100/90"
                      ></i>
                      Discord (dromzeh#1337)
                    </div>
                  </div>
                  <div class="mb-3 flex h-full flex-col justify-between px-3.5">
                    <div class="text-sm font-light">
                      I am mostly active on Discord, preferred for more informal
                      enquiries and for quicker responses.
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</body>
