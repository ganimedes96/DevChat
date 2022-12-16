/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://avatars.githubusercontent.com/u/59948274?v=4',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
}

module.exports = nextConfig
