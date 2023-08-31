<script setup lang="ts">
const lastVisited = useLastVisited()
const { scrollDirection, scrollStart, scrollEnd } = useScrollingFeatures()
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
			class="bg-white border-t h-full max-h-18 duration-300"
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
