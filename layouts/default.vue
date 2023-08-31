<script setup lang="ts">
const route = useRoute()

const customizations = useCustomizationsStore()
const select = useSelectStore()
const version = useVersionStore()

watch(
	computed(() => route.path),
	select.clear
)

const showVersionsModal = useState('show-versions-modal', () => false)

watch(
	computed(() => version.current),
	() => (showVersionsModal.value = false)
)
</script>

<template>
	<Stack
		class="fixed h-full w-full top-0 left-0 overflow-hidden"
		:class="[customizations.sepia && 'brightness-75 sepia contrast-75']"
		vertical
	>
		<Stack class="h-full flex-1 overflow-hidden relative">
			<Stack
				class="bg-white flex-1 h-full relative overflow-hidden"
				vertical
			>
				<slot />
			</Stack>
		</Stack>
		<SelectBar />
		<BottomNavigation />
		<Modal v-model="showVersionsModal">
			<VersionSelector />
		</Modal>
	</Stack>
</template>
