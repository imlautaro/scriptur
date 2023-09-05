<script setup lang="ts">
definePageMeta({
	pageTransition: {
		name: 'fade',
		mode: 'in-out',
	},
	middleware(to, from) {
		// @ts-ignore
		if (to.name.startsWith('myspace___')) {
			if (
				// @ts-ignore
				from.name.startsWith('read-books___') ||
				// @ts-ignore
				from.name.startsWith('read-book-chapter___')
			) {
				// @ts-ignore
				from.meta.pageTransition.name = 'slide-left'
				// @ts-ignore
				to.meta.pageTransition.name = 'slide-left'
			}
		}
	},
})
</script>

<template>
	<Stack class="bg-gray-50 h-full overflow-y-auto absolute w-full" vertical>
		<Container class="p-4" gap="4" max="sm" px="0" vertical>
			<Space />
		</Container>
	</Stack>
</template>
