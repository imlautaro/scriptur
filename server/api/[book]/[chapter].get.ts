import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
	const supabase = await serverSupabaseClient(event)

	const query = getQuery(event)
	const currentVersion =
		typeof query.version === 'string' ? query.version || 1 : 1

	const headingsLang =
		typeof query.headingsLang === 'string'
			? query.headingsLang || 'en'
			: 'en'

	const currentBook = parseInt(event.context.params?.book || '1')
	const currentChapter = parseInt(event.context.params?.chapter || '1')

	const getQuantityOfBooks = async () => {
		const { data: books, error: booksError } = await supabase
			.from('verses')
			.select('book')
			.eq('version_id', currentVersion)
			.order('book', { ascending: false })
			.limit(1)
			.single()

		if (booksError) {
			throw booksError
		}

		return books
	}

	const getQuantityOfChapters = async (currentBook: number) => {
		const { data: chapters, error: chaptersError } = await supabase
			.from('verses')
			.select('chapter')
			.eq('version_id', currentVersion)
			.eq('book', currentBook)
			.order('chapter', { ascending: false })
			.limit(1)
			.single()

		if (chaptersError) {
			throw chaptersError
		}

		return chapters.chapter
	}

	const getVersion = async (id: number | string) => {
		const { data: version, error: versionError } = await supabase
			.from('versions')
			.select('id, acronym, full_name, language')
			.eq('id', id)
			.single()

		if (versionError) {
			throw versionError
		}

		return version
	}

	const getVerses = async (currentBook: number, currentChapter: number) => {
		const { data: verses, error: versesError } = await supabase
			.from('verses')
			.select('book, chapter, verse, content, version_id')
			.eq('version_id', currentVersion)
			.eq('book', currentBook)
			.eq('chapter', currentChapter)
			.order('verse', { ascending: true })

		if (versesError) {
			throw versesError
		}

		return verses
	}

	const getHeadings = async (currentBook: number, currentChapter: number) => {
		const { data: headings, error: headingsError } = await supabase
			.from('headings')
			.select(`verse, ${headingsLang}`)
			.eq('book', currentBook)
			.eq('chapter', currentChapter)

		if (headingsError) {
			console.log('❌', headingsError.message)
			throw headingsError
		}

		return headings
	}

	try {
		const version = await getVersion(currentVersion)
		const headings = await getHeadings(currentBook, currentChapter)
		const totalBooks = 66 // await getQuantityOfBooks()
		const totalChapters = await getQuantityOfChapters(currentBook)
		const verses = await getVerses(currentBook, currentChapter)

		const isFirstBook = currentBook === 1
		const isFirstChapter = currentChapter === 1
		const isLastBook = currentBook === totalBooks
		const isLastChapter = currentChapter === totalChapters

		const nextBook = isLastChapter
			? isLastBook
				? 1
				: currentBook + 1
			: currentBook
		const nextChapter = isLastChapter ? 1 : currentChapter + 1

		const previousBook = isFirstChapter
			? isFirstBook
				? 1
				: currentBook - 1
			: currentBook

		let previousChapter = isFirstChapter ? 1 : currentChapter - 1

		if (previousBook != currentBook) {
			const { data: _previousChapter, error: previousChapterError } =
				await supabase
					.from('verses')
					.select('chapter')
					.eq('version_id', currentVersion)
					.eq('book', previousBook)
					.order('chapter', { ascending: false })
					.limit(1)
					.single()

			if (previousChapterError) {
				throw previousChapterError
			}

			previousChapter = _previousChapter.chapter
		}

		return {
			// @ts-ignore
			headings: headings as {
				verse: number
				// @ts-ignore
				[headingsLang]: string
			}[],
			version: version as {
				id: number
				acronym: string
				full_name: string
				language: string
			},
			verses: verses as {
				book: number
				chapter: number
				verse: number
				content: string
			}[],
			next:
				currentBook === totalBooks && currentChapter === totalChapters
					? null
					: { book: nextBook, chapter: nextChapter },
			previous:
				currentBook === 1 && currentChapter === 1
					? null
					: { book: previousBook, chapter: previousChapter },
			books: totalBooks,
			chapters: totalChapters,
		}
	} catch (error) {
		console.error(error)
		return {}
	}
})
