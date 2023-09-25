<script lang="ts">
import { useLanyard } from 'svelte-lanyard'
import { Smartphone, Monitor } from 'lucide-svelte'

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

const statusRingColors: Record<string, string> = {
	online: 'ring-green-400',
	idle: 'ring-yellow-400',
	dnd: 'ring-red-400',
	offline: 'ring-gray-400'
}

const lanyard = useLanyard('492731761680187403')
</script>

<div>
	{#if $lanyard}
		<div class="flex flex-row items-center gap-4">
			<img
				src="https://cdn.discordapp.com/avatars/{$lanyard.discord_user.id}/{$lanyard
					.discord_user.avatar}"
				alt="{$lanyard.discord_user.username}"
				class="h-24 w-24 rounded-md ring transition-colors {statusRingColors[
					$lanyard.discord_status
				]} ring-2" />
			<div class="my-2 flex flex-col gap-2">
				<p class="flex items-center gap-1">
					@{$lanyard.discord_user.username}
					{#if $lanyard.active_on_discord_mobile}
						<Smartphone class="inline-block h-4 w-4" />
					{/if}
					{#if $lanyard.active_on_discord_desktop}
						<Monitor class="inline-block h-4 w-4" />
					{/if}
				</p>
				{#each $lanyard.activities as $activity}
					{#if $activity.type === 0}
						<div>
							<p class="text-xs">
								In {$activity.name}
							</p>
							<p class="text-xs">
								{$activity.state}
							</p>
						</div>
					{/if}
				{/each}
				{#if $lanyard.listening_to_spotify && $lanyard.spotify}
					<div>
						<p class="text-xs">
							Listening to {$lanyard.spotify.song} by {$lanyard.spotify.artist}
						</p>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div>
			<p class="animate-pulse">Loading Discord status...</p>
		</div>
	{/if}
</div>
