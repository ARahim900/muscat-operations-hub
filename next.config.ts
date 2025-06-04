import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Remove static export - let Netlify handle it with their runtime
  // output: 'export',
  
  images: {
    // Remove unoptimized for better performance with Netlify
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Enable TypeScript and ESLint checking
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },
  
  // Optimize for production
  poweredByHeader: false,
  
  // Environment variables for build
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || '',
  },
};

export default nextConfig;
