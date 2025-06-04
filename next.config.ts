import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Remove error ignoring to catch real issues
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
  
  // Note: Headers don't work with static export, handled by Netlify instead
  // Headers are configured in netlify.toml
};

export default nextConfig;
