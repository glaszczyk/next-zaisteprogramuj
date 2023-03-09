/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum/photos', "fakestoreapi.com"],
    deviceSizes: [300, 640, 960, 1080],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
