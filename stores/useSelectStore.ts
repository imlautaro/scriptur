export default defineStore('selection', {
	state: () => ({
		selection: [] as {
			book: number
			chapter: number
			verse: number
		}[],
	}),
	actions: {
		isSelected(book: number, chapter: number, verse: number) {
			return this.selection.find(
				selection =>
					selection.book === book &&
					selection.chapter === chapter &&
					selection.verse === verse
			)
		},
		toggleSelection(book: number, chapter: number, verse: number) {
			if (this.isSelected(book, chapter, verse)) {
				this.selection = this.selection.filter(i => {
					return (
						JSON.stringify(i) !==
						JSON.stringify({
							book,
							chapter,
							verse,
						})
					)
				})
			} else {
				this.selection.push({
					book,
					chapter,
					verse,
				})
			}

			if ('vibrate' in navigator) {
				navigator.vibrate(50)
			}
		},
		clear() {
			this.selection = []
		},
		async highlightSelection(color: HighlightColor = 'yellow') {
			const {
				highlightsForCurrentChapter,
				highlightVerse,
				updateHighlightColor,
			} = useHighlights()

			const alreadyHighlighted = this.selection
				.filter(item =>
					highlightsForCurrentChapter.value.some(
						highlight => highlight.verse === item.verse
					)
				)
				.map(
					item =>
						highlightsForCurrentChapter.value.find(
							highlight => highlight.verse === item.verse
						)!
				)

			const notHighlighted = this.selection.filter(
				item =>
					!highlightsForCurrentChapter.value.some(
						highlight => highlight.verse === item.verse
					)
			)

			await Promise.all(
				notHighlighted.map(item =>
					highlightVerse(item.book, item.chapter, item.verse, color)
				)
			)

			const alreadyHighlightedWithOtherColor = alreadyHighlighted.filter(
				item => item.color !== color
			)

			await Promise.all(
				alreadyHighlightedWithOtherColor.map(item =>
					updateHighlightColor(item.id, color)
				)
			)

			this.clear()
		},
		async unhighlightSelection() {
			const { highlightsForCurrentChapter, deleteHighlight } =
				useHighlights()

			const alreadyHighlighted = this.selection
				.filter(item =>
					highlightsForCurrentChapter.value.some(
						highlight => highlight.verse === item.verse
					)
				)
				.map(
					item =>
						highlightsForCurrentChapter.value.find(
							highlight => highlight.verse === item.verse
						)!
				)

			await Promise.all(
				alreadyHighlighted.map(item => deleteHighlight(item.id))
			)

			this.clear()
		},
	},
	getters: {
		label: state => {
			if (!state.selection.length) {
				return ''
			}

			let arr: number[][] = []

			let prev = -1

			state.selection
				.sort((a, b) => a.verse - b.verse)
				.forEach(item => {
					if (prev < 0) {
						prev = item.verse
						arr.push([item.verse])
					} else {
						if (prev === item.verse - 1) {
							prev = item.verse
							arr[arr.length - 1].push(item.verse)
						} else {
							prev = item.verse
							arr.push([item.verse])
						}
					}
				})

			const { findBookById } = useBooks()
			const { t } = useI18n()

			const book = findBookById(state.selection[0].book)

			if (!book) {
				return ''
			}

			return state.selection.length
				? `${t('books.titles.' + book.key)} ${
						state.selection[0].chapter
				  }:${arr.map(item => item.join('-')).join(', ')}`
				: ''
		},
	},
})
