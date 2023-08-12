export function removeSupElement(input: string) {
	return input.replace(/<sup\b[^>]*>(.*?)<\/sup>/gi, '')
}

export function routeName(name: string) {
	return name.split('___')[0]
}

export function replaceNumBySupChar(num: number) {
	const nums = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']
	return num
		.toString()
		.split('')
		.map(i => {
			return nums[parseInt(i)]
		})
		.join('')
}
