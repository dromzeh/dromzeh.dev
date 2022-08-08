<script context = "module">
import data from '../data/projects.json';
</script>

<script>
let projects = data.projects;
</script>

<svelte:head>
<title>dromzeh.dev</title>
</svelte:head>

<div id="main" class = "mt-24 flex flex-col justify-center antialiased">
  <div class = "move-area mx-auto -mt-24 flex min-h-screen flex-1 flex-col duration-300 motion-reduce:transition-none md:w-[90%] xl:w-4/5">
  <div class = "md:grid-cols-0 grid px-8 lg:grid-cols-5">
    <div class = "md:col-span-3">
    <h4 class = "text-2xl font-semibold text-white underline decoration-gray-500 hover:decoration-sky-200 decoration-4">hi 👋!</h4>
    <div class = "py-2">
      <p class = "text-white text-l"> i'm a full stack developer & i'm also the creator and sole developer of <a href = "https://wanderer.moe" class = "hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-1 rounded-md font-bold text-sky-200">wanderer.moe</a>. <br> (the genshin site you're probably looking for)</p>
    </div>
    <br>
  
    <h4 class = "text-2xl font-semibold text-white underline decoration-gray-500 hover:decoration-sky-200 decoration-4">contact info</h4>

    <div class="py-2 grid grid-cols-1 gap-2">
    <p class = "text-white"><a href = "https://github.com/dromzeh" class = "px-4 hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-1 rounded-md font-bold text-sky-200"><i class="fab fa-github"></i>  @dromzeh</a></p>
    <p class = "text-white"><a href = "https://discord.com/users/492731761680187403" class = "px-4 hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-1 rounded-md font-bold text-sky-200"><i class="fab fa-discord"></i>  dromzeh#1337</a></p>
    <p class = "text-white"><a href = "https://twitter.com/dromzeh" class = "px-4 hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-1 rounded-md font-bold text-sky-200"><i class="fab fa-twitter"></i>  @dromzeh</a></p>
    <p class = "text-white"><a href = "mailto:dromzeh@protonmail.com" class = "px-4 hover:bg-opacity-25 bg-sky-300 text-center bg-opacity-5 p-1 rounded-md font-bold text-sky-200"><i class="fas fa-envelope"></i>  dromzeh@protonmail.com</a></p>
    </div>

    <br>
    
    <h4 class = "text-2xl font-semibold text-white underline decoration-gray-500 hover:decoration-sky-200 decoration-4">programming languages, etc</h4>
    
    <div class = "py-2">
    <p class = "text-white indent-2">  • javascript</p>
    <p class = "text-gray-400 indent-4 text-sm">  - mainly used javascript for writing scripts for websites</p>
    <p class = "text-white indent-2">  • svelte (+sapper & sveltekit)</p>
    <p class = "text-gray-400 indent-4 text-sm">  - sveltekit + svelte is what is used in my current project, wanderer.moe & this site</p>
    <p class = "text-white indent-2">  • python (+flask & discord.py)</p>
    <p class = "text-gray-400 indent-4 text-sm">  - created multiple discord bots using discord.py, backends to websites with flask, etc</p>
    <p class = "text-white indent-2">  • node.js</p>
    <p class = "text-gray-400 indent-4 text-sm">  - self-explanatory</p>
    <p class = "text-white indent-2">  • c# </p>
    <p class = "text-gray-400 indent-4 text-sm">  - made some winforms programs, as well as some console scripts & a interactive console game</p>
    <p class = "text-white indent-2">  • html</p>
    <p class = "text-gray-400 indent-4 text-sm">  - self-explanatory, used for website stuff, etc.</p>
    <p class = "text-white indent-2">  • css (+tailwind)</p>
    <p class = "text-gray-400 indent-4 text-sm">  - self-explantory, mainly have used tailwind to create the frontend for many sites, such as this one</p>
    </div>
    <br>

  </div>
  
  <div class = "motion-reduce:transition-none lg:col-span-2 lg:mt-0 lg:mb-0">
  <h4 class="text-2xl font-semibold text-white underline decoration-gray-500 hover:decoration-sky-200 decoration-4">some projects i've created</h4>
  <div class = "py-2">
  <div class="grid grid-cols-1 gap-4">
  {#each projects as project}
  <div class="container mx-auto">
    <a href="{project.url}">
    <div class="bg-stone-800 projectContainer transition duration-150 ease-in-out rounded p-4 shadow md:flex justify-between hover:scale-105">
      <div>
        <h4 class="text-2xl font-semibold text-white">{project.name}</h4>
        <p class="my-2 text-sm text-white indent-2">{project.description}</p>
        <div class="flex items-center mt-4 gap-2">
          {#each project.uses as uses}
          <div class="hover:bg-opacity-25 bg-sky-300 bg-opacity-5 p-2 rounded-md font-bold uppercase text-sm text-sky-200">
            {uses}
          </div>
          {/each}
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