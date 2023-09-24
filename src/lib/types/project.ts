export type Project = {
	id: string
	name: string
	description: string
	url?: string
	gitUrl?: string
} & ({ url: string } | { gitUrl: string })
