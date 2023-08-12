export default () => {
	const route = useRoute()
	const { findBookByKey } = useBooks()

	let currentBook = {
		id: 1,
		key: 'genesis',
		newTestament: false,
	}

	if (typeof route.params.book === 'string') {
		const book = findBookByKey(route.params.book)
		if (book) {
			currentBook = book
		}
	}

	return currentBook
}
