<script setup lang="ts">
const localePath = useLocalePath()
const lastVisitedCookie = useCookie('last-visited', {})

const lastVisited = computed(() => {
	return lastVisitedCookie.value?.split('/') || ['genesis', '1']
})

const route = useRoute()
const { scrollDirection } = useScrollingFeatures()

const show = computed(() => {
	if (routeName(route.name?.toString() || '') !== 'read-book-chapter-verse') {
		return true
	} else {
		return scrollDirection.value
	}
})
</script>

<template>
	<Transition name="bottom-navigation">
		<Stack
			v-if="show"
			class="bg-white border-t h-full max-h-18 duration-300"
			vertical
		>
			<Stack class="h-18">
				<BottomNavigationItem
					:label="$t('read')"
					icon="solar:book-bold-duotone"
					:to="
						localePath({
							name: 'read-book-chapter-verse',
							params: {
								book: lastVisited[0],
								chapter: lastVisited[1],
							},
						})
					"
					:active="
						$route.name
							?.toString()
							.startsWith('read-book-chapter-verse___')
					"
				/>
				<BottomNavigationItem
					:label="$t('books-title')"
					icon="solar:library-bold-duotone"
					:to="localePath({ name: 'read-books' })"
					:active="
						$route.name?.toString().startsWith('read-books___')
					"
				/>
				<BottomNavigationItem
					:label="`${$t('my')} ${$t('space')}`"
					icon="solar:widget-2-bold"
					:to="localePath({ name: 'myspace' })"
					:active="$route.name?.toString().startsWith('myspace___')"
				/>
			</Stack>
		</Stack>
	</Transition>
</template>

<style>
.bottom-navigation-enter-from,
.bottom-navigation-leave-to {
	@apply max-h-0;
}
</style>
