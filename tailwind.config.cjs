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
					100: '#111114',
					200: '#0f0f12',
					300: '#0e0e10',
					400: '#0c0c0e',
					500: '#0a0a0c',
					600: '#09090a',
					700: '#070708',
					800: '#050506',
					900: '#030304',
					950: '#020202'
				},
				primary: {
					100: '#A04058',
					200: '#86C6FA',
					300: '#E39553'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
