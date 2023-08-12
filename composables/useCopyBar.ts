export default () => {
	const { copy: _copy, isSupported } = useClipboard()

	const el = useState<HTMLDivElement | undefined>(
		'copy-bar-el',
		() => undefined
	)

	const copied = useState('copied', () => false)

	watch(copied, value => {
		if (value) {
			setTimeout(() => {
				copied.value = false
			}, 3000)
		}
	})

	const getText = () => {
		if (!el.value) return ''
		return el.value.innerText.replaceAll('%LINEBREAK%', '\n')
	}

	const copy = () => {
		_copy(getText())
		copied.value = true
	}

	return { copy, isSupported, el, copied }
}
