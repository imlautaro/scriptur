<script setup lang="ts">
defineProps<{
	icon?: string
	white?: boolean
}>()
</script>

<template>
	<Stack
		class="duration-150 border p-2 rounded-full"
		:class="[
			white
				? 'hover:bg-white/5 active:bg-white/10'
				: 'hover:bg-black/5 active:bg-black/10',
		]"
		v-bind="{
			...(() =>
				!$attrs.component && !$attrs.to
					? { component: 'button' }
					: {})(),
		}"
	>
		<Icon v-if="!$slots.default && icon" :name="icon" />
		<slot />
	</Stack>
</template>
