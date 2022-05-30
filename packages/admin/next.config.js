/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		domains: [
			'labian-farms.s3.ap-southeast-1.amazonaws.com',
			'unsplash.com'
		],
	},

	webpack(config, options) {
		config.module.rules.push({
		  test: /\.ya?ml$/,
		  type: "json",
		  use: "yaml-loader",
		});
	
		return config;
	  },
	typescript: {
		ignoreBuildErrors: true,
	},
	reactStrictMode: true,
}