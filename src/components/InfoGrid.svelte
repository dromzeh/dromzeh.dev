<!-- Path: src\components\DiscordStatus.svelte -->
<style>
.playBtn {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.smallImg {
  bottom: 0;
  left: 100%;
  transform: translate(-70%, 10%);
}
</style>

<script>
// TODO: edit this whole component
import axios from "axios";
import { onMount } from "svelte";
let discordData = "";
let statusColor = "";

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
        const statusNames = {
          online: "Online",
          idle: "Idle",
          dnd: "Do Not Disturb",
          offline: "Offline",
        };
        statusColor = statusColors[discordData.discord_status];

        if (discordData.discord_status != "offline") {
          let onlineOnDevices = [];
          if (discordData.active_on_discord_desktop) {
            onlineOnDevices.push("🖥️");
          }
          if (discordData.active_on_discord_mobile) {
            onlineOnDevices.push("📱");
          }
          if (discordData.active_on_discord_web) {
            onlineOnDevices.push("🌐");
          }
          discordData.onlineOnDevices = onlineOnDevices.join(" ");
        } else {
          discordData.onlineOnDevices = "";
        }

        discordData.discord_status = statusNames[discordData.discord_status];

        // if there is an entry in discordData.activites
        if (discordData.activities.length > 0) {
          // find the first entry that has a type of 0 and has a state
          let activity = discordData.activities.find(
            (activity) => activity.type === 0 && activity.state != undefined
          );
          console.log(activity);
          if (activity != undefined) {
            discordData.RPCExists = true;
            discordData.activityName = activity.name; // e.g Visual Studio Code
            discordData.activityState = activity.state; // e.g Editing index.html
            discordData.activityDetails = activity.details; // e.g In dromzeh.dev
            discordData.applicationID = activity.application_id; // e.g 383226320970055681
            discordData.timestamps = activity.timestamps; // e.g {start: 1620000000000}
            discordData.assets = activity.assets; // e.g {large_image: "vscode", large_text: "Visual Studio Code"}
          }
        }
      });
  } catch (e) {
    console.log("Error fetching data");
  }
  setTimeout(getDiscordData, 25000); // refreshes every 25 seconds
}

onMount(() => {
  getDiscordData();
});
</script>

<div class="grid grid-cols-1">
  <!-- discord status section -->
  {#if discordData.discord_status != undefined}
  <h1 class="mb-6 text-3xl font-semibold text-white">discord status</h1>
    <div
      class="relative mb-4 border-2 border-gray-600/10 from-transparent"
    >
      <p class="absolute top-0 right-0 m-2 text-2xl">
        <span style="color: {statusColor}"
          ><i class="fa-solid fa-circle animate-pulse"></i>
        </span>
      </p>
      <div class="flex items-center">
        <div class="p-5">
          <a
            href="https://discord.com/users/{discordData.discord_user.id}"
            target="_blank"
            rel="noreferrer"
          >
            <img
              class="inline h-24 w-24 max-w-none rounded-md object-left"
              src="https://cdn.discordapp.com/avatars/{discordData.discord_user
                .id}/{discordData.discord_user.avatar}.png"
              alt="discord profile"
            />
          </a>
        </div>
        <div>
          <p class="text-xl font-semibold text-white">
            {discordData.discord_user.username}#{discordData.discord_user
              .discriminator}
          </p>
          <p class="text-sm">
            {discordData.discord_status}
          </p>
          <p class="text-xs text-gray-400">
            {discordData.onlineOnDevices}
          </p>
        </div>
      </div>
    </div>
  {/if}

  <!-- spotify section -->
  {#if discordData.listening_to_spotify}
    <div
      class="relative mb-4 border-2 border-gray-600/10 bg-gradient-to-tl from-transparent to-green-700/10"
    >
      <div class="flex items-center">
        <div class="p-5">
          <i
            class="fab fa-spotify absolute top-0 right-0 m-2 animate-pulse text-2xl text-white"
          ></i>
          <div class="relative opacity-80 hover:opacity-100">
            <a
              href="https://open.spotify.com/track/{discordData.spotify
                .track_id}"
              target="_blank"
              rel="noreferrer"
            >
              <p class="playBtn fa fa-play absolute text-4xl text-white"></p>

              <img
                class="coverImg h-24 w-24 max-w-none rounded-md object-left shadow-lg"
                src="{discordData.spotify.album_art_url}"
                alt="{discordData.spotify.song} album art"
              />
            </a>
          </div>
        </div>
        <div class="text-white">
          <p class="text-xs text-gray-400">Currently Listening to</p>
          <p class="text-xl font-semibold">
            {discordData.spotify.song}
          </p>
          <p class="text-sm text-gray-400">
            by {discordData.spotify.artist}
          </p>
          <p class="text-xs text-gray-400">
            on {discordData.spotify.album}
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>
<!-- custom RPC section -->
{#if discordData.RPCExists}
  <div
    class="relative mb-4 border-2 border-gray-600/10 bg-gradient-to-tl from-transparent to-cyan-700/10"
  >
    <div class="flex items-center">
      <div class="p-5">
        <div class="relative">
          {#if discordData.assets.small_image}
            <img
              class="smallImg absolute h-8 w-8 max-w-none rounded-md object-left"
              src="https://cdn.discordapp.com/app-assets/{discordData.applicationID}/{discordData
                .assets.small_image}.png"
              alt="RPC Small"
            />
          {/if}

          {#if discordData.assets.large_image}
            <img
              class="coverImg h-24 w-24 max-w-none rounded-md object-left shadow-lg"
              src="https://cdn.discordapp.com/app-assets/{discordData.applicationID}/{discordData
                .assets.large_image}.png"
              alt="RPC Large"
            />
          {/if}
        </div>
      </div>
      <div class="text-white">
        <p class="text-xl font-semibold">
          {discordData.activityName}
        </p>
        <p class="text-sm text-gray-400">
          {discordData.activityDetails}
        </p>
        {#if discordData.activityDetails != undefined}
          <p class="text-xs text-gray-400">
            {discordData.activityState}
          </p>
        {/if}
      </div>
    </div>
  </div>
{/if}
