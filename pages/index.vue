<script setup lang="ts">
const user = useSupabaseUser()
const supaAuth = useSupabaseClient().auth
</script>

<template>
	<div>
		<h1>Hello world from Nuxt 3!</h1>
		<Button
			v-if="user"
			@click="supaAuth.signOut()"
			color="secondary"
			size="sm"
		>
			Logout
		</Button>
	</div>
</template>
