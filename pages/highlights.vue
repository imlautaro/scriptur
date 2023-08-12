<script setup lang="ts">
definePageMeta({
	middleware: 'authenticated',
})
</script>

<template>
	<div class="bg-gray-50 h-full overflow-y-auto">
		<Container class="lg:py-12" gap="6" vertical px="0" max="sm">
			<PanelHighlights />
		</Container>
	</div>
</template>
