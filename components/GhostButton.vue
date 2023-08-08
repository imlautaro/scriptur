<template>
	<Stack
		class="duration-150 hover:bg-black/5 active:bg-black/10"
		v-bind="{
			...(() =>
				!$attrs.component && !$attrs.to
					? { component: 'button' }
					: {})(),
		}"
	>
		<slot />
	</Stack>
</template>
