<script setup lang="ts">
definePageMeta({
	layout: 'empty',
})

const user = useSupabaseUser()
const localePath = useLocalePath()

watch(
	user,
	() => {
		if (user.value) {
			return navigateTo(
				localePath({
					name: 'read-book-chapter-verse',
					params: {
						book: 'genesis',
						chapter: '1',
					},
				})
			)
		}
	},
	{ immediate: true }
)
</script>

<template>
	<Stack
		class="fixed top-0 left-0 w-full h-full"
		items="center"
		justify="center"
	>
		<Icon name="svg-spinners:180-ring" />
	</Stack>
</template>
