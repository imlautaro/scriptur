<script setup lang="ts">
const showCustomizationsMenu = ref(false)
const user = useSupabaseUser()
const customizationsStore = useCustomizationsStore()
const localePath = useLocalePath()
</script>

<template>
	<Stack
		class="bg-white lt-sm:hidden px-4 h-full max-h-18 border-b z-30 duration-300"
		gap="6"
		justify="between"
		items="center"
	>
		<Stack class="lt-sm:hidden" gap="12" items="center">
			<Stack gap="2" items="center" to="/">
				<Stack class="p-0.5 rounded-full">
					<Icon class="text-2xl" name="solar:bookmark-circle-bold" />
				</Stack>
				<span class="font-bold text-xl">Scriptur</span>
				<span
					class="font-bold text-xs px-1.5 py-0.5 bg-red-200 text-red-950 rounded-md mb-auto mt-2"
					>Beta</span
				>
			</Stack>
			<Stack class="lt-md:hidden text-sm text-gray-600" gap="4"> </Stack>
		</Stack>
		<Stack class="lt-md:hidden text-sm" gap="4" items="center">
			<Button
				v-if="!user"
				icon="solar:login-linear"
				size="sm"
				color="secondary"
				:to="localePath({ name: 'login' })"
			>
				Login
			</Button>
			<Button
				v-if="!$route.name?.toString().startsWith('read-')"
				icon="solar:play-circle-bold"
				size="sm"
				:to="
					localePath({
						name: 'read-book-chapter-verse',
						params: { book: 'genesis', chapter: '1' },
					})
				"
			>
				Start reading
			</Button>
			<Button
				v-else-if="!user"
				icon="solar:user-bold"
				size="sm"
				:to="localePath({ name: 'register' })"
			>
				Create an account
			</Button>
		</Stack>
	</Stack>
</template>
