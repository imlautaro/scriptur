<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])

watch(
	computed(() => props.modelValue),
	() => {
		useState('theme-color').value = props.modelValue ? '#404040' : '#ffffff'
	}
)
</script>

<template>
	<Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
		<div
			v-if="modelValue"
			@click="$emit('update:modelValue', false)"
			class="bg-black/75 duration-300 fixed top-0 left-0 w-full h-full z-20"
		/>
	</Transition>
	<Transition
		enter-from-class="lt-md:translate-y-full md:(scale-75 opacity-0)"
		leave-to-class="lt-md:translate-y-full md:(scale-75 opacity-0)"
	>
		<div
			v-if="modelValue"
			class="bg-white duration-300 fixed bottom-0 md:(bottom-auto top-1/2 -translate-y-1/2 max-w-md left-1/2 -translate-x-1/2 rounded-2xl) left-0 w-full rounded-t-3xl z-30 overflow-y-auto"
			style="max-height: 80vh"
		>
			<slot />
		</div>
	</Transition>
</template>
