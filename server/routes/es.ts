export default defineEventHandler(event => {
	const _lastVisited = getCookie(event, 'last-visited')
	const i18nRedirected = getCookie(event, 'i18n_redirected')

	const prefix = i18nRedirected === 'en' ? '' : `/${i18nRedirected}`

	if (_lastVisited) {
		const [book, chapter] = _lastVisited.split('/')
		return sendRedirect(event, `${prefix}/read/${book}/${chapter}`)
	}

	return sendRedirect(event, `${prefix}/read/genesis/1`)
})
