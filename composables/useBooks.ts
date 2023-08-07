export default () => {
	const books = ref([
		{
			id: 1,
			key: 'genesis',
			newTestament: false,
		},
		{
			id: 2,
			key: 'exodus',
			newTestament: false,
		},
		{
			id: 3,
			key: 'leviticus',
			newTestament: false,
		},
		{
			id: 4,
			key: 'numbers',
			newTestament: false,
		},
		{
			id: 5,
			key: 'deuteronomy',
			newTestament: false,
		},
		{
			id: 6,
			key: 'joshua',
			newTestament: false,
		},
		{
			id: 7,
			key: 'judges',
			newTestament: false,
		},
		{
			id: 8,
			key: 'ruth',
			newTestament: false,
		},
		{
			id: 9,
			key: '1-samuel',
			newTestament: false,
		},
		{
			id: 10,
			key: '2-samuel',
			newTestament: false,
		},
		{
			id: 11,
			key: '1-kings',
			newTestament: false,
		},
		{
			id: 12,
			key: '2-kings',
			newTestament: false,
		},
		{
			id: 13,
			key: '1-chronicles',
			newTestament: false,
		},
		{
			id: 14,
			key: '2-chronicles',
			newTestament: false,
		},
		{
			id: 15,
			key: 'ezra',
			newTestament: false,
		},
		{
			id: 16,
			key: 'nehemiah',
			newTestament: false,
		},
		{
			id: 17,
			key: 'esther',
			newTestament: false,
		},
		{
			id: 18,
			key: 'job',
			newTestament: false,
		},
		{
			id: 19,
			key: 'psalms',
			newTestament: false,
		},
		{
			id: 20,
			key: 'proverbs',
			newTestament: false,
		},
		{
			id: 21,
			key: 'ecclesiastes',
			newTestament: false,
		},
		{
			id: 22,
			key: 'song-of solomon',
			newTestament: false,
		},
		{
			id: 23,
			key: 'isaiah',
			newTestament: false,
		},
		{
			id: 24,
			key: 'jeremiah',
			newTestament: false,
		},
		{
			id: 25,
			key: 'lamentations',
			newTestament: false,
		},
		{
			id: 26,
			key: 'ezekiel',
			newTestament: false,
		},
		{
			id: 27,
			key: 'daniel',
			newTestament: false,
		},
		{
			id: 28,
			key: 'hosea',
			newTestament: false,
		},
		{
			id: 29,
			key: 'joel',
			newTestament: false,
		},
		{
			id: 30,
			key: 'amos',
			newTestament: false,
		},
		{
			id: 31,
			key: 'obadiah',
			newTestament: false,
		},
		{
			id: 32,
			key: 'jonah',
			newTestament: false,
		},
		{
			id: 33,
			key: 'micah',
			newTestament: false,
		},
		{
			id: 34,
			key: 'nahum',
			newTestament: false,
		},
		{
			id: 35,
			key: 'habakkuk',
			newTestament: false,
		},
		{
			id: 36,
			key: 'zephaniah',
			newTestament: false,
		},
		{
			id: 37,
			key: 'haggai',
			newTestament: false,
		},
		{
			id: 38,
			key: 'zechariah',
			newTestament: false,
		},
		{
			id: 39,
			key: 'malachi',
			newTestament: false,
		},
		{
			id: 40,
			key: 'matthew',
			newTestament: true,
		},
		{
			id: 41,
			key: 'mark',
			newTestament: true,
		},
		{
			id: 42,
			key: 'luke',
			newTestament: true,
		},
		{
			id: 43,
			key: 'john',
			newTestament: true,
		},
		{
			id: 44,
			key: 'acts',
			newTestament: true,
		},
		{
			id: 45,
			key: 'romans',
			newTestament: true,
		},
		{
			id: 46,
			key: '1-corinthians',
			newTestament: true,
		},
		{
			id: 47,
			key: '2-corinthians',
			newTestament: true,
		},
		{
			id: 48,
			key: 'galatians',
			newTestament: true,
		},
		{
			id: 49,
			key: 'ephesians',
			newTestament: true,
		},
		{
			id: 50,
			key: 'philippians',
			newTestament: true,
		},
		{
			id: 51,
			key: 'colossians',
			newTestament: true,
		},
		{
			id: 52,
			key: '1-thessalonians',
			newTestament: true,
		},
		{
			id: 53,
			key: '2-thessalonians',
			newTestament: true,
		},
		{
			id: 54,
			key: '1-timothy',
			newTestament: true,
		},
		{
			id: 55,
			key: '2-timothy',
			newTestament: true,
		},
		{
			id: 56,
			key: 'titus',
			newTestament: true,
		},
		{
			id: 57,
			key: 'philemon',
			newTestament: true,
		},
		{
			id: 58,
			key: 'hebrews',
			newTestament: true,
		},
		{
			id: 59,
			key: 'james',
			newTestament: true,
		},
		{
			id: 60,
			key: '1-peter',
			newTestament: true,
		},
		{
			id: 61,
			key: '2-peter',
			newTestament: true,
		},
		{
			id: 62,
			key: '1-john',
			newTestament: true,
		},
		{
			id: 63,
			key: '2-john',
			newTestament: true,
		},
		{
			id: 64,
			key: '3-john',
			newTestament: true,
		},
		{
			id: 65,
			key: 'jude',
			newTestament: true,
		},
		{
			id: 66,
			key: 'revelation',
			newTestament: true,
		},
	])

	const findBookByKey = (key: string) =>
		books.value.find(book => book.key === key)
	const findBookById = (id: number) =>
		books.value.find(book => book.id === id)

	const oldTestamentBooks = computed(() =>
		books.value.filter(book => !book.newTestament)
	)
	const newTestamentBooks = computed(() =>
		books.value.filter(book => book.newTestament)
	)

	return {
		books,
		oldTestamentBooks,
		newTestamentBooks,
		findBookByKey,
		findBookById,
	}
}
