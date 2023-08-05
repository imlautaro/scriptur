import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/supabase', '@unocss/nuxt'],
	supabase: {
		redirect: false,
	},
	unocss: {
		preflight: true,
		transformers: [transformerDirectives(), transformerVariantGroup()],
		typography: true,
	},
})
