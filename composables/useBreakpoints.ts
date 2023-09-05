import {
	useBreakpoints as _useBreakpoints,
	breakpointsTailwind,
} from '@vueuse/core'

export default () => {
	const breakpoints = _useBreakpoints(breakpointsTailwind)

	return breakpoints
}
