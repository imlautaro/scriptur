<script setup lang="ts">
definePageMeta({
	layout: 'auth',
	middleware: ['unauthenticated'],
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

const { t } = useI18n()

const register = async () => {
	emailError.value = ''
	passwordError.value = ''
	error.value = ''
	pending.value = true

	if (!validateEmail(email.value)) {
		emailError.value = t('auth.invalid-email')
		pending.value = false
		return
	}

	if (password.value.length < 6) {
		passwordError.value = t('auth.must-be-at-least-6-characters')
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
		error.value = t('auth.user-already-exists')
		return
	}

	info.value = t('auth.confirmation-email-sent')
}
</script>

<template>
	<Stack gap="6" vertical>
		<ContinueWithGoogle />
		<span class="text-center text-gray text-sm">{{ $t('auth.or') }}</span>
		<Stack @submit.prevent="register" component="form" gap="12" vertical>
			<Alert v-if="error" type="error">{{ error }}</Alert>
			<Alert v-if="info" type="info">{{ info }}</Alert>
			<TextField
				:label="$t('auth.email')"
				v-model="email"
				:error="emailError"
				type="email"
			/>
			<TextField
				:label="$t('auth.password')"
				type="password"
				v-model="password"
				:hint="$t('auth.must-be-at-least-6-characters')"
				:error="passwordError"
			/>
			<Stack gap="4" vertical>
				<Button
					type="submit"
					icon="solar:login-linear"
					block
					:pending="pending"
				>
					{{ $t('auth.register') }}
				</Button>
				<span class="text-center">
					{{ $t('auth.already-have-an-account') }}
					<NuxtLinkLocale
						class="font-medium text-primary"
						to="/login"
					>
						{{ $t('auth.login') }}
					</NuxtLinkLocale>
				</span>
			</Stack>
		</Stack>
	</Stack>
</template>
