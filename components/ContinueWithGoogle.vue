<script setup lang="ts">
const supaAuth = useSupabaseClient().auth
const {
	public: { baseURL },
} = useRuntimeConfig()

const login = () => {
	supaAuth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${baseURL}/redirect`,
		},
	})
}
</script>

<template>
	<Button block icon="logos:google-icon" color="secondary" @click="login">
		{{ $t('auth.continue-with') }} Google
	</Button>
</template>
