export default defineEventHandler(event => {
	const { book, chapter } = getLastVisited(event)
	const i18nRedirected = getCookie(event, 'i18n_redirected')
	const prefix =
		!i18nRedirected || i18nRedirected === 'en' ? '' : `/${i18nRedirected}`

	return sendRedirect(event, `${prefix}/read/${book}/${chapter}`)
})
