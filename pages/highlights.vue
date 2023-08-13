<script setup>
definePageMeta({
	middleware: 'authenticated',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const versionStore = useVersionStore()

const { colors } = useHighlights()
const selectedColors = ref([])
const selectedBook = ref(null)
const { oldTestamentBooks, newTestamentBooks } = useBooks()

const fetchHighlights = () => {
	if (selectedColors.value.length) {
		if (selectedBook.value) {
			return supabase
				.from('highlights')
				.select('*')
				.eq('user_id', user.value.id)
				.eq('book', selectedBook.value)
				.in('color', selectedColors.value)
				.order('created_at', { ascending: false })
		} else {
			return supabase
				.from('highlights')
				.select('*')
				.eq('user_id', user.value.id)
				.in('color', selectedColors.value)
				.order('created_at', { ascending: false })
		}
	} else {
		if (selectedBook.value) {
			return supabase
				.from('highlights')
				.select('*')
				.eq('user_id', user.value.id)
				.eq('book', selectedBook.value)
				.order('created_at', { ascending: false })
		} else {
			return supabase
				.from('highlights')
				.select('*')
				.eq('user_id', user.value.id)
				.order('created_at', { ascending: false })
		}
	}
}

const { data, pending, execute, refresh, error } = useLazyAsyncData(
	async () => {
		if (!user.value) return null

		const { data: highlights, error } = await fetchHighlights()

		if (error) {
			throw error
		}

		try {
			const verses = await Promise.all(
				highlights.map(async highlight => {
					const { data, error } = await supabase
						.from('verses')
						.select('book, chapter, verse, content')
						.eq('version_id', versionStore.current.id)
						.eq('book', highlight.book)
						.eq('chapter', highlight.chapter)
						.eq('verse', highlight.verse)
						.limit(1)
						.single()

					if (error) {
						throw error
					}

					return { ...data, color: highlight.color }
				})
			)
			return verses
		} catch (err) {
			throw err
		}
	},
	{ immediate: false }
)

onMounted(() => {
	execute()
})

const showFilters = ref(false)
</script>

<template>
	<div class="bg-gray-50 h-full overflow-y-auto">
		<Container class="lg:py-12" gap="6" vertical px="0" max="sm">
			<Stack vertical>
				<Stack
					class="p-3 border-b bg-white"
					items="center"
					justify="between"
				>
					<h1 class="text-lg font-medium ml-2">
						{{ $t('highlights') }}
					</h1>
					<div class="relative">
						<IconButton
							@click="showFilters = !showFilters"
							icon="solar:sort-linear"
							class="border-none"
						/>
						<Transition
							enter-from-class="scale-0 opacity-0"
							leave-to-class="scale-0 opacity-0"
						>
							<div
								v-if="selectedColors.length || selectedBook"
								class="duration-150 w-2.5 h-2.5 absolute top-0.5 right-0.5 bg-primary ring-3 ring-primary/25 rounded-full"
							/>
						</Transition>
					</div>
				</Stack>
				<Stack v-if="showFilters" class="p-4 border-b" vertical>
					<select
						v-model="selectedBook"
						class="bg-white border px-2 py-2 rounded-lg"
					>
						<option selected :value="null">
							{{ $t('search-the-whole-bible') }}
						</option>
						<optgroup :label="$t('old') + ' ' + $t('testament')">
							<option
								v-for="book in oldTestamentBooks"
								:value="book.id"
							>
								{{ $t(`books.titles.${book.key}`) }}
							</option>
						</optgroup>
						<optgroup :label="$t('new') + ' ' + $t('testament')">
							<option
								v-for="book in newTestamentBooks"
								:value="book.id"
							>
								{{ $t(`books.titles.${book.key}`) }}
							</option>
						</optgroup>
					</select>
					<Stack class="py-4" gap="4">
						<Stack
							v-for="color in colors"
							class="h-10 w-10 rounded-lg w-full"
							:class="[`bg-${color}-200`]"
							component="button"
							@click="
								selectedColors.includes(color)
									? (selectedColors = selectedColors.filter(
											c => c !== color
									  ))
									: selectedColors.push(color)
							"
							items="center"
							justify="center"
						>
							<Icon
								v-if="selectedColors.includes(color)"
								:class="[`text-${color}-950`]"
								name="solar:check-circle-bold"
							/>
						</Stack>
					</Stack>
					<Button @click="refresh" :pending="pending" block>{{
						$t('apply')
					}}</Button>
				</Stack>
				<Loader v-if="pending" />
				<div v-else-if="error">{{ error }}</div>
				<Stack
					class="bg-gray-50 h-full overflow-y-auto py-4"
					v-else-if="data"
					gap="4"
					vertical
				>
					<VerseHighlighted
						v-for="item in data"
						:book="item.book"
						:chapter="item.chapter"
						:verse="item.verse"
						:content="item.content"
						:color="item.color"
					/>
				</Stack>
			</Stack>
		</Container>
	</div>
</template>
