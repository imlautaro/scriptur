<script setup lang="ts">
const breakpoints = useBreakpoints()
const showBooksPanel = ref(false)
const showMyspacePanel = ref(false)

const toggleShowBooksPanel = () => {
	if (showBooksPanel.value) {
		showBooksPanel.value = false
		return
	} else if (showMyspacePanel.value) {
		showMyspacePanel.value = false
	}
	showBooksPanel.value = true
}

const toggleMyspacePanel = () => {
	if (showMyspacePanel.value) {
		showMyspacePanel.value = false
		return
	} else if (showBooksPanel.value) {
		showBooksPanel.value = false
	}
	showMyspacePanel.value = true
}

const customizations = useCustomizationsStore()
</script>

<template>
	<Stack
		v-if="breakpoints.greaterOrEqual('md').value"
		class="z-20 relative shadow"
	>
		<Stack class="bg-white text-sm" justify="between" vertical>
			<Stack vertical>
				<BrandIsotype
					class="m-5"
					:class="`text-${customizations.primaryColor}-600`"
				/>
				<NavigationRailItem
					@click="toggleShowBooksPanel"
					:label="$t('books-title')"
					:active="showBooksPanel"
					icon="solar:library-bold-duotone"
				/>
				<NavigationRailItem
					@click="toggleMyspacePanel"
					:label="$t('space')"
					:active="showMyspacePanel"
					icon="solar:widget-2-bold"
				/>
			</Stack>
		</Stack>
		<Transition name="panel">
			<Stack
				v-if="showBooksPanel"
				class="bg-white max-w-sm w-sm overflow-hidden h-full"
				:class="[
					breakpoints.greater('xl').value
						? 'relative'
						: 'absolute left-full',
				]"
			>
				<div class="min-w-sm">
					<Books />
				</div>
			</Stack>
		</Transition>
		<Transition name="panel">
			<Stack
				v-if="showMyspacePanel"
				class="bg-white max-w-sm w-sm overflow-hidden h-full"
				:class="[
					breakpoints.greater('xl').value
						? 'relative'
						: 'absolute left-full',
				]"
			>
				<div class="min-w-sm p-4">
					<Space />
				</div>
			</Stack>
		</Transition>
	</Stack>
</template>

<style>
.panel-enter-active,
.panel-leave-active {
	@apply duration-500;
}
.panel-enter-from,
.panel-leave-to {
	@apply max-w-0;
}
</style>
