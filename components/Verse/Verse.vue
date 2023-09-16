<script setup lang="ts">
const props = defineProps<{
	book: number
	chapter: number
	verse: number
	content: string
	heading?: string
	hasComments?: boolean
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
		return `<mark class="bg-${isHighlighted.value.color}-200 text-${isHighlighted.value.color}-950">${content}</mark>`
	} else {
		return content
	}
})

const showComments = ref(false)

const comments = ref<{
	book: number
	chapter: number
	verse: number
	content: string
}>()

watch(showComments, async value => {
	if (value) {
		if (props.hasComments) {
			if (!comments.value) {
				comments.value = await $fetch(
					`/api/${props.book}/${props.chapter}/${props.verse}/commentary`
				)
			}
		} else {
			showComments.value = false
		}
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
		<LazyModal v-model="showComments">
			<Stack class="px-6" vertical>
				<div
					v-if="comments"
					class="prose max-w-none"
					:class="[customizationsStore.serif && 'font-serif']"
					v-html="comments.content"
				/>
				<Loader class="my-6" v-else />
			</Stack>
		</LazyModal>
		<div class="absolute -left-2 -top-1 select-none">
			<Stack
				class="w-6 h-6 -mx-3"
				component="button"
				items="center"
				justify="center"
				@contextmenu="showComments = true"
			>
				<span
					class="text-[0.5em]"
					:class="[
						customizationsStore.serif && 'font-serif',
						hasComments
							? `text-${customizationsStore.primaryColor}-600 font-bold`
							: 'text-gray',
					]"
				>
					{{ verse }}
				</span>
			</Stack>
		</div>
		<div
			class="leading-relaxed"
			:class="[
				customizationsStore.serif && 'font-serif',
				selectStore.isSelected(book, chapter, verse)
					? 'underline underline-dotted underline-offset-7 underline-gray-300 animate-head-shake animate-duration-500 text-gray-900'
					: 'text-gray-800',
				selectMode && 'select-none',
			]"
			v-html="htmlContent"
		/>
	</div>
</template>
