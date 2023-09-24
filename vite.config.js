import { sveltekit } from '@sveltejs/kit/vite'
// import path from 'path'

const config = {
	plugins: [sveltekit()],
	// resolve : {
	// 	alias: {
	// 		'@': path.resolve(__dirname, 'src'),
	// 	},
	// 	extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.svelte']
	// }
	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
}

export default config
