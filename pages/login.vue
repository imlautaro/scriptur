<script setup lang="ts">
definePageMeta({
	layout: 'auth',
	middleware: ['unauthenticated'],
})

const supaAuth = useSupabaseClient().auth

const localePath = useLocalePath()

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

	return navigateTo(
		localePath({
			name: 'read-book-chapter-verse',
			params: { book: 'genesis', chapter: '1' },
		})
	)
}
</script>

<template>
	<Stack gap="6" vertical>
		<ContinueWithGoogle />
		<span class="text-center text-gray text-sm">{{ $t('auth.or') }}</span>
		<Stack @submit.prevent="login" component="form" gap="12" vertical>
			<Alert v-if="error" type="error">{{ error }}</Alert>
			<TextField :label="$t('auth.email')" v-model="email" type="email" />
			<TextField
				:label="$t('auth.password')"
				type="password"
				v-model="password"
			>
				<template #corner-hint>
					<NuxtLink
						class="text-primary text-xs font-medium"
						:to="localePath({ name: 'recovery' })"
					>
						{{ $t('auth.did-you-forget-your-password') }}
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
					{{ $t('auth.login') }}
				</Button>
				<span class="text-center">
					{{ $t('auth.dont-have-an-account') }}
					<NuxtLink
						class="font-medium text-primary"
						:to="localePath({ name: 'register' })"
					>
						{{ $t('auth.sign-up') }}
					</NuxtLink>
				</span>
			</Stack>
		</Stack>
	</Stack>
</template>
