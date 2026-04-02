import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Other experimental features if any
  },
  // @ts-ignore - Next.js 16/15 Turbopack root config
  turbopack: {
    root: process.cwd(), 
  },
};

export default nextConfig;
