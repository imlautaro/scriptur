<script setup lang="ts">
definePageMeta({
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

const bookTitle = t(`books.titles.${currentBook.key}`)

lastVisited.value = `${currentBook.key}/${route.params.chapter}`

const { data, error, pending } = await useLazyAsyncData(
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

useHead(() => ({
	title: `${bookTitle} - ${t('chapter')} ${route.params.chapter}`,
}))

onMounted(() => {
	fetchHighlightsForCurrentChapter()
})
</script>

<template>
	<Stack class="h-full w-full">
		<Loader v-if="pending" />
		<template v-else-if="data">
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
				class="flex-1 h-full overflow-y-auto duration-300"
				:class="[scrollEnd ? 'pb-0' : 'pb-18']"
				ref="scrollingElement"
				style="scroll-behavior: smooth"
			>
				<Stack vertical>
					<VersionSelector />
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
