<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import type { LanyardData } from '$lib/types/lanyard'

const statusDict: Record<string, string> = {
	online: 'Online',
	idle: 'Idle',
	dnd: 'Do Not Disturb',
	offline: 'Offline'
}

const statusColors: Record<string, string> = {
	online: 'text-green-200',
	idle: 'text-yellow-200',
	dnd: 'text-red-200',
	offline: 'text-gray-200'
}

let lanyard: LanyardData
let intervalId: number
let currentStatus = 'discord'

async function updateLanyard() {
	const response = await fetch('https://api.lanyard.rest/v1/users/492731761680187403')
	lanyard = await response.json()
	console.log(lanyard)
}

onMount(() => {
    updateLanyard()
    intervalId = setInterval(() => {
        if (lanyard?.data?.listening_to_spotify) {
            currentStatus = currentStatus === 'discord' ? 'spotify' : 'discord'
        } else {
            currentStatus = 'discord'
        }
    }, 10000)

    // Update lanyard every 15 seconds
    setInterval(() => {
        updateLanyard()
    }, 15000)
})

onDestroy(() => {
	clearInterval(intervalId)
})
</script>

<div>
	{#if lanyard}
		<div>
			{#if currentStatus === 'discord'}
				<p>
					<i class="fas fa-circle {statusColors[lanyard?.data.discord_status]}"></i>
					Currently
					<a
						class="link-underline font-semibold text-white"
						href="https://discord.com/users/{lanyard?.data?.discord_user.id}"
						>{statusDict[lanyard?.data.discord_status]}</a> on Discord
				</p>
			{:else if currentStatus === 'spotify'}
				<p>
					<i class="fab fa-spotify text-green-200"></i> Currently listening to
					<a
						class="link-underline font-semibold text-white"
						href="https://open.spotify.com/track/{lanyard?.data?.spotify.track_id}"
						>{lanyard?.data?.spotify.song}</a>
					by
					<a
						class="link-underline font-semibold text-white"
						href="https://open.spotify.com/search/{lanyard?.data?.spotify.artist}"
						>{lanyard?.data?.spotify.artist}</a>
				</p>
			{/if}
		</div>
	{/if}
</div>
