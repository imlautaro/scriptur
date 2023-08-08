<script setup lang="ts">
const customizationsStore = useCustomizationsStore()
</script>

<template>
	<h2
		class="font-bold text-xl"
		:class="[customizationsStore.serif && 'font-serif']"
	>
		<slot />
	</h2>
</template>
