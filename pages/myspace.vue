<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const user = useSupabaseUser()
const supaAuth = useSupabaseClient().auth

const customizations = useCustomizationsStore()

const languageModal = ref(false)
const colorModal = ref(false)

const availableColors = [
	'rose',
	'amber',
	'green',
	'teal',
	'blue',
	'indigo',
	'purple',
	'pink',
]

// @ts-ignore
const currentLocale = computed(() =>
	// @ts-ignore
	locales.value.find(({ code }) => code === locale.value)
)
</script>

<template>
	<Stack class="bg-gray-50 h-full overflow-y-auto" vertical>
		<Container class="p-4" gap="4" max="sm" px="0" vertical>
			<ListCard v-if="user" title="You">
				<GhostButton
					class="px-4 py-4 text-left"
					gap="4"
					items="center"
					to="/highlights"
				>
					<Icon name="ph:highlighter-circle" />
					<span class="flex-1 w-full">{{ $t('highlights') }}</span>
					<Icon class="text-gray" name="iconoir:nav-arrow-right" />
				</GhostButton>
				<Stack
					class="px-4 py-4 text-left opacity-50"
					gap="4"
					items="center"
				>
					<Icon name="solar:notes-linear" />
					<span class="flex-1 w-full">{{ $t('notes') }}</span>
					<span
						class="text-xs uppercase text-gray tracking-widest font-medium"
					>
						{{ $t('coming-soon') }}
					</span>
				</Stack>
				<Stack
					class="px-4 py-4 text-left opacity-50"
					gap="4"
					items="center"
				>
					<Icon name="solar:bookmark-square-minimalistic-linear" />
					<span class="flex-1 w-full">{{ $t('bookmarks') }}</span>
					<span
						class="text-xs uppercase text-gray tracking-widest font-medium"
					>
						{{ $t('coming-soon') }}
					</span>
				</Stack>
			</ListCard>
			<ListCard v-else class="p-6" gap="6">
				<Stack gap="4" vertical>
					<span class="text-lg font-medium">
						{{ $t('using-app-as-a-guest') }}
					</span>
					<p class="flex-1 text-sm text-gray-600">
						{{ $t('using-app-as-a-guest-description') }}
					</p>
				</Stack>
				<Button block icon="solar:login-linear" to="/login" size="sm">
					{{ $t('auth.sign-in') }}
				</Button>
			</ListCard>
			<ListCard title="Customizations">
				<Stack class="px-4 py-4" gap="4" items="center">
					<Icon name="solar:filters-linear" />
					<span class="flex-1 w-full">Sepia</span>
					<SwitchButton v-model="customizations.sepia" />
				</Stack>
				<Stack class="px-4 py-4" gap="4" items="center">
					<Icon name="solar:text-square-linear" />
					<span class="flex-1 w-full">Serif</span>
					<SwitchButton v-model="customizations.serif" />
				</Stack>
				<GhostButton
					class="px-4 py-4 pr-6 text-left"
					gap="4"
					items="center"
					@click="colorModal = true"
				>
					<Icon name="solar:pallete-2-linear" />
					<span class="flex-1 w-full">Color</span>
				</GhostButton>
				<Stack class="px-4 py-4 opacity-50" gap="4" items="center">
					<Icon name="solar:moon-linear" />
					<span class="flex-1 w-full">{{ $t('dark-mode') }}</span>
					<span
						class="text-xs uppercase text-gray tracking-widest font-medium"
					>
						{{ $t('coming-soon') }}
					</span>
				</Stack>
			</ListCard>
			<ListCard title="More">
				<GhostButton
					class="px-4 py-4 pr-6 text-left"
					gap="4"
					items="center"
					@click="languageModal = true"
				>
					<Icon name="iconoir:translate" />
					<span class="flex-1 w-full">{{ $t('language') }}</span>
					<span class="text-sm text-gray" v-if="currentLocale?.name">
						{{ currentLocale.name }}
					</span>
				</GhostButton>
				<GhostButton
					v-if="user"
					class="px-4 py-4 text-left"
					gap="4"
					items="center"
					@click="supaAuth.signOut()"
				>
					<Icon name="solar:logout-linear" />
					<span class="flex-1 w-full">{{ $t('auth.sign-out') }}</span>
					<Icon class="text-gray" name="iconoir:nav-arrow-right" />
				</GhostButton>
			</ListCard>
		</Container>
		<Modal v-model="colorModal">
			<div class="grid grid-cols-4 gap-6 p-6">
				<Stack
					justify="center"
					v-for="item in availableColors"
					@click="customizations.primaryColor = item"
					component="button"
				>
					<div
						class="w-12 duration-150 h-12 rounded-full"
						:class="[
							customizations.primaryColor === item &&
								'ring-4 ring-offset-4 ring-black',
							`bg-${item}`,
						]"
					/>
				</Stack>
			</div>
		</Modal>
		<Modal v-model="languageModal">
			<Stack vertical>
				<template v-for="item in locales">
					<NuxtLink
						v-if="typeof item !== 'string'"
						:to="switchLocalePath(item.code)"
						class="flex p-4 space-x-4 duration-150 hover:bg-black/5 active:bg-black/10"
					>
						<Icon :name="`circle-flags:${item.code}`" />
						<span>
							{{ item.name }}
						</span>
					</NuxtLink>
				</template>
			</Stack>
		</Modal>
	</Stack>
</template>
