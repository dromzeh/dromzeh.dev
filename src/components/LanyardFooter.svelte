<script lang="ts">
import { useLanyard } from 'svelte-lanyard'

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

const lanyard = useLanyard('492731761680187403')
</script>

<!-- TODO: RPC support? -->
<div>
	{#if $lanyard}
		<div>
			<p>
				I'm currently
				<a
					class="link-underline font-semibold {statusColors[$lanyard.discord_status]}"
					href="https://discord.com/users/{$lanyard.discord_user.id}"
					>{statusDict[$lanyard.discord_status]}</a>
				on Discord
				{#if $lanyard.listening_to_spotify && $lanyard.spotify}
					- listening to
					<span class="inline-block">
						<a
							class="link-underline font-semibold text-white"
							href="https://open.spotify.com/track/{$lanyard.spotify.track_id}"
							>{$lanyard.spotify.song}</a>
						by
						<a
							class="link-underline font-semibold text-white"
							href="https://open.spotify.com/search/{$lanyard.spotify.artist}"
							>{$lanyard.spotify.artist}</a>
					</span>
				{/if}
			</p>
		</div>
	{:else}
		<div>
			<p class="animate-pulse">Loading Discord status...</p>
		</div>
	{/if}
</div>
