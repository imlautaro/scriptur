<script setup lang="ts">
defineProps<{
	title?: string
}>()
</script>

<template>
	<Stack class="bg-white rounded-2xl border overflow-hidden" vertical>
		<span v-if="title" class="pt-3 px-5 text-sm text-gray">
			{{ title }}
		</span>
		<slot />
	</Stack>
</template>
