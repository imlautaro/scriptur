<script setup lang="ts">
const versionStore = useVersionStore()
const showVersionsModal = useState('show-versions-modal')
const { findBookById } = useBooks()
const { query, search, results } = useSearch()

onMounted(() => {
	console.log(results.value)
})
</script>

<template>
	<Stack class="h-full" justify="center" vertical>
		<Stack class="p-6" gap="6" items="center" justify="center" vertical>
			<span class="font-bold text-2xl"
				>{{ $t('search') }} {{ $t('in-the-bible') }}</span
			>
			<Stack class="border bg-white rounded-lg shadow-sm w-full text-sm">
				<form @submit.prevent="search" class="w-full">
					<input
						class="bg-transparent px-4 py-2 w-full"
						:placeholder="`${$t('love')}, ${$t('wisdom')}...`"
						type="text"
						v-model="query"
					/>
				</form>
				<Stack
					class="border-l px-4"
					@click="showVersionsModal = true"
					gap="2"
					items="center"
				>
					<span class="font-bold text-xs">
						{{ versionStore.current.acronym.toUpperCase() }}
					</span>
				</Stack>
			</Stack>
		</Stack>
		<div v-if="results" class="h-full overflow-y-auto border-t">
			<Stack v-if="results.length > 0" vertical>
				<Stack
					v-for="result in results"
					class="border-b font-serif p-4 hover:bg-gray-200/25 active:bg-gray-200/50"
					gap="2"
					:to="`/read/${findBookById(result.book)!.key}/${result.chapter}?verse=${result.verse}`"
					vertical
				>
					<div v-html="removeSupElement(result.content)" />
					<span class="text-sm text-gray !leading-relaxed">
						{{
							$t(`books.titles.${findBookById(result.book)!.key}`)
						}}
						{{ result.chapter }}:{{ result.verse }}
					</span>
				</Stack>
			</Stack>
			<Stack
				v-else
				class="h-full"
				items="center"
				justify="center"
				vertical
			>
				{{ $t('no-results-found') }}
			</Stack>
		</div>
	</Stack>
</template>
