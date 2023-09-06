<script setup lang="ts">
useHead({
	meta: [
		{
			name: 'theme-color',
			content: '#ffffff',
		},
	],
})
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.25s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
}
</style>
