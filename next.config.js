/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/plans', destination: '/pricing', permanent: true },
    ];
  },
};

module.exports = nextConfig;
