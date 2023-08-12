<script setup lang="ts">
const { books } = useBooks()
const customizations = useCustomizationsStore()

const emit = defineEmits(['navigate-to-book'])

const showBooksAsGrid = computed(() => customizations.showBooksAsGrid)
</script>

<template>
	<Stack v-for="key in ['old', 'new']" vertical>
		<span class="px-4 mb-2 mt-4 text-gray-500 text-sm">
			{{ `${$t(key)} ${$t('testament')}` }}
		</span>
		<div
			:class="[
				showBooksAsGrid
					? 'grid grid-cols-4 gap-2 px-2'
					: 'flex flex-col',
			]"
		>
			<Stack
				v-for="book in books.filter(
					b => b.newTestament === (key === 'new')
				)"
				:key="book.id"
				class="duration-150"
				:class="[
					showBooksAsGrid
						? 'border rounded-lg hover:bg-gray-200/25 active:bg-gray-200/50 p-3 items-center justify-center'
						: 'hover:bg-black/5 active:bg-black/10 px-4 py-3',
				]"
				@click="emit('navigate-to-book', book)"
			>
				<span>
					{{
						showBooksAsGrid
							? $t(`books.abbrs.${book.key}`)
							: $t(`books.titles.${book.key}`)
					}}
				</span>
			</Stack>
		</div>
	</Stack>
</template>
