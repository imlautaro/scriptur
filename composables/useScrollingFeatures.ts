export default () => {
	const scrollingElement = useState<HTMLDivElement | undefined>(
		'scrolling-element',
		() => undefined
	)
	const titleElement = useState<HTMLHeadingElement | undefined>(
		'title-element',
		() => undefined
	)

	const scrollDirection = useState('scroll-direction', () => true)
	const scrollStart = useState('scroll-start', () => false)
	const scrollEnd = useState('scroll-end', () => false)

	return {
		scrollingElement,
		titleElement,
		scrollDirection,
		scrollStart,
		scrollEnd,
	}
}
