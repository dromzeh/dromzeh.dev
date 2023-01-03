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

<div class = "grid lg:grid-cols-2 grid-cols-1 lg:gap-1">

<!-- discord status section -->
{#if discordData.discord_status != undefined}
<div class = "relative rounded-lg border-[#121212] hover:border-gray-600/50 from-transparent border-2 mb-6">
  <p class = "absolute top-0 right-0 text-2xl m-2">
    <span style="color: {statusColor}"
    ><i class="animate-pulse fa-solid fa-circle" />
  </span>
</p>
  <div class="flex items-center">
    <div class="p-5">
      <a href="https://discord.com/users/{discordData.discord_user.id}" target="_blank" rel="noreferrer">
        <img
          class="inline w-24 h-24 rounded-md object-left max-w-none transition delay-50 duration-300 ease-in-out hover:-rotate-[5deg] hover:scale-105"
          src="https://cdn.discordapp.com/avatars/{discordData.discord_user
            .id}/{discordData.discord_user.avatar}.png"
          alt="discord profile"
        />
      </a>
    </div>
    <div>
      <p class = "text-xs text-gray-400">
        Discord Status
      </p>
      <p class="text-xl font-semibold text-white">
        {discordData.discord_user.username}#{discordData.discord_user
          .discriminator}
      </p>
      <p class="text-sm">
        {discordData.discord_status}
      </p>
      <p class = "text-xs text-gray-400">
        {discordData.onlineOnDevices}
    </p>
    </div>
  </div>
</div>
{/if}

<!-- spotify section -->
{#if discordData.listening_to_spotify}
<div class = "relative rounded-lg border-[#121212] hover:border-gray-600/50 from-transparent to-green-700/10 bg-gradient-to-tl border-2 mb-6">
    <div class="flex items-center">
        <div class="p-5">
          <i class = "absolute fab text-2xl fa-spotify text-white animate-pulse top-0 right-0 m-2"></i>
          <div class = "relative opacity-80 hover:opacity-100"> 
            <a href = "https://open.spotify.com/track/{discordData.spotify.track_id}" target="_blank" rel="noreferrer">
              <p class = "absolute text-white playBtn text-4xl fa fa-play"></p>

                <img class="w-24 h-24 rounded-md object-left max-w-none coverImg shadow-lg"
                     src="{discordData.spotify.album_art_url}"
                     alt="{discordData.spotify.song} album art"
                />

            </a>
          </div>
        </div>
        <div class = "text-white">
          <p class = "text-xs text-gray-400">
            Currently Listening to
          </p>
            <p class="text-xl font-semibold">
              {discordData.spotify.song}
            </p>
            <p class = "text-sm text-gray-400">
                by {discordData.spotify.artist}
            </p>
            <p class = "text-xs text-gray-400">
              on {discordData.spotify.album}
          </p>
        </div>
    </div>
</div>
{/if}

</div>

<!-- Path: src\components\DiscordStatus.svelte -->
<style>
  .playBtn {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
