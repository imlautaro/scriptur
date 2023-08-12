export {}

declare global {
	interface Version {
		id: number
		acronym: string
		full_name: string
		language: string
	}

	type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple'
}
