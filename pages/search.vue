<script setup lang="ts">
definePageMeta({
	pageTransition: {
		name: 'fade',
		mode: 'in-out',
	},
	middleware(to, from) {
		// @ts-ignore
		if (to.name.startsWith('search___')) {
			if (
				// @ts-ignore
				from.name.startsWith('read-book-chapter___') ||
				// @ts-ignore
				from.name.startsWith('read-books___')
			) {
				// @ts-ignore
				from.meta.pageTransition.name = 'slide-left'
				// @ts-ignore
				to.meta.pageTransition.name = 'slide-left'
			}
			// @ts-ignore
			if (from.name.startsWith('myspace___')) {
				// @ts-ignore
				from.meta.pageTransition.name = 'slide-right'
				// @ts-ignore
				to.meta.pageTransition.name = 'slide-right'
			}
		}
	},
})
</script>

<template>
	<Stack class="h-full overflow-hidden absolute w-full" vertical>
		<Search />
	</Stack>
</template>
