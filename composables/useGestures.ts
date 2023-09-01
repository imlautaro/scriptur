export default (handlers: {
	swipeLeft: () => void
	swipeRight: () => void
}) => {
	const router = useRouter()

	const gesture = {
		startX: 0,
		endX: 0,
		startY: 0,
		endY: 0,
		startedAt: 0,
	}

	const handleTouchStart = (event: TouchEvent) => {
		if (event.touches.length) {
			const touch = event.touches[0]
			gesture.startX = touch.clientX
			gesture.startY = touch.clientY
			gesture.startedAt = Date.now()
		}
	}

	const handleTouchEnd = (event: TouchEvent) => {
		if (event.changedTouches.length) {
			const eventTime = Date.now()
			if (eventTime - gesture.startedAt < 500) {
				const touch = event.changedTouches[0]
				gesture.endX = touch.clientX
				gesture.endY = touch.clientY

				const x = gesture.startX - gesture.endX
				const y = Math.abs(gesture.startY - gesture.endY)

				if (y < 100) {
					if (x < -100) {
						handlers.swipeRight()
					} else if (x > 100) {
						handlers.swipeLeft()
					}
				}
			}
		}
	}

	watch(router.currentRoute, () => {
		document.body.removeEventListener('touchstart', handleTouchStart)
		document.body.removeEventListener('touchend', handleTouchEnd)
	})

	onMounted(() => {
		document.body.addEventListener('touchstart', handleTouchStart)
		document.body.addEventListener('touchend', handleTouchEnd)
	})
}
