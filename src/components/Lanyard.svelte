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
}

onMount(() => {
	updateLanyard()

	// update lanyard every 15 seconds
	setInterval(() => {
		updateLanyard()
	}, 15000)
})

onDestroy(() => {
	clearInterval(intervalId)
})
</script>

<!-- TODO: RPC support? -->
<div class = "text-sm">
	{#if lanyard}
		<div>
			<p>
				<i class="fas fa-circle {statusColors[lanyard?.data.discord_status]}"></i>
				I'm currently
				<a
					class="link-underline font-semibold text-white"
					href="https://discord.com/users/{lanyard?.data?.discord_user.id}"
					>{statusDict[lanyard?.data.discord_status]}</a>
				on Discord
				{#if lanyard?.data?.listening_to_spotify}
					- listening to
					<span class="inline-block">
						<a
							class="link-underline font-semibold text-white"
							href="https://open.spotify.com/track/{lanyard?.data?.spotify.track_id}"
							>{lanyard?.data?.spotify.song}</a>
						by
						<a
							class="link-underline font-semibold text-white"
							href="https://open.spotify.com/search/{lanyard?.data?.spotify.artist}"
							>{lanyard?.data?.spotify.artist}</a>
					</span>
				{/if}
			</p>
		</div>
	{:else}
		<div>
			<p class = "animate-pulse">
				<i class="fas fa-circle-notch animate-spin"></i>
				Loading Discord status...
			</p>
		</div>
	{/if}
</div>