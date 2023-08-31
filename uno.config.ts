import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { colors } from '@unocss/preset-mini'
import { highlightColors } from './utils/highlight-colors'

const range = (size: number, startAt = 1) =>
	Array.from(Array(size).keys()).map(i => i + startAt)

export default defineConfig({
	preflights: [
		{
			getCSS: ({ theme: _theme }) => {
				const theme = _theme as {
					fontFamily?: {
						sans?: string | string[]
					}
				}

				let bodyFont: null | string = null

				if (theme.fontFamily?.sans) {
					if (typeof theme.fontFamily.sans === 'string') {
						bodyFont = theme.fontFamily.sans
					} else {
						bodyFont = theme.fontFamily.sans.join(', ')
					}
				}

				return `
                    html {
                        -webkit-tap-highlight-color: transparent;
                        scroll-behavior: smooth;
                        user-select: none;
                    }
                    *, *:focus { outline: none !important; }
                    ${bodyFont && `body { font-family: ${bodyFont}; }`}
                `
			},
		},
	],
	safelist: [
		...range(12).map(i => `space-x-${i}`),
		...range(12).map(i => `space-y-${i}`),
		...range(12).map(i => `px-${i}`),
		'items-start',
		'items-baseline',
		'items-center',
		'items-stretch',
		'items-end',
		'justify-start',
		'justify-end',
		'justify-center',
		'justify-between',
		'justify-around',
		'justify-evenly',
		...highlightColors
			.map(color => [
				`bg-${color}-200`,
				`border-l-${color}-200`,
				`text-${color}-950`,
			])
			.flat(),
	],
	shortcuts: {
		'container-px': 'px-6',
	},
	theme: {
		colors: {
			primary: colors.blue,
		},
		fontFamily: {
			serif: ['"Libre Baskerville"', 'sans-serif'],
			sans: ['Inter', 'sans-serif'],
		},
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
})
