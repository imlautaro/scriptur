<script setup lang="ts">
const props = defineProps<{
	book: number
	chapter: number
	verse: number
	color: HighlightColor
	content: string
}>()

const { findBookById } = useBooks()

const currentBook = computed(() => findBookById(props.book))

const customizations = useCustomizationsStore()

const htmlContent = computed(() => removeSupElement(props.content))
</script>

<template>
	<Stack class="bg-white border-b border-t" vertical>
		<Stack
			class="p-4 select-text border-l-4"
			:class="[`border-l-${color}-200 text-${color}-950`]"
			gap="2"
			vertical
		>
			<div
				class="verse-content leading-relaxed"
				:class="[customizations.serif && 'font-serif']"
				v-html="htmlContent"
			/>
			<span
				class="font-medium"
				:class="[customizations.serif && 'font-serif']"
			>
				{{ $t(`books.titles.${currentBook?.key}`) }} {{ chapter }}:{{
					verse
				}}
			</span>
		</Stack>
	</Stack>
</template>
