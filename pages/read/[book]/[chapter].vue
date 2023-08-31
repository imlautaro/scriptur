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
const { findBookById } = useBooks()

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

const { el: selectRef } = useCopyBar()

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
							<Button
								v-if="data.previous"
								class="col-start-1"
								color="secondary"
								:to="`/read/${findBookById(data.previous.book)!.key}/${data.previous.chapter}`"
								block
							>
								<template #content>
									<Stack class="w-full" vertical>
										<span
											class="font-normal text-xs text-gray"
										>
											{{ $t('previous') }}
										</span>
										<span>
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
								</template>
							</Button>
							<Button
								v-if="data.next"
								color="secondary"
								class="col-start-2"
								:to="`/read/${findBookById(data.next.book)!.key}/${data.next.chapter}`"
								block
							>
								<template #content>
									<Stack class="text-right w-full" vertical>
										<span
											class="font-normal text-xs text-gray"
										>
											{{ $t('next') }}
										</span>
										<span>
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
								</template>
							</Button>
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
