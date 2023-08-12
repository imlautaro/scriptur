<script setup lang="ts">
const selected = reactive({
	book: null as null | {
		key: string
		id: string
	},
	chapter: null as null | number,
})

const versionStore = useVersionStore()
const localePath = useLocalePath()
const supabase = useSupabaseClient()
const customizations = useCustomizationsStore()

const {
	data: chapters,
	execute: fetchChapters,
	pending: pendingChapters,
} = useLazyAsyncData(
	async () => {
		if (!selected.book) return null

		const { data, error } = await supabase
			.from('verses')
			.select('chapter')
			.eq('version_id', versionStore.current.id)
			.eq('book', selected.book.id)
			.order('chapter', { ascending: false })
			.limit(1)
			.single()

		if (error) {
			throw error
		}

		return data.chapter
	},
	{ immediate: false }
)

const {
	data: verses,
	execute: fetchVerses,
	pending: pendingVerses,
} = useLazyAsyncData(async () => {
	if (!selected.book || !selected.chapter) return null

	const { data, error } = await supabase
		.from('verses')
		.select('verse')
		.eq('version_id', versionStore.current.id)
		.eq('book', selected.book.id)
		.eq('chapter', selected.chapter)
		.order('verse', { ascending: false })
		.limit(1)
		.single()

	if (error) {
		throw error
	}

	return data.verse
})

watch(
	computed(() => selected.book),
	book => {
		if (book) {
			fetchChapters()
		}
	}
)

watch(
	computed(() => selected.chapter),
	chapter => {
		if (chapter) {
			fetchVerses()
		}
	}
)

const route = useRoute()

watch(
	computed(() => route.path),
	() => {
		selected.chapter = null
		selected.book = null
	}
)

const showVersionsModal = ref(false)
watch(
	computed(() => versionStore.current),
	() => {
		showVersionsModal.value = false
	}
)
</script>

<template>
	<Stack vertical>
		<Stack class="p-3 border-b" gap="2" items="center">
			<template v-if="selected.chapter && selected.book">
				<IconButton
					icon="iconoir:nav-arrow-left"
					@click="selected.chapter = null"
					class="border-none"
				/>
				<Stack class="w-full flex-1" vertical>
					<span class="text-xs text-gray">{{ $t('verses') }}</span>
					<span class="font-medium">
						{{ $t(`books.titles.${selected.book.key}`) }}
						{{ selected.chapter }}
					</span>
				</Stack>
				<Button
					size="sm"
					:to="
						localePath({
							name: 'read-book-chapter-verse',
							params: {
								book: selected.book.key,
								chapter: selected.chapter.toString(),
							},
						})
					"
					>{{ $t('read') }} {{ $t('now') }}</Button
				>
			</template>
			<template v-else-if="selected.book">
				<IconButton
					icon="iconoir:nav-arrow-left"
					@click="selected.book = null"
					class="border-none"
				/>
				<Stack vertical>
					<span class="text-xs text-gray">{{ $t('chapters') }}</span>
					<span class="font-medium">
						{{ $t(`books.titles.${selected.book.key}`) }}
					</span>
				</Stack>
			</template>
			<template v-else>
				<span class="font-medium flex-1 w-full pl-2 text-lg">
					{{ $t('books-title') }}
				</span>
				<Stack gap="4">
					<IconButton
						:icon="
							customizations.showBooksAsGrid
								? 'solar:widget-linear'
								: 'solar:list-linear'
						"
						@click="
							customizations.showBooksAsGrid =
								!customizations.showBooksAsGrid
						"
						class="border-none"
					/>
				</Stack>
			</template>
		</Stack>
		<div class="h-full overflow-y-auto">
			<div v-if="selected.chapter && selected.book">
				<div class="grid grid-cols-4 gap-2 p-2">
					<Button
						v-for="(_, verse) in new Array(verses)"
						block
						color="secondary"
						:to="
							localePath({
								name: 'read-book-chapter-verse',
								params: {
									book: selected.book.key,
									chapter: selected.chapter.toString(),
									verse: (verse + 1).toString(),
								},
							})
						"
					>
						{{ verse + 1 }}
					</Button>
				</div>
			</div>
			<div v-else-if="selected.book">
				<div class="grid grid-cols-4 gap-2 p-2">
					<Button
						v-for="(_, chapter) in new Array(chapters)"
						block
						color="secondary"
						@click="selected.chapter = chapter + 1"
					>
						{{ chapter + 1 }}
					</Button>
				</div>
			</div>
			<div v-else class="pb-4">
				<Books @navigate-to-book="book => (selected.book = book)" />
			</div>
		</div>
		<GhostButton
			@click="showVersionsModal = true"
			class="px-4 py-3 text-left border-t"
			items="center"
		>
			<Stack class="w-full flex-1" vertical>
				<span class="text-xs text-gray">{{ $t('version') }}</span>
				<span class="font-medium">
					{{ versionStore.current.full_name }}
				</span>
			</Stack>
			<Icon class="text-gray" name="iconoir:nav-arrow-right" />
		</GhostButton>
		<Modal v-model="showVersionsModal">
			<VersionSelector />
		</Modal>
	</Stack>
</template>
