<script setup lang="ts">
const props = defineProps<{
	title: string
	verses: {
		book: number
		chapter: number
		verse: number
		content: string
	}[]
	headings: {
		verse: number
		en?: string
		es?: string
	}[]
}>()

const { titleElement } = useScrollingFeatures()

const customizations = useCustomizationsStore()
const version = useVersionStore()

const findHeading = (verse: number) => {
	const heading = props.headings.find(heading => heading.verse === verse)
	if (heading) {
		const current =
			heading[version.current.language as keyof typeof heading]

		if (typeof current === 'string') {
			return current
		} else {
			return heading.en
		}
	} else {
		return undefined
	}
}
</script>

<template>
	<Stack class="max-w-prose text-lg" gap="12" vertical>
		<h1
			class="font-bold text-4xl text-center"
			:class="[customizations.serif && 'font-serif']"
			ref="titleElement"
		>
			{{ title }}
		</h1>
		<Stack gap="4" vertical>
			<Verse
				v-for="item in verses"
				:verse="item.verse"
				:content="item.content"
				:heading="findHeading(item.verse)"
				:book="item.book"
				:chapter="item.chapter"
			/>
		</Stack>
	</Stack>
</template>
