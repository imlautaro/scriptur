<script setup lang="ts">
const { findBookById, findBookByKey } = useBooks()
const supabase = useSupabaseClient()
const route = useRoute()
const versionStore = useVersionStore()

const { data, error } = await useAsyncData(async () => {
	if (
		typeof route.params.book !== 'string' ||
		typeof route.params.chapter !== 'string'
	) {
		throw new Error('Book not found')
	}

	const book = findBookByKey(route.params.book)

	if (!book) {
		throw new Error('Book not found')
	}

	const { data, error } = await supabase
		.from('verses')
		.select('verse')
		.eq('version_id', versionStore.current.id)
		.eq('book', book.id)
		.eq('chapter', route.params.chapter)
		.order('verse', { ascending: false })
		.limit(1)
		.single()

	if (error || !data) {
		throw new Error(error?.message || 'An error occurred')
	}

	return data.verse
})
</script>

<template>
	<div v-if="data">
		<Stack class="bg-white shadow p-4" items="center" justify="between">
			<IconButton
				icon="solar:arrow-left-linear"
				:to="`/read/${route.params.book}`"
			/>
			<span class="font-bold text-xl">
				{{ $t(`books.titles.${route.params.book}`) }}
				{{ $route.params.chapter }}
			</span>
			<div class="w-12 h-12" />
		</Stack>
		<div class="grid grid-cols-4">
			<GhostButton
				v-for="(_, verse) in new Array(data)"
				:to="`/read/${route.params.book}/${route.params.chapter}/${
					verse + 1
				}`"
				class="p-4"
				items="center"
				justify="center"
			>
				{{ verse + 1 }}
			</GhostButton>
		</div>
	</div>
	<Alert v-else type="error">{{ error }}</Alert>
</template>
