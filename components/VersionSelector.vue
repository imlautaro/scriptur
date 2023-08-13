<script setup lang="ts">
const versions = ref<Version[]>([])
const versionStore = useVersionStore()

onMounted(() => {
	versionStore.fetchAvailableVersions().then(data => {
		versions.value = data
	})
})
</script>

<template>
	<Stack vertical>
		<Stack
			v-for="version in versions"
			class="border-b last:border-b-0 pl-4 py-4 pr-6 hover:bg-gray-200/25 active:bg-gray-200/50 duration-150"
			items="center"
			justify="between"
			@click="versionStore.current = version"
		>
			<Stack vertical>
				<span class="font-medium">
					{{ version.acronym.toUpperCase() }}
				</span>
				<span class="text-xs text-gray">
					{{ version.full_name }}
				</span>
			</Stack>
			<span class="text-gray text-sm">
				{{ version.language.toUpperCase() }}
			</span>
		</Stack>
	</Stack>
</template>
