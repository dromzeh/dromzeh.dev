<script>
  import VanillaTilt from "vanilla-tilt";
  import dayjs from "dayjs";
  import InfoGrid from "../components/InfoGrid.svelte";

  export let data;

  let allProjects = data.projects.projects; // :3
  let age = "16"; // also incase getAge function fails for some reason..

  setInterval(() => {
    let time = dayjs().diff(dayjs(1156118401000), "year", true);
    age = time.toString().substring(0, 12);
  }, 50);

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
          hi 👋 i'm <span class="highlight">Marcel,</span>
        </h1>
        <p class="text-xl text-m mt-3 break-words">
          Also known as dromzeh, I'm a <span class="highlight">{age}</span>
          year old developer from the UK. I currently focus more on
          <span class="highlight">front-end</span>
          website development. I'm also the developer of
          <a
            href="https://wanderer.moe"
            target="_blank"
            rel="noreferrer"
            class="highlight hover:underline">wanderer.moe</a
          >, a Genshin Impact Assets website.
        </p>
      </div>
    </div>

    <br />

    <InfoGrid />

      <div id="projects" class="mb-6">
        <div class="flex flex-col align-center my-auto items-center">
          <a href="#projects" class="mb-6">
            <span class="monofont text-white text-4xl font-semibold"
              >projects —</span
            >
          </a>
        </div>
        <div class="grid gap-3 mb-6">
          {#each allProjects as project}
            <div
              class="flex flex-col backdrop-blur-lg rounded-lg shadow-md border-[#121212] hover:border-gray-600/50 border-2 "
            >
              <div class="flex flex-col justify-between p-4 leading-normal">
                <h5
                  class="text-2xl font-bold tracking-tight text-white monofont"
                >
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
        <div id="programmingSkills" class="mb-6">
          <div class="flex flex-col align-center my-auto items-center">
            <a href="#programmingSkills" class="mb-6">
              <span class="monofont text-white text-4xl font-semibold"
                >skills —</span
              >
            </a>
          </div>
      
          <div class = "mb-6">
            <p class="text-gray-400">
              <span class="highlight">figma</span> for UI design.
            </p>
            <p class="text-gray-400">
              <span class="highlight">tailwindcss</span> for styling.
            </p>
            <p class="text-gray-400">
              <span class="highlight">svelte</span> for frontend.
            </p>
            <p class="text-gray-400">
              <span class="highlight">nodejs</span> for backend.
            </p>
            <p class="text-gray-400">
              <span class="highlight">mongodb</span> for database.
            </p>
            <p class="text-gray-400">
              <span class="highlight">express</span> for routing.
            </p>
            <p class="text-gray-400">
              <span class="highlight">sveltekit</span> for static site generation.
            </p>
            <p class="text-gray-400">
              <span class="highlight">bash</span> for scripting.
            </p>
            <p class="text-gray-400">
              <span class="highlight">git</span> for version control.
            </p>
            <p class="text-gray-400">
              <span class="highlight">arch linux</span> for development.
            </p>
            <p class="text-gray-400">
              <span class="highlight">python</span> for automation.
            </p>
            <p class="text-gray-400">
              <span class="highlight">C#</span> for winforms and unity game development.
            </p>
            <p class="text-gray-400">
              <span class="highlight">cloudflare pages</span> for hosting.
            </p>
            <p class="text-gray-400">
              <span class="highlight">digitalocean, oracle</span> for hosting.
            </p>
            <p class="text-gray-400">
              <span class="highlight">vscode</span> for code editing.
            </p>
          </div>
          </div>
          <!-- end of skills grid-->
      </div>
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
