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
import axios from "axios";
import { onMount } from "svelte";

let discordData = {};
let statusColor = "";
let customStatus = {};

async function getDiscordData() {
  try {
    const { data } = await axios.get(
      "https://api.lanyard.rest/v1/users/492731761680187403"
    );
    discordData = data.data;

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

    if (discordData.discord_status !== "offline") {
      const onlineOnDevices = [];
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

    const activity = discordData.activities?.find(
      (activity) => activity.type === 0 && activity.state !== undefined
    );
    if (activity) {
      discordData.RPCExists = true;
      discordData.activityName = activity.name;
      discordData.activityState = activity.state;
      discordData.activityDetails = activity.details;
      discordData.applicationID = activity.application_id;
      discordData.timestamps = activity.timestamps;
      discordData.assets = activity.assets;
    }

    customStatus = discordData.activities?.find(
      (activity) => activity.type === 4 && activity.name === "Custom Status"
    );
  } catch (e) {
    console.log("Error fetching data");
  }
}

onMount(() => {
  getDiscordData();
  setTimeout(getDiscordData, 25000);
});
</script>

<div class="grid grid-cols-1 gap-1">
  {#if discordData.discord_status}
    <h1 class="mb-2 text-2xl font-semibold tracking-wide sm:text-[1.67rem]">
      Discord Status
    </h1>
    <div
      class="rounded-lg border-[0.5px] border-white/20 bg-white/5 text-neutral-100/90 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/40 hover:bg-white hover:bg-opacity-[6.9%] hover:text-neutral-100">
      <p class="absolute right-0 top-0 m-2 hidden text-2xl sm:block">
        <span style="color: {statusColor}"
          ><i class="fa-solid fa-circle animate-pulse"></i>
        </span>
      </p>
      <div class="flex items-center">
        <div class="p-5">
          <a
            href="https://discord.com/users/{discordData.discord_user?.id}"
            target="_blank"
            rel="noreferrer">
            <img
              class="inline h-24 w-24 max-w-none rounded-md object-left"
              src="https://cdn.discordapp.com/avatars/{discordData.discord_user
                ?.id}/{discordData.discord_user?.avatar}.png"
              alt="discord profile" />
          </a>
        </div>
        <div>
          <p class="text-xl font-semibold text-white">
            {discordData.discord_user?.username}#{discordData.discord_user
              ?.discriminator}
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

  {#if discordData.listening_to_spotify}
    <div
      class="rounded-lg border-[0.5px] border-white/20 bg-white/5 text-neutral-100/90 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/40 hover:bg-white hover:bg-opacity-[6.9%] hover:text-neutral-100">
      <div class="flex items-center">
        <div class="p-5">
          <i
            class="fab fa-spotify absolute right-0 top-0 m-2 hidden animate-pulse text-2xl text-white sm:block"
          ></i>
          <div class="relative opacity-80 hover:opacity-100">
            <a
              href="https://open.spotify.com/track/{discordData.spotify
                ?.track_id}"
              target="_blank"
              rel="noreferrer">
              <p class="playBtn fa fa-play absolute text-4xl text-white"></p>

              <img
                class="coverImg h-24 w-24 max-w-none rounded-md object-left shadow-lg"
                src="{discordData.spotify?.album_art_url}"
                alt="{discordData.spotify?.song} album art" />
            </a>
          </div>
        </div>
        <div class="text-white">
          <p class="text-xl font-semibold">
            {discordData.spotify?.song}
          </p>
          <p class="text-sm text-gray-400">
            by {discordData.spotify?.artist}
          </p>
          <p class="text-xs text-gray-400">
            on {discordData.spotify?.album}
          </p>
        </div>
      </div>
    </div>
  {/if}

  {#if discordData.RPCExists}
    <div
      class="rounded-lg border-[0.5px] border-white/20 bg-white/5 text-neutral-100/90 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-white/40 hover:bg-white hover:bg-opacity-[6.9%] hover:text-neutral-100">
      <div class="flex items-center">
        <div class="p-5">
          <div class="relative">
            {#if discordData.assets?.small_image}
              <img
                class="smallImg absolute h-8 w-8 max-w-none rounded-md object-left"
                src="https://cdn.discordapp.com/app-assets/{discordData.applicationID}/{discordData
                  .assets.small_image}.png"
                alt="RPC Small" />
            {/if}

            {#if discordData.assets?.large_image}
              <img
                class="coverImg h-24 w-24 max-w-none rounded-md object-left shadow-lg"
                src="https://cdn.discordapp.com/app-assets/{discordData.applicationID}/{discordData
                  .assets.large_image}.png"
                alt="RPC Large" />
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
          {#if discordData.activityDetails}
            <p class="text-xs text-gray-400">
              {discordData.activityState}
            </p>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
