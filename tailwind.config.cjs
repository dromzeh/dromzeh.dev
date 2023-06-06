/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{html,svelte,svx,md,ts}'],
	options: {
		whitelistPatterns: [/svelte-/],
		defaultExtractor: (content) =>
			[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
				([_match, group, ..._rest]) => group
			)
	},
	theme: {
		extend: {
			animation: {
				text: 'text 1s ease infinite'
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			colors: {
				secondary: {
					100: '#0b0b0b',
					200: '#090909',
					300: '#070707',
					400: '#050505',
					500: '#030303',
					600: '#010101'
				},
				primary: {
					100: '#ffffff',
					200: '#f2f2f2',
					300: '#e6e6e6',
					400: '#d9d9d9',
					500: '#cccccc',
					600: '#bfbfbf'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
