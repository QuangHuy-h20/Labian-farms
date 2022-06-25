/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["storage.googleapis.com", "storage.cloud.google.com"],
    minimumCacheTTL: 1500000,
    formats: ["image/avif", "image/webp"],
    // loader: "imgix",
    // path: "https://storage.cloud.google.com/labian_farms/",
  },
  compiler: {
    removeConsole: false,
  },
  swcMinify: true,

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
};
