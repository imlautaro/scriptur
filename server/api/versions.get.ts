import { serverSupabaseServiceRole } from '#supabase/server'

export default defineCachedEventHandler(
	async event => {
		const supabase = await serverSupabaseServiceRole(event)

		const { data, error } = await supabase
			.from('versions')
			.select('id, acronym, full_name, language')
			.eq('available', true)

		if (error) {
			throw error
		}

		return data
	},
	{ swr: true, maxAge: 60 * 60 }
)
