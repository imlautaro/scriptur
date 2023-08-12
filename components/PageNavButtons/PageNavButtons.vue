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
const selectStore = useSelectStore()
const localePath = useLocalePath()
</script>

<template>
	<Stack
		class="absolute bottom-0 left-0 z-10 lg:(bottom-auto top-1/2 -translate-y-1/2) w-full p-6 pointer-events-none"
		items="center"
		justify="between"
	>
		<Transition name="pop">
			<Button
				v-if="
					previous &&
					scrollDirection &&
					!scrollEnd &&
					!selectStore.selection.length
				"
				:to="localePath({
					name: 'read-book-chapter-verse',
					params: {
						book: findBookById(previous.book)!.key,
						chapter: previous.chapter.toString()
					}
				})"
				icon="solar:alt-arrow-left-linear"
				color="secondary"
			/>
		</Transition>
		<Transition name="pop">
			<Button
				v-if="
					next &&
					scrollDirection &&
					!scrollEnd &&
					!selectStore.selection.length
				"
				:to="localePath({
					name: 'read-book-chapter-verse',
					params: {
						book: findBookById(next.book)!.key,
						chapter: next.chapter.toString()
					}
				})"
				icon="solar:alt-arrow-right-linear"
				color="secondary"
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
