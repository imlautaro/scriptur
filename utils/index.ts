export function removeSupElement(input: string) {
	return input.replace(/<sup\b[^>]*>(.*?)<\/sup>/gi, '')
}

export function routeName(name: string) {
	return name.split('___')[0]
}
