export default () => {
	const cookie = useCookie('last-visited')

	const lastVisited = reactive({
		book: 'genesis',
		chapter: '1',
	})

	if (cookie.value) {
		const [book, chapter] = cookie.value.split('/')

		if (book && chapter) {
			lastVisited.book = book
			lastVisited.chapter = chapter
		}
	}

	return lastVisited
}
