<script setup lang="ts">
definePageMeta({
	layout: 'auth',
	middleware: ['unauthenticated'],
})

const supaAuth = useSupabaseClient().auth

const email = ref('')

const pending = ref(false)

const error = ref('')

const info = ref('')

const {
	public: { baseURL },
} = useRuntimeConfig()

const { t } = useI18n()

const sendRecoveryEmail = async () => {
	error.value = ''
	pending.value = true

	const { error: err } = await supaAuth.resetPasswordForEmail(email.value, {
		redirectTo: `${baseURL}/redirect`,
	})

	pending.value = false

	if (err) {
		error.value = err.message
		return
	}

	info.value = t('auth.email-sent')
}
</script>

<template>
	<Stack
		@submit.prevent="sendRecoveryEmail"
		component="form"
		gap="12"
		vertical
	>
		<Alert v-if="error" type="error">{{ error }}</Alert>
		<Alert v-if="info" type="info">{{ info }}</Alert>
		<TextField :label="$t('auth.email')" v-model="email" type="email" />
		<Stack gap="4" vertical>
			<Button
				type="submit"
				icon="solar:plain-linear"
				block
				:pending="pending"
			>
				{{ $t('auth.send-me-a-recovery-email') }}
			</Button>
			<span class="text-center">
				{{ $t('auth.did-you-remember-your-password') }}
				<NuxtLinkLocale class="font-medium text-primary" to="/login">
					{{ $t('auth.login') }}
				</NuxtLinkLocale>
			</span>
		</Stack>
	</Stack>
</template>
