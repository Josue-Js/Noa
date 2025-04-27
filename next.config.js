/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    domains: ['image.tmdb.org']
  }
}

module.exports = nextConfig
