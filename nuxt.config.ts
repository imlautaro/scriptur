export default defineNuxtConfig({
	appConfig: {
		nuxtIcon: {
			size: '1.75em',
		},
	},
	googleFonts: {
		families: {
			'Inter': [400, 500, 700],
			'Roboto+Slab': [400, 500, 700],
		},
	},
	imports: {
		dirs: ['stores'],
	},
	modules: [
		'@nuxtjs/supabase',
		'@unocss/nuxt',
		'nuxt-icon',
		'@nuxtjs/google-fonts',
		'@kevinmarrec/nuxt-pwa',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
	],
	pinia: {
		autoImports: ['defineStore'],
	},
	pwa: {
		icon: {
			maskablePadding: 0,
		},
		manifest: {
			name: 'Scriptur',
			short_name: 'Scriptur',
			theme_color: '#000000',
			scope: '/read',
			start_url: '/read',
		},
		meta: {
			name: 'Scriptur',
		},
	},
	runtimeConfig: {
		public: {
			baseURL: 'http://localhost:3000',
		},
	},
	supabase: {
		redirect: false,
	},
	unocss: {
		preflight: true,
		typography: true,
	},
})
