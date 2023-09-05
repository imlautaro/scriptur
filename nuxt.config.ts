export default defineNuxtConfig({
	appConfig: {
		nuxtIcon: {
			size: '1.75em',
		},
	},
	css: ['~/assets/css/globals.css', '~/assets/css/transitions.css'],
	googleFonts: {
		families: {
			'Inter': [400, 500, 700],
			'Libre+Baskerville': [400, 700],
		},
	},
	i18n: {
		lazy: true,
		langDir: 'locales',
		locales: [
			{
				code: 'en',
				file: 'en-US.json',
				name: 'English',
			},
			{
				code: 'es',
				file: 'es-AR.json',
				name: 'Español',
			},
		],
		defaultLocale: 'en',
		detectBrowserLanguage: {
			useCookie: true,
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
		'@nuxtjs/i18n',
		'@vueuse/nuxt',
	],
	pinia: {
		autoImports: ['defineStore'],
	},
	pwa: {
		icon: {
			maskablePadding: 0,
			sizes: [64, 120, 144, 152, 192, 384, 512, 1024],
		},
		manifest: {
			name: 'Scriptur',
			short_name: 'Scriptur',
			theme_color: '#4f46e5',
			background_color: '#4f46e5',
			scope: '/',
			start_url: '/',
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
