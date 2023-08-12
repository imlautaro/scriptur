<script setup lang="ts">
const props = defineProps<{
	book: number
	chapter: number
	verse: number
	content: string
	heading?: string
}>()

const customizationsStore = useCustomizationsStore()

const selectStore = useSelectStore()
const selectMode = computed(() => !!selectStore.selection.length)
const { highlightsForCurrentChapter } = useHighlights()

const isHighlighted = computed(() => {
	return highlightsForCurrentChapter.value.find(
		highlight =>
			highlight.book === props.book &&
			highlight.chapter === props.chapter &&
			highlight.verse === props.verse
	)
})

const htmlContent = computed(() => {
	const content = removeSupElement(props.content)
	if (isHighlighted.value) {
		return `<mark>${content}</mark>`
	} else {
		return content
	}
})
</script>

<template>
	<VerseHeading v-if="heading">
		{{ heading }}
	</VerseHeading>
	<div
		@click.prevent="
			selectMode && selectStore.toggleSelection(book, chapter, verse)
		"
		@dblclick.prevent="selectStore.toggleSelection(book, chapter, verse)"
		class="relative"
		:id="`verse-${verse}`"
	>
		<span
			class="absolute -left-1 -translate-x-full text-[0.5em] top-0 -translate-y-1 text-gray select-none"
			:class="[customizationsStore.serif && 'font-serif']"
		>
			{{ verse }}
		</span>
		<div
			class="verse-content leading-relaxed"
			:class="[
				customizationsStore.serif && 'font-serif',
				selectStore.isSelected(book, chapter, verse)
					? 'underline underline-dotted underline-offset-7 underline-gray-300 animate-head-shake animate-duration-500 text-gray-900'
					: 'text-gray-700',
				selectMode && 'select-none',
				isHighlighted &&
					`bg-${isHighlighted.color || 'yellow'}-200 text-${
						isHighlighted.color || 'yellow'
					}-950`,
			]"
			v-html="htmlContent"
		/>
	</div>
</template>
