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
		async fetchAvailableVersions() {
			const supabase = useSupabaseClient()

			const { data, error } = await supabase
				.from('versions')
				.select('id, acronym, full_name, language')

			if (error) {
				throw error
			}

			return data as Version[]
		},
	},
	persist: true,
})
