<script context = "module"false>
import data from '../data/projects.json';
import languageData from '../data/languages.json';
</script>

<script>
import { onMount } from "svelte";
import axios from 'axios';
import dayjs from 'dayjs';

let age = '16';
let discordData = '';
let statusColor = '';
let wanderermoeStatus = 'sending request..';
let onlineUsers = '?';
let memberCount = '?';
let projects = data.projects;
let languages = languageData.languages;


async function getAge(){
  setInterval(() => {
	let time = dayjs().diff(dayjs(1156136400000), 'year', true);
	  age = time.toString().substring(0, 8);
}, 50);
}

async function getDiscordData() {
	try {
	// takes request to api.lanyard.rest to get my current discord status
  let response = await axios.get('https://api.lanyard.rest/v1/users/492731761680187403')
	.then(function (response) {
		console.log(response.data);
    discordData = response.data.data;
    const statusColors = {
      online: '#34D399',
      idle: '#FACC15',
      dnd: '#F87171',
      offline: '#9CA3AF'
    }
    statusColor = statusColors[discordData.discord_status];
	})
  } catch (e) {
    console.log('Error fetching data')
  }
  setTimeout(getDiscordData, 25000) // refreshes every 25 seconds
}


async function getDiscordUsers() {
  try {
    let response = await axios.get('https://discord.com/api/v9/invites/659KAFfNd6?with_counts=true&with_expiration=true')
    .then(function (response) {
      memberCount = response.data.approximate_member_count
      onlineUsers = response.data.approximate_presence_count
    })
  } catch (e){
    memberCount = '?';
    onlineUsers = '?';
  }
}


async function makeRequest(url){
  try {
    let response = await axios.get(url)
    if(response.status == 200){
      return 'website is up 👍';
    }
    else{
      return 'website is down';
    }
  } catch (e) {
    return 'website is down';
  }
}

onMount(() => {
    getDiscordData();
    makeRequest('https://wanderer.moe/').then(function(response){
      wanderermoeStatus = response;
    });
    getDiscordUsers();
    getAge();
});



</script>

<svelte:head>
<title>dromzeh.dev</title>
<meta name="description" content="get real" />
</svelte:head>

<div id="main" class = "flex items-center justify-center">
  <div class = "lg:p-20 md:p-10 p-3">

    <!-- main text -->
    <h4 class = "text-2xl font-semibold text-white">hi 👋!</h4>
    <div class = "">
    <p class = "text-white text-l"> i'm a {age} year old full-stack developer with my current focus being more on front-end web development. i'm also the creator of developer of<a href = "https://wanderer.moe" class = "hover:bg-opacity-25 bg-indigo-300 bg-opacity-5 p-1 rounded-md font-bold text-indigo-200">wanderer.moe</a>, which is probably the genshin website you're looking for. (previously wtf.dromzeh.dev)</p>
    
    <div>
    {#if discordData.discord_status != undefined}
      <p class = "text-gray-400 text-sm"><span style = "color: {statusColor}"><i class="animate-pulse fa-solid fa-circle"></i> </span>currently {#if discordData.discord_status != "offline"}<span class = "text-white font-semibold">online</span> <span class = "text-xs">({discordData.discord_status})</span>{:else}<span class = "text-white font-semibold">offline</span>{/if} on discord</p>
      {#if discordData.listening_to_spotify == true}
        <p class = "text-gray-400 text-sm"><i class = "text-green-200 animate-pulse fab fa-spotify"></i> listening to <span class = "text-white font-semibold">{discordData.spotify.song}</span> by <span class = "text-white font-semibold">{discordData.spotify.artist}</span></p>
      {/if}
    {/if}
    </div>
    </div>
    <br>
  
    <!-- contact information with href links that redirect to urls, mailto: etc.. -->
    <h4 class = "text-2xl font-semibold text-white">contact links</h4>
    <div class="">
      <p class = "text-white text-sm">i am a lot more likely to respond faster on discord and via e-mail.</p>
      <div class = "flex gap-2">
      <p class = "text-white"><a href = "https://github.com/dromzeh"><i class="fab fa-github text-xl text-white hover:text-indigo-200" ></i></a></p>
      <p class = "text-white"><a href = "https://discord.com/users/492731761680187403"><i class="fab fa-discord text-xl text-white hover:text-indigo-200" ></i></a></p>
      <p class = "text-white"><a href = "https://twitter.com/dromzeh"><i class="fab fa-twitter text-xl text-white hover:text-indigo-200" ></i></a></p>
      <p class = "text-white"><a href = "https://tiktok.com/@dromzeh"><i class="fab fa-tiktok text-xl text-white hover:text-indigo-200" ></i></a></p>
      <p class = "text-white"><a href = "mailto:marcel@dromzeh.dev"><i class="fas fa-envelope text-xl text-white hover:text-indigo-200" ></i></a></p>
  </div>
    </div>
    <br> 
    
    <!-- programming languages & tools section -->
    <h4 class = "text-2xl font-semibold text-white ">technologies i use</h4>
    <div class = "">
    <div class = "flex gap-2">
    {#each languages as language}
      <p class = "text-white"> <i class="devicon-{language.iconName}-plain text-xl cursor-pointer text-white hover:text-indigo-200" ></i></p>
    {/each}
    </div>
    </div>
    <br>

    <!-- status section -->
    <h4 class = "text-2xl font-semibold text-white ">statuses</h4>
    <div class = "">
        <p class = "text-white">my discord status: <span class = "font-normal text-gray-400"> {discordData.discord_status} </span></p>
        <p class = "text-white">wanderer.moe: <span class = "font-normal text-gray-400"> {wanderermoeStatus} </span></p>
        <p class = "text-white">discord server: <span class = "font-normal text-gray-400"> {memberCount} users ({onlineUsers} online) </span></p>
    </div>
    <br>

    <!-- project section -->
    <h4 class = "text-2xl font-semibold text-white ">projects</h4>
    <div class = "">
    <div class="grid grid-cols-1 gap-4"> <!-- 1 column with each container having a gap of 4, else the containers will be too close to eachother -->
      
      <!-- scans through each project in projects.json and displays info such as name, description, uses etc -->
      {#each projects as project}
      <div class="">
        <a href="{project.url}">
        <div class="bg-[#171717] bg-opacity-20 border-dashed border-2 border-[#171717] projectContainer transition duration-150 ease-in-out rounded p-4 md:hover:scale-105">
          <div>
            <h4 class="text-2xl font-semibold text-white">{project.name} </h4>
            <p class="my-2 text-sm text-white indent-2">{project.description.toLowerCase()}</p>
            <div class="flex items-center mt-4 gap-2">
    
              {#each project.uses as uses} <!-- as project.uses is often a list of more than one item.. -->
              <div class="hover:bg-opacity-25 bg-indigo-300 bg-opacity-5 p-2 rounded-md font-bold uppercase text-xs text-indigo-200">
                {uses}
              </div>
    
              <!-- displays 'open source' next to a project if isopensource is true inside projects.json -->
              {/each}
              {#if project.isopenSource == true}
              <div class="hover:bg-opacity-25 bg-indigo-300 bg-opacity-5 p-2 rounded-md font-bold uppercase text-xs text-indigo-300">
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

