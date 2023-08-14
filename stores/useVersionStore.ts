export default defineStore('version', {
	state: () => ({
		current: {
			id: 1,
			acronym: 'rev',
			full_name: 'Revised English Version',
			language: 'en',
		},
	}),
	actions: {
		fetchAvailableVersions() {
			try {
				return $fetch('/api/versions')
			} catch (error) {
				throw error
			}
		},
	},
	persist: true,
})
