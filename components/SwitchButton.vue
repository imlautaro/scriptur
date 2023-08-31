<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])

const customizationsStore = useCustomizationsStore()
</script>

<template>
	<button
		@click="$emit('update:modelValue', !modelValue)"
		class="duration-300 rounded-full h-8 w-14 relative"
		:class="[
			modelValue
				? customizationsStore.sepia
					? 'bg-black'
					: `bg-${customizationsStore.primaryColor}`
				: 'bg-gray-200',
		]"
	>
		<div
			class="duration-150 w-6 h-6 rounded-full bg-white shadow absolute top-1 left-1"
			:class="[modelValue ? 'translate-x-6' : 'translate-x-0']"
		/>
	</button>
</template>
