// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // bonus: for when you swap to Unsplash
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
