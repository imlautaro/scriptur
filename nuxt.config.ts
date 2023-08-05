import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineNuxtConfig({
	appConfig: {
		nuxtIcon: {
			size: '1.5em',
		},
	},
	devtools: { enabled: true },
	modules: ['@nuxtjs/supabase', '@unocss/nuxt', 'nuxt-icon'],
	supabase: {
		redirect: false,
	},
	unocss: {
		preflight: true,
		transformers: [transformerDirectives(), transformerVariantGroup()],
		typography: true,
	},
})
