export interface LanyardData {
	success: boolean
	data: {
		spotify: {
			track_id: string
			timestamps: {
				start: number
				end?: number
			}
			song: string
			artist: string
			album_art_url: string
			album: string
		}
		listening_to_spotify: boolean
		kv: Record<string, unknown>
		discord_user: {
			username: string
			public_flags: number
			id: string
			global_name: null
			display_name: null
			discriminator: string
			bot: boolean
			avatar_decoration: null
			avatar: string
		}
		discord_status: string
		activities: {
			type: number
			timestamps: {
				start: number
				end?: number
			}
			sync_id?: string
			state?: string
			session_id?: string
			party?: {
				id: string
			}
			name: string
			id: string
			flags?: number
			details?: string
			created_at: number
			assets?: {
				large_text?: string
				large_image?: string
				small_text?: string
				small_image?: string
			}
			application_id?: string
		}[]
		active_on_discord_web: boolean
		active_on_discord_mobile: boolean
		active_on_discord_desktop: boolean
	}
}
