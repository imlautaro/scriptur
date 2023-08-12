<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		icon?: string
		size?: 'sm' | 'md' | 'lg'
		block?: boolean
		pending?: boolean
		color?: 'primary' | 'secondary'
	}>(),
	{
		size: 'md',
		color: 'primary',
	}
)

const slots = useSlots()

const buildClasses = computed(() => {
	const classes: string[] = []

	if (!slots.default && props.icon) {
		classes.push('rounded-full')
	} else {
		classes.push('rounded-lg')
	}

	if (!props.pending) {
		classes.push('group')
	}

	if (props.block) {
		classes.push('w-full')
	} else {
		classes.push('w-min')
	}

	switch (props.color) {
		case 'secondary':
			classes.push(
				'bg-white border shadow-sm focus-visible:border-gray-300 ring-gray-200/50'
			)
			break
		case 'primary':
		default:
			classes.push('!bg-black text-white ring-black/25')
	}

	switch (props.size) {
		case 'sm':
			classes.push('text-sm')
			break
		case 'lg':
			classes.push('text-lg')
			break
		case 'md':
		default:
			classes.push('text-base')
	}

	return classes
})

const overlayClasses = computed(() => {
	switch (props.color) {
		case 'secondary':
			return 'group-hover:bg-gray-200/25 group-active:bg-gray-200/50'
		case 'primary':
		default:
			return 'group-hover:bg-white/10 group-active:bg-white/25'
	}
})

const padding = computed(() => {
	const classes: string[] = []

	if (!slots.default && props.icon) {
		classes.push('p-2')
	} else {
		switch (props.size) {
			case 'sm':
				if (props.icon) {
					classes.push('pl-3')
				}
				classes.push('px-3.5 py-2.5 space-x-2.5')
				break
			case 'lg':
				if (props.icon) {
					classes.push('pl-5')
				}
				classes.push('px-6 py-4 space-x-4')
				break
			case 'md':
			default:
				if (props.icon) {
					classes.push('pl-4')
				}
				classes.push('px-5 py-3 space-x-3')
		}
	}

	return classes
})

const iconClasses = computed(() => {
	const classes: string[] = []

	if (props.color === 'secondary') {
		classes.push('text-gray')
	}

	switch (props.size) {
		case 'sm':
			classes.push('text-xs')
			break
		default:
			classes.push('text-base')
	}

	return classes
})
</script>

<template>
	<Stack
		:class="buildClasses"
		class="cursor-pointer font-medium overflow-hidden rounded-lg focus-visible:ring-4 duration-150 relative whitespace-nowrap"
		:disabled="pending"
		v-bind="{
			...(() =>
				!$attrs.component && !$attrs.to
					? { component: 'button' }
					: {})(),
		}"
	>
		<div
			:class="overlayClasses"
			class="absolute duration-150 h-full left-0 top-0 w-full"
		/>
		<Stack
			class="duration-300 relative w-full"
			:class="[...padding, pending && 'opacity-0 translate-y-1/2']"
			items="center"
			justify="center"
		>
			<Icon v-if="icon" :name="icon" :class="iconClasses" />
			<span v-if="$slots.default">
				<slot />
			</span>
			<slot name="content" />
		</Stack>
		<Transition name="loader">
			<Icon
				v-if="pending"
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				name="svg-spinners:bars-rotate-fade"
			/>
		</Transition>
	</Stack>
</template>

<style>
.loader-enter-active,
.loader-leave-active {
	@apply duration-300;
}
.loader-enter-from,
.loader-leave-to {
	@apply -translate-y-full opacity-0;
}
</style>
