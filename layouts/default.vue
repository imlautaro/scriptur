<script setup lang="ts">
const { scrollingElement } = useScrollingFeatures()
const lastVisitedCookie = useCookie('last-visited', {})

const lastVisited = computed(() => {
	return `/read/${lastVisitedCookie.value || 'genesis/1'}`
})

const supaAuth = useSupabaseClient().auth
const user = useSupabaseUser()

const customizationsStore = useCustomizationsStore()

const showBooksPanel = ref(false)
const showMySpacePanel = ref(false)
const showHighlightsPanel = ref(false)

const selectStore = useSelectStore()

const route = useRoute()
watch(
	computed(() => route.path),
	() => {
		selectStore.clear()
	}
)
</script>

<template>
	<Stack
		class="fixed h-full w-full top-0 left-0 overflow-hidden"
		:class="[
			customizationsStore.sepia && 'brightness-75 sepia contrast-75',
		]"
		vertical
	>
		<!-- APP BAR -->
		<DesktopAppBar />
		<!-- HORIZONTAL CONTENT -->
		<Stack class="h-full flex-1 overflow-hidden relative">
			<!-- RAIL -->
			<Stack
				class="bg-white lt-lg:hidden border-r p-4"
				items="center"
				justify="between"
				vertical
			>
				<Stack gap="6" vertical>
					<IconButton
						@click="showBooksPanel = !showBooksPanel"
						icon="solar:library-bold-duotone"
						class="border-none"
					/>
					<IconButton
						@click="showMySpacePanel = !showMySpacePanel"
						icon="solar:widget-2-bold"
						class="border-none"
					/>
					<IconButton
						@click="showHighlightsPanel = !showHighlightsPanel"
						icon="ph:highlighter-circle"
						class="border-none"
					/>
				</Stack>
				<Stack v-if="user" items="center" vertical>
					<IconButton
						@click="supaAuth.signOut()"
						icon="solar:logout-linear"
					/>
				</Stack>
			</Stack>
			<Transition enter-from-class="!max-w-0" leave-to-class="!max-w-0">
				<div
					v-if="showBooksPanel"
					class="bg-white lt-2xl:hidden duration-300 max-w-sm w-full border-r"
				>
					<PanelBooks class="w-sm h-full" />
				</div>
			</Transition>
			<Transition enter-from-class="!max-w-0" leave-to-class="!max-w-0">
				<div
					v-if="showMySpacePanel"
					class="bg-white lt-2xl:hidden duration-300 max-w-sm w-full border-r"
				>
					<PanelSpace class="w-sm h-full p-3 border-r" />
				</div>
			</Transition>
			<Transition enter-from-class="!max-w-0" leave-to-class="!max-w-0">
				<div
					v-if="showHighlightsPanel"
					class="bg-white lt-2xl:hidden duration-300 max-w-sm w-full border-r"
				>
					<PanelHighlights class="w-sm h-full border-r" />
				</div>
			</Transition>
			<Stack
				class="bg-white flex-1 h-full relative overflow-hidden"
				vertical
			>
				<slot />
			</Stack>
		</Stack>
		<SelectBar />
		<BottomNavigation class="lg:hidden" />
	</Stack>
</template>
