<script setup lang="ts">
const {
	scrollingElement,
	titleElement,
	scrollDirection: realScrollDirection,
	scrollEnd,
	scrollStart,
} = useScrollingFeatures()

defineProps<{ title?: string }>()

const show = ref(false)

const progress = ref<HTMLDivElement | null>(null)

const scrollDirection = ref(false)
const scrollTop = ref(0)
const scrollTop2 = ref(0)

onMounted(() => {
	if (scrollingElement.value) {
		scrollingElement.value.addEventListener('scroll', () => {
			if (!progress.value) {
				return
			}

			const newScrollTop = scrollingElement.value!.scrollTop
			const newDirection = newScrollTop < scrollTop.value

			if (newDirection !== scrollDirection.value) {
				scrollTop2.value = scrollingElement.value!.scrollTop
			}

			if (
				scrollDirection.value &&
				newScrollTop < scrollTop2.value - 256
			) {
				realScrollDirection.value = true
			} else if (
				!scrollDirection.value &&
				newScrollTop > scrollTop2.value + 256
			) {
				realScrollDirection.value = false
			}

			scrollDirection.value = newScrollTop < scrollTop.value

			scrollTop.value = newScrollTop

			if (titleElement.value) {
				if (
					scrollingElement.value!.scrollTop >
					titleElement.value!.offsetTop +
						titleElement.value!.clientHeight
				) {
					show.value = true
				} else {
					show.value = false
				}
			} else {
				show.value = true
			}

			const value =
				(100 /
					(scrollingElement.value!.scrollHeight -
						scrollingElement.value!.clientHeight)) *
				scrollingElement.value!.scrollTop

			scrollStart.value = Math.round(value) < 10
			scrollEnd.value = Math.round(value) > 90

			if (scrollStart.value || scrollEnd.value) {
				realScrollDirection.value = true
			}

			progress.value!.style.width = `${value}%`
		})
	}
})
</script>

<template>
	<div
		:class="[show ? 'opacity-100' : 'opacity-0']"
		class="bg-white dark:(bg-gray-900 border-gray-700) duration-300 border-b border-gray-200 absolute top-0 left-0 h-6 w-full z-10"
	>
		<div
			:class="[show ? ' -translate-y-1/2' : ' -translate-y-0']"
			class="absolute top-1/2 duration-300 left-1/2 -translate-x-1/2 text-xs text-secondary"
		>
			{{ title }}
		</div>
		<div class="bg-gray-100 dark:bg-gray-800 h-full w-0" ref="progress" />
	</div>
</template>
