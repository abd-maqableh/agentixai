import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set turbopack root to current directory to avoid workspace root warning
  turbopack: {
    root: __dirname,
  },
  // Ensure TypeScript and ESLint run during builds
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
