<script setup lang="ts">
useState('theme-color').value = '#ffffff'
</script>

<template>
	<div>
		<Head>
			<Link rel="icon" href="/favicon.ico" sizes="any" />
			<Link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			<Link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
		</Head>
		<VitePwaManifest />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.25s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
}
</style>
