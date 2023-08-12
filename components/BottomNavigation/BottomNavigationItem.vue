<script setup lang="ts">
defineProps<{
	label: string
	icon: string
	active?: boolean
}>()

const customizationsStore = useCustomizationsStore()
</script>

<template>
	<Stack
		class="duration-300 flex-1 w-full group"
		:class="[
			active
				? customizationsStore.sepia
					? 'text-black'
					: 'text-primary-600'
				: customizationsStore.sepia
				? 'text-gray-400'
				: 'text-gray-600',
		]"
		gap="1"
		items="center"
		justify="center"
		vertical
		@contextmenu.prevent
	>
		<Stack
			class="duration-300 py-1 rounded-full"
			:class="[
				active
					? customizationsStore.sepia
						? 'bg-black/10 px-4'
						: 'bg-primary-600/10 dark:bg-primary-400/10 px-4'
					: 'px-1 group-active:(bg-black/5 px-4) dark:group-active:bg-white/5',
			]"
		>
			<Icon class="w-6 h-6" :name="icon" />
		</Stack>
		<span class="font-medium text-xs"> {{ label }} </span>
	</Stack>
</template>
