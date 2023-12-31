<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute()
const localePath = useLocalePath()
const { books } = useBooks()
const version = useVersionStore()
const customizations = useCustomizationsStore()

const selected = reactive({
	book: null as null | {
		key: string
		id: number
	},
	chapter: null as null | number,
})

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
			.eq('version_id', version.current.id)
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
		.eq('version_id', version.current.id)
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

watch(
	computed(() => route.path),
	() => {
		selected.chapter = null
		selected.book = null
	}
)

const showVersionsModal = useState('show-versions-modal')

watch(
	computed(() => version.current),
	() => {
		showVersionsModal.value = false
	}
)
</script>

<template>
	<Stack class="w-full h-full overflow-hidden" vertical>
		<Stack class="p-3 shadow" gap="2" items="center">
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
					:to="`/read/${selected.book.key}/${selected.chapter}`"
				>
					{{ $t('read') }} {{ $t('now') }}
				</Button>
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
			<div class="h-full" v-if="selected.chapter && selected.book">
				<Loader v-if="pendingVerses" />
				<div v-else class="grid grid-cols-4 gap-2 p-2">
					<NuxtLink
						v-for="(_, verse) in new Array(verses)"
						class="py-3 px-5 font-medium bg-gray-200/25 hover:bg-gray-200/50 duration-150 rounded-2xl w-full flex items-center justify-center text-center"
						:to="
							localePath({
								name: 'read-book-chapter',
								params: {
									book: selected.book.key,
									chapter: selected.chapter.toString(),
								},
								hash: `#verse-${verse + 1}`,
							})
						"
					>
						{{ verse + 1 }}
					</NuxtLink>
				</div>
			</div>
			<div class="h-full" v-else-if="selected.book">
				<Loader v-if="pendingChapters" />
				<div v-else class="grid grid-cols-4 gap-2 p-2">
					<Stack
						v-for="(_, chapter) in new Array(chapters)"
						class="rounded-2xl p-3 bg-gray-200/25 hover:bg-gray-200/50"
						items="center"
						justify="center"
						@click="selected.chapter = chapter + 1"
						component="button"
					>
						{{ chapter + 1 }}
					</Stack>
				</div>
			</div>
			<div v-else class="pb-4">
				<Stack v-for="key in ['old', 'new']" vertical>
					<span class="px-4 mb-2 mt-4 text-gray-500 text-sm">
						{{ `${$t(key)} ${$t('testament')}` }}
					</span>
					<div
						:class="[
							customizations.showBooksAsGrid
								? 'grid grid-cols-4 gap-2 px-2'
								: 'flex flex-col',
						]"
					>
						<Stack
							v-for="book in books.filter(
								b => b.newTestament === (key === 'new')
							)"
							:key="book.id"
							component="button"
							class="duration-150"
							:class="[
								customizations.showBooksAsGrid
									? 'rounded-2xl bg-gray-200/25 hover:bg-gray-200/50 p-3 items-center justify-center'
									: 'hover:bg-black/5 active:bg-black/10 px-4 py-3',
							]"
							@click="selected.book = book"
						>
							<span>
								{{
									customizations.showBooksAsGrid
										? $t(`books.abbrs.${book.key}`)
										: $t(`books.titles.${book.key}`)
								}}
							</span>
						</Stack>
					</div>
				</Stack>
			</div>
		</div>
		<Stack
			@click="showVersionsModal = true"
			class="px-4 py-3 text-left rounded-2xl bg-gray-200/25 hover:bg-gray-200/50 mx-2 my-2"
			component="button"
			items="center"
		>
			<Stack class="w-full flex-1" vertical>
				<span class="text-xs text-gray">{{ $t('version') }}</span>
				<span class="font-medium">
					{{ version.current.full_name }}
				</span>
			</Stack>
			<Icon class="text-gray" name="iconoir:nav-arrow-right" />
		</Stack>
	</Stack>
</template>
