<script setup lang="ts">
defineProps<{
	book: number
	chapter: number
	verse: number
	content: string
	heading?: string
}>()

const customizationsStore = useCustomizationsStore()
</script>

<template>
	<VerseHeading v-if="heading">
		{{ heading }}
	</VerseHeading>
	<div class="relative">
		<span
			class="absolute -left-1 -translate-x-full text-[0.5em] top-0 -translate-y-1 text-gray select-none"
			:class="[customizationsStore.serif && 'font-serif']"
		>
			{{ verse }}
		</span>
		<div
			class="leading-relaxed"
			:class="[customizationsStore.serif && 'font-serif']"
			v-html="removeSupElement(content)"
		/>
	</div>
</template>
