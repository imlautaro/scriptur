export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.hooks.hook('vue:setup', () => {
		const themeColor = useState('theme-color', () => '#ffffff')

		useHead(() => ({
			meta: [
				{
					name: 'theme-color',
					content: themeColor.value,
					tagPriority: 'high',
				},
			],
		}))
	})
})
