<script setup lang="ts">
definePageMeta({
	validate({ params: { book, chapter, verse } }) {
		if (
			typeof book !== 'string' ||
			typeof chapter !== 'string' ||
			typeof verse !== 'string'
		) {
			return false
		}

		const { books } = useBooks()

		if (!books.value.find(item => item.key === book)) {
			return false
		}

		if (isNaN(parseInt(chapter))) {
			return false
		}

		if (verse.length && isNaN(parseInt(verse))) {
			return false
		}

		return true
	},
})

const route = useRoute()
const { findBookById } = useBooks()
const versionStore = useVersionStore()
const lastVisited = useCookie('last-visited')
const currentBook = useCurrentBook()
const { t } = useI18n()

const { data, error, pending, refresh } = await useLazyAsyncData(async () => {
	const currentChapter =
		typeof route.params.chapter === 'string'
			? parseInt(route.params.chapter)
			: 1

	lastVisited.value = `${currentBook.key}/${currentChapter}`

	return await $fetch<{
		headings: {
			verse: number
			en: string
			es: string
		}[]
		verses: {
			book: number
			chapter: number
			verse: number
			content: string
		}[]
		version: {
			id: number
			acronym: string
			full_name: string
			language: string
		}
		next: { book: number; chapter: number } | null
		previous: { book: number; chapter: number } | null
		books: number
		chapters: never
	}>(`/api/${currentBook.id}/${currentChapter}`, {
		query: {
			version: versionStore.current.id,
			headingsLang: versionStore.current.language,
		},
	})
})

watch(
	computed(() => versionStore.current),
	() => refresh()
)

const bookTitle = t(`books.titles.${currentBook.key}`)

useHead(() => ({
	title: `${bookTitle} - ${t('chapter')} ${route.params.chapter}`,
}))

const title = `${bookTitle} ${route.params.chapter}`

const localePath = useLocalePath()

const next = computed(() => {
	if (data.value?.next) {
		const book = findBookById(data.value.next.book)
		if (book) {
			return {
				book: t(`books.titles.${book.key}`),
				chapter: data.value.next.chapter,
				path: localePath({
					name: 'read-book-chapter-verse',
					params: {
						book: book.key,
						chapter: data.value.next.chapter.toString(),
					},
				}),
			}
		}
	}
	return null
})

const previous = computed(() => {
	if (data.value?.previous) {
		const book = findBookById(data.value.previous.book)
		if (book) {
			return {
				book: t(`books.titles.${book.key}`),
				chapter: data.value.previous.chapter,
				path: localePath({
					name: 'read-book-chapter-verse',
					params: {
						book: book.key,
						chapter: data.value.previous.chapter.toString(),
					},
				}),
			}
		}
	}
	return null
})

const { scrollingElement, scrollEnd } = useScrollingFeatures()

const { fetchHighlightsForCurrentChapter } = useHighlights()

onMounted(async () => {
	fetchHighlightsForCurrentChapter()

	await nextTick()

	setTimeout(() => {
		if (route.params.verse) {
			const verseEl = document.getElementById(
				`verse-${route.params.verse}`
			)
			if (verseEl && scrollingElement.value) {
				scrollingElement.value.scrollTop = verseEl.offsetTop - 40
			}
		}
	}, 100)
})

const selectStore = useSelectStore()

const { el: selectRef } = useCopyBar()
</script>

<template>
	<Stack class="h-full w-full" vertical>
		<Stack
			v-if="pending"
			class="w-full h-full"
			items="center"
			justify="center"
		>
			<Icon name="svg-spinners:180-ring" />
		</Stack>
		<template v-else-if="data">
			<ScrollIndicator :title="title" />
			<div class="fixed hidden" ref="selectRef">
				<p
					v-for="item in selectStore.selection.sort(
						(a, b) => a.verse - b.verse
					)"
					v-html="
						`${replaceNumBySupChar(
							item.verse
						)}&nbsp;${removeSupElement(
							data.verses.find(i => i.verse === item.verse)
								?.content || ''
						)}%LINEBREAK%%LINEBREAK%`
					"
				/>
				<span>
					*{{ selectStore.label }} &middot;
					{{ data.version.acronym.toUpperCase() }}*
				</span>
			</div>
			<div
				class="flex-1 h-full overflow-y-auto duration-300"
				:class="[scrollEnd ? 'pb-0' : 'pb-18']"
				ref="scrollingElement"
				style="scroll-behavior: smooth"
			>
				<Stack vertical>
					<Stack
						class="select-text pt-24 pb-12 px-6"
						items="center"
						vertical
					>
						<Content
							:title="
								$t(`books.titles.${route.params.book}`) +
								` ${route.params.chapter}`
							"
							:verses="data.verses"
							:headings="data.headings"
						/>
					</Stack>
					<Stack class="pb-6 px-6" items="center" vertical>
						<div
							class="max-w-prose text-lg w-full gap-6 grid grid-cols-2"
						>
							<PageNavButton
								v-if="previous"
								class="col-start-1"
								:to="previous.path"
								:label="$t('previous')"
								:title="`${previous.book} ${previous.chapter}`"
							/>
							<PageNavButton
								v-if="next"
								class="col-start-2"
								:to="next.path"
								:label="$t('next')"
								:title="`${next.book} ${next.chapter}`"
								right
							/>
						</div>
					</Stack>
					<PageNavButtons
						:next="data.next"
						:previous="data.previous"
					/>
				</Stack>
			</div>
		</template>
		<Stack v-else-if="error">
			<Icon name="solar:cancel-circle-bold" />
			{{ error.message }}
		</Stack>
	</Stack>
</template>
