interface AuthorInfo {
	name: string
	username: string
	date: string
}

interface Commit {
	commitMsg: string
	authorInfo: AuthorInfo
	shaSpliced: string
	sha: string
}

export async function getCommitsRecent(perPage: number): Promise<Commit[]> {
	try {
		// yes this is ugly as hell but it works and i dont want to spend time on it rn
		const branch = window.location.href.startsWith('https://dromzeh.dev/') ? 'main' : 'main'
		const response = await fetch(
			`https://api.github.com/repos/dromzeh/dromzeh.dev/commits?per_page=${perPage}&sha=${branch}`
		)

		const data = await response.json()
		const commits: Commit[] = await Promise.all(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data.map(async (commit: any) => {
				const {
					commit: { message },
					author: { name, date },
					sha
				} = commit
				let commitMsg = message
				if (commitMsg.includes('\n')) {
					commitMsg = commitMsg.split('\n')[0]
				}
				const shaSpliced = sha.slice(0, 7)
				const authorInfo: AuthorInfo = {
					name,
					username: commit.author.login,
					date
				}
				return {
					commitMsg,
					authorInfo,
					shaSpliced,
					sha,
					branch
				}
			})
		)
		return commits
	} catch (error) {
		console.log(error)
		return []
	}
}
