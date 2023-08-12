export default defineNuxtRouteMiddleware(() => {
	const user = useSupabaseUser()
	const lastVisited = useCookie('last-visited')
	const locale = useCookie('i18n_redirected')

	const prefix = locale.value === 'en' ? '' : `/${locale.value}`

	if (user.value) {
		if (lastVisited.value) {
			const [book, chapter] = lastVisited.value.split('/')

			return navigateTo(`${prefix}/read/${book}/${chapter}`)
		}

		return navigateTo(`${prefix}/read/genesis/1`)
	}
})
