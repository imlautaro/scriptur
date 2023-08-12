<script setup lang="ts">
definePageMeta({
	layout: 'auth',
	middleware: ['unauthenticated'],
})

const supaAuth = useSupabaseClient().auth

const email = ref('')

const password = ref('')
const pending = ref(false)

const error = ref('')

const login = async () => {
	error.value = ''
	pending.value = true

	const { error: err } = await supaAuth.signInWithPassword({
		email: email.value,
		password: password.value,
	})

	pending.value = false

	if (err) {
		error.value = err.message
		return
	}

	return navigateTo('/read')
}
</script>

<template>
	<Stack gap="6" vertical>
		<ContinueWithGoogle />
		<span class="text-center text-gray text-sm">or</span>
		<Stack @submit.prevent="login" component="form" gap="12" vertical>
			<Alert v-if="error" type="error">{{ error }}</Alert>
			<TextField label="Email" v-model="email" type="email" />
			<TextField label="Password" type="password" v-model="password">
				<template #corner-hint>
					<NuxtLink
						class="text-primary text-xs font-medium"
						to="/recovery"
					>
						Did you forget your password?
					</NuxtLink>
				</template>
			</TextField>
			<Stack gap="4" vertical>
				<Button
					type="submit"
					icon="solar:login-linear"
					block
					:pending="pending"
				>
					Login
				</Button>
				<span class="text-center">
					Don't have an account?
					<NuxtLink class="font-medium text-primary" to="/register">
						Register
					</NuxtLink>
				</span>
			</Stack>
		</Stack>
	</Stack>
</template>
