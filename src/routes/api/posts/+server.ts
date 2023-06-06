import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types/post'

async function getPosts(): Promise<Post[]> {
	const posts: Post[] = []

	const paths = import.meta.glob('/src/posts/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const id = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && id) {
			const metadata = file.metadata as Omit<Post, 'id'>
			const post: Post = { ...metadata, id, published: metadata.published ?? false }
			posts.push(post)
		}
	}

	posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())

	return posts
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}
