import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.ragdev.com.mx',
        pathname: '/views_yea/uploads/products/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.rag.mx',
        pathname: '/views_yea/uploads/products/**',
      },
    ],
  },
};

export default nextConfig;
