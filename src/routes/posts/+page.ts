import type { Post } from '$lib/types/post'
import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch }: { fetch: typeof window.fetch }) => {
	const response = await fetch('api/posts')
	const posts: Post[] = await response.json()
	return { posts }
}
