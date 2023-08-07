export default defineStore('version', {
	state: () => ({
		currentVersion: 1,
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
