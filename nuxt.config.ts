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
		'@vite-pwa/nuxt',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/i18n',
		'@vueuse/nuxt',
	],
	pinia: {
		autoImports: ['defineStore'],
	},
	pwa: {
		manifest: {
			name: 'Scriptur',
			short_name: 'Scriptur',
			theme_color: '#4f46e5',
			background_color: '#4f46e5',
			icons: [
				{
					src: 'pwa-64x64.png',
					sizes: '64x64',
					type: 'image/png',
				},
				{
					src: 'pwa-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: 'pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any',
				},
				{
					src: 'pwa-1024x1024.png',
					sizes: '1024x1024',
					type: 'image/png',
					purpose: 'any',
				},
				{
					src: 'maskable-icon-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable',
				},
				{
					src: 'maskable-icon-1024x1024.png',
					sizes: '1024x1024',
					type: 'image/png',
					purpose: 'maskable',
				},
			],
		},
	},
	// pwa: {
	// 	icon: {
	// 		maskablePadding: 0,
	// 		sizes: [64, 120, 144, 152, 192, 384, 512, 1024],
	// 	},
	// 	manifest: {
	// 		name: 'Scriptur',
	// 		short_name: 'Scriptur',
	// 		theme_color: '#4f46e5',
	// 		background_color: '#4f46e5',
	// 		scope: '/',
	// 		start_url: '/',
	// 	},
	// 	meta: {
	// 		name: 'Scriptur',
	// 	},
	// },
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
