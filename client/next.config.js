/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't2.gstatic.com',
        port: '',
        pathname: '/licensed-image',
      },
      {
        protocol: 'http',
        hostname: 't2.gstatic.com',
        port: '',
        pathname: '/licensed-image',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = {
  env: {
    API_URL: (() => process.env.API_URL)(),
  },
};

module.exports = nextConfig;
