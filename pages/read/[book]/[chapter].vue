<script setup lang="ts">
definePageMeta({
	pageTransition: {
		name: 'fade',
		mode: 'in-out',
	},
	middleware(to, from) {
		// @ts-ignore
		if (to.name.startsWith('read-book-chapter___')) {
			// @ts-ignore
			if (from.name.startsWith('read-book-chapter___')) {
				// @ts-ignore
				to.meta.pageTransition.name =
					+to.params.chapter > +from.params.chapter
						? 'slide-left'
						: 'slide-right'
			}
			if (
				// @ts-ignore
				from.name.startsWith('read-books___') ||
				// @ts-ignore
				from.name.startsWith('search___') ||
				// @ts-ignore
				from.name.startsWith('myspace___')
			) {
				// @ts-ignore
				from.meta.pageTransition.name = 'slide-right'
				// @ts-ignore
				to.meta.pageTransition.name = 'slide-right'
			}
		}
	},
	validate({ params: { book, chapter } }) {
		if (typeof book !== 'string' || typeof chapter !== 'string') {
			return false
		}

		const { books } = useBooks()

		if (!books.value.find(item => item.key === book)) {
			return false
		}

		if (isNaN(parseInt(chapter))) {
			return false
		}

		return true
	},
})

const route = useRoute()
const versionStore = useVersionStore()
const selectStore = useSelectStore()
const lastVisited = useCookie('last-visited')
const currentBook = useCurrentBook()
const { t } = useI18n()
const { scrollingElement, scrollEnd } = useScrollingFeatures()
const { fetchHighlightsForCurrentChapter } = useHighlights()
const { findBookById } = useBooks()

const bookTitle = t(`books.titles.${currentBook.key}`)

lastVisited.value = `${currentBook.key}/${route.params.chapter}`

const { data, error, pending } = await useLazyAsyncData(
	`${currentBook.key}/${route.params.chapter}`,
	() => {
		return $fetch(`/api/${currentBook.id}/${route.params.chapter}`, {
			query: {
				version: versionStore.current.id,
				headingsLang: versionStore.current.language,
			},
		})
	},
	{
		watch: [computed(() => versionStore.current)],
	}
)

const { el: selectRef } = useCopyBar()

useHead(() => ({
	title: `${bookTitle} - ${t('chapter')} ${route.params.chapter}`,
}))

onMounted(() => {
	fetchHighlightsForCurrentChapter()
})

useGestures({
	swipeLeft() {
		if (data.value?.next) {
			return navigateTo(
				`/read/${findBookById(data.value.next.book)!.key}/${
					data.value.next.chapter
				}`
			)
		}
	},
	swipeRight() {
		if (data.value?.previous) {
			return navigateTo(
				`/read/${findBookById(data.value.previous.book)!.key}/${
					data.value.previous.chapter
				}`
			)
		}
	},
})

const showVersionsModal = useState('show-versions-modal')
</script>

<template>
	<Stack class="h-full w-full absolute">
		<Loader v-if="pending" />
		<template v-if="data">
			<ScrollIndicator :title="`${bookTitle} ${route.params.chapter}`" />
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
				class="flex-1 h-full overflow-y-auto duration-300 hide-scrollbar"
				:class="[scrollEnd ? 'pb-0' : 'pb-18']"
				ref="scrollingElement"
				style="scroll-behavior: smooth"
			>
				<div class="relative">
					<div
						@click="showVersionsModal = true"
						class="absolute top-6 right-6 bg-gray-200/25 rounded-full px-3 py-1.5 text-xs font-bold tracking-widest text-gray-600"
					>
						{{ versionStore.current.acronym.toUpperCase() }}
					</div>
				</div>
				<Stack vertical>
					<Stack
						class="select-text pt-24 pb-6 px-6"
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
							<Stack
								v-if="data.previous"
								class="col-start-1 bg-gray-200/25 hover:bg-gray-200/50 duration-150 p-4 rounded-2xl text-base"
								color="secondary"
								:to="`/read/${findBookById(data.previous.book)!.key}/${data.previous.chapter}`"
								block
							>
								<Stack class="w-full" vertical>
									<span class="font-normal text-xs text-gray">
										{{ $t('previous') }}
									</span>
									<span class="font-medium">
										{{
											$t(
												`books.titles.${
													findBookById(
														data.previous.book
													)!.key
												}`
											)
										}}
										{{ data.previous.chapter }}
									</span>
								</Stack>
							</Stack>
							<Stack
								v-if="data.next"
								color="secondary"
								class="col-start-2 bg-gray-200/25 hover:bg-gray-200/50 duration-150 p-4 rounded-2xl text-base"
								:to="`/read/${findBookById(data.next.book)!.key}/${data.next.chapter}`"
								block
							>
								<Stack class="text-right w-full" vertical>
									<span class="font-normal text-xs text-gray">
										{{ $t('next') }}
									</span>
									<span class="font-medium">
										{{
											$t(
												`books.titles.${
													findBookById(
														data.next.book
													)!.key
												}`
											)
										}}
										{{ data.next.chapter }}
									</span>
								</Stack>
							</Stack>
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
			{{ error.message }}
		</Stack>
	</Stack>
</template>
