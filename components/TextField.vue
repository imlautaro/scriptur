<script setup lang="ts">
import { v4 as uuid } from 'uuid'

const id = uuid()

withDefaults(
	defineProps<{
		type?: string
		modelValue?: string
		label: string
		icon?: string
		hint?: string
		error?: string
		disabled?: boolean
		required?: boolean
	}>(),
	{ type: 'text' }
)

defineEmits(['update:modelValue'])

const show = ref(false)
</script>

<template>
	<Stack gap="2" vertical>
		<Stack class="text-sm" items="center" justify="between">
			<label class="text-gray" :for="id">
				{{ label }}<b v-if="required" class="text-red">&nbsp;*</b>
			</label>
			<slot name="corner-hint" />
		</Stack>
		<div class="bg-gray-100 relative rounded-lg">
			<Icon
				v-if="icon"
				class="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400 z-10"
				:name="icon"
			/>
			<input
				:id="id"
				class="bg-transparent p-4 duration-150 ring-primary focus:(ring-inset ring-2) relative rounded-lg w-full disabled:text-gray-400"
				:class="{ 'pl-14': icon, 'pr-14': type === 'password' }"
				:value="modelValue"
				:disabled="disabled"
				:required="required"
				@input="
					$emit(
						'update:modelValue',
						($event.target as HTMLInputElement).value
					)
				"
				:type="
					type === 'password' ? (show ? 'text' : 'password') : type
				"
				:placeholder="label"
			/>
			<div
				v-if="type === 'password'"
				@click.prevent="show = !show"
				class="flex p-2 -mx-2 absolute top-1/2 transform -translate-y-1/2 right-4 rounded-lg"
			>
				<Icon :name="show ? 'ph:eye' : 'ph:eye-slash'" />
			</div>
		</div>
		<span v-if="error" class="text-red text-xs">{{ error }}</span>
		<span v-else-if="hint" class="text-gray text-xs">{{ hint }}</span>
	</Stack>
</template>
