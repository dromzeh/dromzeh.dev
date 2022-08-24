<script context = "module">
import data from '../data/projects.json'; // self explanatory
</script>

<script>
let projects = data.projects; // to save from typing data.projects every time...
</script>

<svelte:head>
<title>dromzeh.dev</title>
<meta name="description" content="get real" />
</svelte:head>

<div id="main" class = "mt-24 flex flex-col justify-center antialiased">
  <div class = "move-area mx-auto -mt-24 flex min-h-screen flex-1 flex-col duration-300 motion-reduce:transition-none md:w-[90%] xl:w-4/5">
  <div class = "md:grid-cols-0 grid px-8 lg:grid-cols-5">
    <div class = "md:col-span-3">

    <!-- main text -->
    <h4 class = "text-2xl font-semibold text-white ">hi 👋!</h4>
    <div class = "py-2">
    <p class = "text-white text-l"> i'm a full stack developer & the developer of <a href = "https://wanderer.moe" class = "hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-1 rounded-md font-bold text-sky-200">wanderer.moe</a>. <br> (the genshin site you're probably looking for, previously wtf.dromzeh.dev)</p>
    </div>
    <br>
  
    <h4 class = "text-2xl font-semibold text-white">contact info</h4>

    <!-- contact information with href links that redirect to urls, mailto: etc.. -->
    <div class="py-2 grid grid-cols-1 gap-2">
    <p class = "text-white"><a href = "https://github.com/dromzeh" class = "px-4 hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-1 rounded-md font-bold text-sky-200"><i class="fab fa-github"></i>  @dromzeh</a></p>
    <p class = "text-white"><a href = "https://discord.com/users/492731761680187403" class = "px-4 hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-1 rounded-md font-bold text-sky-200"><i class="fab fa-discord"></i>  dromzeh#1337</a></p>
    <p class = "text-white"><a href = "https://twitter.com/dromzeh" class = "px-4 hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-1 rounded-md font-bold text-sky-200"><i class="fab fa-twitter"></i>  @dromzeh</a></p>
    <p class = "text-white"><a href = "mailto:dromzeh@protonmail.com" class = "px-4 hover:bg-opacity-25 bg-sky-300 text-center bg-opacity-5 p-1 rounded-md font-bold text-sky-200"><i class="fas fa-envelope"></i>  dromzeh@protonmail.com</a></p>
    </div>
    <br> 
    
    <!-- programming languages & tools section -->
    <h4 class = "text-2xl font-semibold text-white ">programming languages & tools</h4>
    <div class = "py-2">

    <!-- displays all languages and tools with a slight indent -->
    <p class = "text-white indent-2">  • javascript</p>
    <p class = "text-white indent-2">  • svelte (+sapper & sveltekit)</p>
    <p class = "text-white indent-2">  • python (+flask & discord.py)</p>
    <p class = "text-white indent-2">  • node.js</p>
    <p class = "text-white indent-2">  • c# </p>
    <p class = "text-white indent-2">  • html</p>
    <p class = "text-white indent-2">  • css (+tailwind)</p>
    </div>
    <br>
    <br>

  </div>


  <!-- projects section -->
  <div class = "motion-reduce:transition-none lg:col-span-2 lg:mt-0 lg:mb-0">
  <h4 class="text-2xl font-semibold text-white ">projects</h4>
  <div class = "py-2">
  <div class="grid grid-cols-1 gap-4"> <!-- 1 column with each container having a gap of 4, else the containers will be too close to eachother -->

  <!-- scans through each project in projects.json and displays info such as name, description, uses etc -->
  {#each projects as project}
  <div class="container mx-auto">
    <a href="{project.url}">
    <div class="bg-stone-800 projectContainer transition duration-150 ease-in-out rounded p-4 shadow md:flex justify-between hover:scale-105">
      <div>
        <h4 class="text-2xl font-semibold text-white">{project.name}</h4>
        <p class="my-2 text-sm text-white indent-2">{project.description}</p>
        <div class="flex items-center mt-4 gap-2">
          {#each project.uses as uses} <!-- as project.uses is often a list of more than one item.. -->
          <div class="hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-2 rounded-md font-bold uppercase text-xs text-sky-200">
            {uses}
          </div>

          <!-- displays 'open source' next to a project if isopensource is true inside projects.json -->
          {/each}
          {#if project.isopenSource == true}
          <div class="hover:bg-opacity-25 bg-indigo-300 bg-opacity-5 p-2 rounded-md font-bold uppercase text-xs text-indigo-200">
            <i class="fa-brands fa-github"></i> open source
          </div>
          {/if}

        </div>
      </div>
    </div>
  </a>
  </div>
  {/each}

    </div>
    </div>
    </div>
  </div>
  </div>
</div>