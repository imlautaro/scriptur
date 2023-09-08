interface Verse {
	book: number
	chapter: number
	verse: number
	content: string
}

export default defineStore('search', {
	state: () => ({
		results: null as null | Verse[],
	}),
	actions: {
		async search(query: string) {
			const versionStore = useVersionStore()

			const data = await $fetch<{
				hits: {
					document: Verse
				}[]
			}>(`/api/search/${versionStore.current.acronym}?q=${query}`)

			this.results = data?.hits.map(hit => hit.document)

			return data
		},
		clear() {
			this.results = null
		},
	},
})
