export {}

declare global {
	interface Version {
		id: number
		acronym: string
		full_name: string
		language: string
	}

	type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple'

	interface Highlight {
		id: number
		created_at: string
		book: number
		chapter: number
		verse: number
		color?: HighlightColor
		user_id: string
		version_id: number
	}
}
