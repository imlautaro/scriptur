<script setup lang="ts">
defineProps<{
	label: string
	title: string
	right?: boolean
}>()
</script>

<template>
	<Button color="secondary" block>
		<template #content>
			<Stack class="w-full" :class="[right && 'text-right']" vertical>
				<span class="font-normal text-xs text-gray">
					{{ label }}
				</span>
				<span>
					{{ title }}
				</span>
			</Stack>
		</template>
	</Button>
</template>
