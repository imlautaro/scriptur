export default {
	preset: {
		transparent: {
			sizes: [64, 192, 512, 1024],
			favicons: [[64, 'favicon.ico']],
		},
		maskable: {
			padding: 0,
			sizes: [512, 1024],
		},
		apple: {
			sizes: [180],
		},
	},
	images: ['public/favicon.svg'],
}
