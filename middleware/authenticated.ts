export default defineNuxtRouteMiddleware(() => {
	const user = useSupabaseUser()
	const locale = useCookie('i18n_redirected')

	const prefix = locale.value === 'en' ? '' : `/${locale.value}`

	if (!user.value) {
		return navigateTo(`${prefix}/login`)
	}
})
