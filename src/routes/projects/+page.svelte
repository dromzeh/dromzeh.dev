<script>
import Icon from "@iconify/svelte";
import VanillaTilt from "vanilla-tilt";
import { onMount } from "svelte";

export let data;
let allProjects = data.projects.projects; // :3

let titleText = "projects - dromzeh.dev";

// wait 2 seconds before changing title text
onMount(() => {
  setTimeout(() => {
    let titles = ["$ cat projects.txt █", "$ cat projects.txt"];
    // fluctuate title text between titles array
    titleText = titles[0];
    let titleIndex = 0;
    setInterval(() => {
      titleIndex = titleIndex === 0 ? 1 : 0;
      titleText = titles[titleIndex];
    }, 500);
  }, 500);
});

let filteredProjects = data.projects.projects;
let query = "";

function handleInput(event) {
  query = event.target.value;
  updateFilter();
}

function updateFilter() {
  // remove whitespace at the start of the query
  query = query.trimStart();
  const keywords = query.split(" "); // split the query string into an array of keywords
  filteredProjects = allProjects.filter((project) => {
    return keywords.every((keyword) => {
      // check if every keyword matches any property of the project
      return (
        project.name.toLowerCase().includes(keyword.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(keyword.toLowerCase())
        ) ||
        project.description.toLowerCase().includes(keyword.toLowerCase()) ||
        (keyword === "oss" && project.isopenSource) // if keyword is 'oss' and project is open source :3
      );
    });
  });
}
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
            <div class="space-y-2">
              <h2
                class="text-3xl font-semibold tracking-wide sm:text-[1.67rem]">
                Projects
              </h2>
            </div>
            <div
              class="h-full w-full rounded-lg border-[0.5px] border-white/20 bg-white/5 text-neutral-100/90 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/40 hover:bg-white hover:bg-opacity-[6.9%] hover:text-neutral-100">
              <input
                class="h-14 w-full rounded-lg bg-[#121212] text-center text-indigo-300 focus:shadow focus:outline-none"
                placeholder="Search by name, tags or description"
                on:input="{handleInput}"
                bind:value="{query}" />
            </div>
            <div class="grid grid-cols-1 gap-1.5 pt-2">
              {#each filteredProjects as project}
                <a href="{project.url}" target="_blank">
                  <div
                    class="flex h-full w-full flex-col rounded-lg border-[0.5px] border-white/20 bg-white/5 text-neutral-100/90 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/40 hover:bg-white hover:bg-opacity-[6.9%] hover:text-neutral-100">
                    <div
                      class="group flex w-full select-none items-center justify-between px-4 py-3">
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
                      class="mb-3 flex h-full flex-col justify-between px-3.5">
                      <div class="text-sm font-light">
                        {project.description}
                      </div>
                      <div class="mt-2 flex flex-row gap-1">
                        {#if project.isopenSource}
                          <!-- svelte-ignore a11y-click-events-have-key-events -->
                          <span
                            class="mb-2 rounded-full bg-gray-300/10 px-3 py-1.5 text-xs text-gray-300 ring-1 ring-inset ring-gray-400/20"
                            on:click="{() => {
                              event.preventDefault();
                              if (query.includes('oss')) {
                                query = query.replace('oss', '');
                              } else {
                                query = query + ' oss';
                              }
                              updateFilter();
                            }}">Open Source</span>
                        {/if}
                        {#each project.tags as tag}
                          <!-- svelte-ignore a11y-click-events-have-key-events -->
                          <span
                            on:click="{() => {
                              event.preventDefault();
                              if (query.includes(tag)) {
                                query = query.replace(tag, '');
                              } else {
                                query = query + ' ' + tag;
                              }
                              updateFilter();
                            }}"
                            class="mb-2 rounded-full bg-indigo-300/10 px-3 py-1.5 text-xs text-indigo-300 ring-1 ring-inset ring-indigo-400/20 backdrop-blur-lg"
                            >{tag}</span>
                        {/each}
                      </div>
                    </div>
                  </div>
                </a>
              {:else}
                <h2
                  class="text-2xl text-center font-semibold tracking-wide sm:text-[1.67rem]">
                  No projects matching your query by tag, title or description
                  were found.
                </h2>
              {/each}
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</body>
