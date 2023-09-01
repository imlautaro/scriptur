<script setup lang="ts">
const {
	scrollingElement,
	titleElement,
	scrollDirection: realScrollDirection,
	scrollEnd,
	scrollStart,
} = useScrollingFeatures()

const versionStore = useVersionStore()

defineProps<{ title?: string }>()

const show = ref(false)

const progress = ref<HTMLDivElement | null>(null)

const scrollDirection = ref(false)
const scrollTop = ref(0)
const scrollTop2 = ref(0)
const customizations = useCustomizationsStore()

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
					titleElement.value!.offsetTop // + titleElement.value!.clientHeight
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

const showVersionsModal = useState('show-versions-modal')
</script>

<template>
	<div
		:class="[show ? 'opacity-100' : 'opacity-0']"
		@click="showVersionsModal = true"
		class="bg-white duration-300 absolute top-0 left-0 h-8 w-full z-10"
	>
		<div
			:class="[show ? ' -translate-y-1/2' : ' -translate-y-0']"
			class="absolute top-1/2 duration-300 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium"
		>
			{{ title }} &middot;
			{{ versionStore.current.acronym.toUpperCase() }}
		</div>
		<div
			class="bg-gray-200 h-0.5 translate-y-full bottom-0 absolute w-full"
		>
			<div
				:class="`bg-${customizations.primaryColor}`"
				class="h-full w-0"
				ref="progress"
			/>
		</div>
	</div>
</template>
