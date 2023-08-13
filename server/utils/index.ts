import type { H3Event } from 'h3'

export function getLastVisited(event: H3Event) {
	const cookie = getCookie(event, 'last-visited')

	const lastVisited = {
		book: 'genesis',
		chapter: '1',
	}

	if (cookie) {
		const [book, chapter] = cookie.split('/')
		if (book && chapter) {
			lastVisited.book = book
			lastVisited.chapter = chapter
		}
	}

	return lastVisited
}
