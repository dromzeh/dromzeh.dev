import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'
import type { Post } from '$lib/types'

export const load: Load = async ({ params }) => {
	try {
		const post = await import(`../../../posts/${params.id}.md`)
		const { metadata, default: content } = post as { metadata: Post; default: unknown }

		if (!metadata || !content) {
			throw new Error('Invalid post format')
		}

		return { content, meta: metadata }
	} catch (e) {
		throw error(404, `Page not found`)
	}
}
