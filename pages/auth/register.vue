<script setup lang="ts">
definePageMeta({
	layout: 'auth',
	middleware: ['unauthenticated'],
	path: '/register',
})

const supaAuth = useSupabaseClient().auth

const email = ref('')
const emailError = ref('')

const password = ref('')
const passwordError = ref('')

const pending = ref(false)

const error = ref('')
const info = ref('')

const {
	public: { baseURL },
} = useRuntimeConfig()

const register = async () => {
	emailError.value = ''
	passwordError.value = ''
	error.value = ''
	pending.value = true

	if (!validateEmail(email.value)) {
		emailError.value = 'Invalid email'
		pending.value = false
		return
	}

	if (password.value.length < 6) {
		passwordError.value = 'Must be at least 6 characters'
		pending.value = false
		return
	}

	const { error: err, data } = await supaAuth.signUp({
		email: email.value,
		password: password.value,
		options: {
			emailRedirectTo: `${baseURL}/redirect`,
		},
	})

	pending.value = false

	if (err) {
		error.value = err.message
		return
	}

	console.log(data)

	if (data.user?.confirmed_at) {
		error.value = 'User already exists'
		return
	}

	info.value = 'Confirmation email sent'
}
</script>

<template>
	<Stack gap="6" vertical>
		<ContinueWithGoogle />
		<span class="text-center text-gray text-sm">or</span>
		<Stack @submit.prevent="register" component="form" gap="12" vertical>
			<Alert v-if="error" type="error">{{ error }}</Alert>
			<Alert v-if="info" type="info">{{ info }}</Alert>
			<TextField
				label="Email"
				v-model="email"
				:error="emailError"
				type="email"
			/>
			<TextField
				label="Password"
				type="password"
				v-model="password"
				hint="Must be at least 6 characters"
				:error="passwordError"
			/>
			<Stack gap="4" vertical>
				<Button
					type="submit"
					icon="solar:login-linear"
					block
					:pending="pending"
				>
					Register
				</Button>
				<span class="text-center">
					Already have an account?
					<NuxtLink class="font-medium text-primary" to="/login">
						Login
					</NuxtLink>
				</span>
			</Stack>
		</Stack>
	</Stack>
</template>
