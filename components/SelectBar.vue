<script setup lang="ts">
const selectStore = useSelectStore()
const { isSupported, copy, copied } = useCopyBar()
const { colors } = useHighlights()
const user = useSupabaseUser()
</script>

<template>
	<Stack
		class="bg-white p-4 lt-lg:(border-t) lg:(fixed bottom-4 left-1/2 -translate-x-1/2 border-none rounded-2xl shadow-lg w-md)"
		gap="4"
		v-if="selectStore.selection.length"
		vertical
	>
		<Stack items="center" justify="between">
			<span class="text-lg font-medium ml-2">{{
				selectStore.label
			}}</span>
			<Button
				color="secondary"
				size="sm"
				v-if="isSupported"
				@click="copy()"
			>
				{{ copied ? $t('copy-copied') : $t('copy') }}
			</Button>
		</Stack>
		<Stack v-if="user" items="center" justify="between" gap="2">
			<IconButton
				@click="selectStore.unhighlightSelection()"
				icon="iconoir:cancel"
			/>
			<IconButton
				v-for="color in colors"
				@click="selectStore.highlightSelection(color)"
			>
				<div
					class="w-9 h-9 -m-0.75 rounded-full"
					:class="`bg-${color}-200`"
				/>
			</IconButton>
		</Stack>
	</Stack>
</template>
