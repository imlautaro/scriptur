export default () => {
	const cookie = useCookie('last-visited')

	const lastVisited = reactive({
		book: 'genesis',
		chapter: '1',
	})

	watch(
		cookie,
		value => {
			if (value) {
				const [book, chapter] = value.split('/')

				if (book && chapter) {
					lastVisited.book = book
					lastVisited.chapter = chapter
				}
			}
		},
		{ immediate: true }
	)

	return lastVisited
}
