/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		domains: [
			'labian-farms.s3.ap-southeast-1.amazonaws.com',
			'unsplash.com'
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	reactStrictMode: true,
}