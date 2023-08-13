<script setup lang="ts">
const user = useSupabaseUser()
const localePath = useLocalePath()
const lastVisited = useLastVisited()

watch(
	user,
	() => {
		if (user.value) {
			return navigateTo(
				localePath({
					name: 'read-book-chapter',
					params: {
						book: lastVisited.book,
						chapter: lastVisited.chapter,
					},
				})
			)
		}
	},
	{ immediate: true }
)
</script>

<template>
	<div>Waiting for login...</div>
</template>
