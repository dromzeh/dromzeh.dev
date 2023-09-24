export const prerender = true
export const csr = true
export const ssr = false

export async function load({ url }) {
	return {
		url: url.pathname
	}
}
