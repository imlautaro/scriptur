export default defineEventHandler(async event => {
	const data = (await useStorage().getItem(
		'assets/server/rev-commentary.json'
	)) as {
		book: number
		chapter: number
		verse: number
		content: string
	}[]

	return data.filter(({ book, chapter, verse }) => {
		return (
			book === +event.context.params!.book &&
			chapter === +event.context.params!.chapter &&
			verse === +event.context.params!.verse
		)
	})[0]
})
