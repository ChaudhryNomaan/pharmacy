import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // Allows Capacitor to read your site as static files
  images: {
    unoptimized: true,   // Required because Next.js Image optimization needs a server
  },
};

export default nextConfig;