export default () => {
	const user = useSupabaseUser()
	const supabase = useSupabaseClient()
	const route = useRoute()

	const highlightsForCurrentChapter = useState<Highlight[]>(
		'highlights-for-current-chapter',
		() => []
	)

	const colors: HighlightColor[] = [
		'yellow',
		'green',
		'blue',
		'pink',
		'purple',
	]

	const fetchHighlightsForCurrentChapter = async () => {
		const currentBook = useCurrentBook()

		if (user.value) {
			supabase
				.from('highlights')
				.select('*')
				.eq('user_id', user.value.id)
				.eq('book', currentBook.id)
				.eq('chapter', route.params.chapter)
				.then(({ data, error }) => {
					if (error) {
						highlightsForCurrentChapter.value = []
					} else {
						highlightsForCurrentChapter.value = data
					}
				})
		}
	}

	const highlightVerse = async (
		book: number,
		chapter: number,
		verse: number,
		color: HighlightColor = 'yellow'
	) => {
		const { error } = await supabase.from('highlights').insert({
			// @ts-ignore
			book,
			chapter,
			verse,
			color,
			user_id: user.value.id,
		})

		if (error) {
			throw error
		}

		await fetchHighlightsForCurrentChapter()
	}

	const updateHighlightColor = async (id: number, color: HighlightColor) => {
		const { error } = await supabase
			.from('highlights')
			// @ts-ignore
			.update({ color })
			.eq('id', id)

		if (error) {
			throw error
		}

		await fetchHighlightsForCurrentChapter()
	}

	const deleteHighlight = async (id: number) => {
		const { error } = await supabase
			.from('highlights')
			.delete()
			.eq('id', id)

		if (error) {
			throw error
		}

		await fetchHighlightsForCurrentChapter()
	}

	return {
		highlightsForCurrentChapter,
		fetchHighlightsForCurrentChapter,
		highlightVerse,
		updateHighlightColor,
		deleteHighlight,
		colors,
	}
}
