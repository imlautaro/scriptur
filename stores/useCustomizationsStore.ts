export default defineStore('customizations', {
	state: () => ({
		sepia: false,
		serif: true,
		showBooksAsGrid: true,
		primaryColor: 'indigo',
	}),
	persist: true,
})
