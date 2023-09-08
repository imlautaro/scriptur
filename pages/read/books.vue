<script setup lang="ts">
definePageMeta({
	pageTransition: {
		name: 'fade',
		mode: 'in-out',
	},
	middleware(to, from) {
		// @ts-ignore
		if (to.name.startsWith('read-books___')) {
			// @ts-ignore
			if (from.name.startsWith('read-book-chapter___')) {
				// @ts-ignore
				from.meta.pageTransition.name = 'slide-left'
				// @ts-ignore
				to.meta.pageTransition.name = 'slide-left'
			}
			if (
				// @ts-ignore
				from.name.startsWith('myspace___') ||
				// @ts-ignore
				from.name.startsWith('search___')
			) {
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
	<Books class="absolute" />
</template>
