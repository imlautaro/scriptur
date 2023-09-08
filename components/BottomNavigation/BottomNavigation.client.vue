<script setup lang="ts">
const breakpointsStore = useBreakpointsStore()

const lastVisited = useLastVisited()
const { scrollDirection } = useScrollingFeatures()
const route = useRoute()
const show = computed(() => {
	if (route.name?.toString().startsWith('read-book-chapter__')) {
		if (!scrollDirection.value) {
			return false
		}
	}
	return true
})
</script>

<template>
	<Transition name="bottom-navigation">
		<Stack
			v-if="show"
			class="bg-white border-gray-100 md:hidden h-full max-h-18 duration-300 z-10"
			:style="
				$route.name?.toString().startsWith('read-books___')
					? ''
					: 'box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.05)'
			"
			vertical
		>
			<Container class="h-18" max="sm" px="0">
				<BottomNavigationItem
					:label="$t('read')"
					icon="solar:book-bold-duotone"
					:to="`/read/${lastVisited.book}/${lastVisited.chapter}`"
					:active="
						$route.name
							?.toString()
							.startsWith('read-book-chapter___')
					"
				/>
				<BottomNavigationItem
					:label="$t('books-title')"
					icon="solar:library-bold-duotone"
					to="/read/books"
					:active="
						$route.name?.toString().startsWith('read-books___')
					"
				/>
				<BottomNavigationItem
					:label="$t('search')"
					icon="lucide:search"
					to="/search"
					:active="$route.name?.toString().startsWith('search___')"
				/>
				<BottomNavigationItem
					:label="`${$t('my')} ${$t('space')}`"
					icon="solar:widget-2-bold"
					to="/myspace"
					:active="$route.name?.toString().startsWith('myspace___')"
				/>
			</Container>
		</Stack>
	</Transition>
</template>

<style>
.bottom-navigation-enter-from,
.bottom-navigation-leave-to {
	@apply max-h-0;
}
</style>
