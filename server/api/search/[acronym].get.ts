import { serverSupabaseServiceRole } from '#supabase/server'
import { ofetch } from 'ofetch'
import { search } from '@orama/orama'
import { restore } from '@orama/plugin-data-persistence'

const fetchIndex = defineCachedFunction(
	async (url: string) => {
		const JSONIndex = await ofetch(url, { parseResponse: txt => txt })

		console.log('executed')

		return JSONIndex
	},
	{ maxAge: 60 * 60 * 24 * 7 }
)

export default defineEventHandler(async event => {
	const query = getQuery(event).q

	if (typeof query !== 'string' || query.length < 3) {
		return {}
	}

	const supabase = serverSupabaseServiceRole(event)

	const {
		data: { publicUrl },
	} = supabase.storage
		.from('indexes')
		.getPublicUrl(`${event.context.params!.acronym}.json`)

	const JSONIndex = await fetchIndex(publicUrl)

	const db = await restore('json', JSONIndex)

	const searchResult = await search(db, {
		term: query,
		tolerance: 2,
	})

	return searchResult
})
