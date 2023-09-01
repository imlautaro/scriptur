<script setup lang="ts">
defineProps<{
	next: {
		book: number
		chapter: number
	} | null
	previous: {
		book: number
		chapter: number
	} | null
}>()

const { scrollDirection, scrollEnd } = useScrollingFeatures()
const { findBookById } = useBooks()

const show = computed(() => scrollDirection.value && !scrollEnd.value)
</script>

<template>
	<Stack
		class="absolute bottom-0 left-0 z-10 lg:(bottom-auto top-1/2 -translate-y-1/2) lt-sm:hidden w-full p-6 pointer-events-none"
		items="center"
		justify="between"
	>
		<Transition name="pop">
			<Button
				v-if="previous && show"
				:to="`/read/${findBookById(previous.book)!.key}/${previous.chapter}`"
				icon="solar:alt-arrow-left-linear"
				color="secondary"
				class="pointer-events-auto"
			/>
		</Transition>
		<div class="flex-1 w-full" />
		<Transition name="pop">
			<Button
				v-if="next && show"
				:to="`/read/${findBookById(next.book)!.key}/${next.chapter}`"
				icon="solar:alt-arrow-right-linear"
				color="secondary"
				class="pointer-events-auto"
			/>
		</Transition>
	</Stack>
</template>

<style>
.pop-enter-from,
.pop-leave-to {
	@apply scale-0;
}
</style>
