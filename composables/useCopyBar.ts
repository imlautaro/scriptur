export default () => {
	const { copy: _copy, isSupported } = useClipboard()
	const selectStore = useSelectStore()

	const el = useState<HTMLDivElement | undefined>(
		'copy-bar-el',
		() => undefined
	)

	const getText = () => {
		if (!el.value) return ''
		return el.value.innerText.replaceAll('%LINEBREAK%', '\n')
	}

	const copy = () => {
		_copy(getText())
		selectStore.clear()
	}

	return { copy, isSupported, el }
}
