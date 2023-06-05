export type Post = {
	title: string
	id: string
	description: string
	date: string
	categories: []
	published: boolean
	author: string
}

export type Project = {
	name: string
	description: string
	url: string
	isOpenSource: boolean
	tags: []
	active: boolean
}

export type Contact = {
	title: string
	description: string
	type: string
	url: string
	icon: string
}
