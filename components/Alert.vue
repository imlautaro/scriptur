<script setup lang="ts">
const props = withDefaults(
	defineProps<{ type?: 'warning' | 'error' | 'success' | 'info' }>(),
	{ type: 'warning' }
)

const color = computed(() => {
	const classes: string[] = []

	switch (props.type) {
		case 'error':
			classes.push('text-red-600 bg-red-600/10')
			break
		case 'info':
			classes.push('text-sky-600 bg-sky-600/10')
			break
		case 'success':
			classes.push('text-green-600 bg-green-600/10')
			break
		case 'warning':
		default:
			classes.push('text-orange-600 bg-orange-600/10')
			break
	}

	return classes
})

const icon = computed(() => {
	switch (props.type) {
		case 'error':
			return 'solar:close-circle-bold'
		case 'info':
			return 'solar:info-circle-bold'
		case 'success':
			return 'solar:check-circle-bold'
		case 'warning':
		default:
			return 'solar:danger-circle-bold'
	}
})
</script>

<template>
	<Stack class="p-5 rounded-lg" :class="[...color]" items="center" gap="3">
		<ClientOnly>
			<Icon :name="icon" />
			<template #fallback>
				<div class="w-6 h-6" />
			</template>
		</ClientOnly>
		<p class="flex-1">
			<slot />
		</p>
	</Stack>
</template>
