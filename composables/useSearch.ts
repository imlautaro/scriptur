export default () => {
	const searchStore = useSearchStore()
	const query = ref('')

	const search = () => {
		if (query.value.length < 3) return
		return searchStore.search(query.value)
	}

	return { query, search, results: computed(() => searchStore.results) }
}
