<script setup lang="ts">
const { findBookById, findBookByKey } = useBooks()
const route = useRoute()
const supabase = useSupabaseClient()
const versionStore = useVersionStore()

const { data, error } = await useAsyncData(async () => {
	if (typeof route.params.book !== 'string') {
		throw new Error('Book not found')
	}

	const book = findBookByKey(route.params.book)

	if (!book) {
		throw new Error('Book not found')
	}

	const { data, error } = await supabase
		.from('verses')
		.select('chapter')
		.eq('version_id', versionStore.current.id)
		.eq('book', book.id)
		.order('chapter', { ascending: false })
		.limit(1)
		.single()

	if (error || !data) {
		throw new Error(error?.message || 'An error occurred')
	}

	return data.chapter
})
</script>

<template>
	<div v-if="data">
		<Stack class="bg-white shadow p-4" items="center" justify="between">
			<IconButton icon="solar:arrow-left-linear" to="/read/books" />
			<span class="font-bold text-xl">
				{{ $t(`books.titles.${route.params.book}`) }}
			</span>
			<div class="w-12 h-12" />
		</Stack>
		<div class="grid grid-cols-4">
			<GhostButton
				v-for="(_, chapter) in new Array(data)"
				:to="`/read/${route.params.book}/${chapter + 1}/verses`"
				class="p-4"
				items="center"
				justify="center"
			>
				{{ chapter + 1 }}
			</GhostButton>
		</div>
	</div>
	<Alert v-else type="error">An error occurred</Alert>
</template>
