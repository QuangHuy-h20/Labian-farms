/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["storage.cloud.google.com"],
    loader: "imgix",
    path: "https://storage.cloud.google.com/labian_farms/",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
};
