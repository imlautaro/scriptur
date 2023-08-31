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
		class="duration-300 flex-1 group"
		:class="[
			active
				? customizations.sepia
					? 'text-black'
					: `text-${customizations.primaryColor}-600`
				: customizations.sepia
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
					? customizations.sepia
						? 'bg-black/10 px-4'
						: `bg-${customizations.primaryColor}-600/10 px-4`
					: 'px-1 group-active:(bg-black/5 px-4)',
			]"
		>
			<Icon class="h-6 w-6" :name="icon" />
		</Stack>
		<span class="font-medium text-xs" v-text="label" />
	</Stack>
</template>
