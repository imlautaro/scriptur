<script setup lang="ts">
defineProps<{
	label: string
	icon: string
	active?: boolean
}>()

const customizations = useCustomizationsStore()
</script>

<template>
	<Stack
		class="px-3 py-2 rounded-2xl border-transparent border-2 duration-150 m-2"
		:class="[
			active
				? `text-${customizations.primaryColor}-600 bg-${customizations.primaryColor}-600/10`
				: 'text-gray-700',
		]"
		items="center"
		gap="1"
		component="button"
		vertical
	>
		<Icon class="h-6 w-6" :name="icon" />
		<span class="font-medium text-xs"> {{ label }} </span>
	</Stack>
</template>
