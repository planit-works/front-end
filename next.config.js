/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*', //api request path
        destination: 'http://localhost:8000/:path*', //목적 path
      },
    ];
  },
};

module.exports = nextConfig;
