import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  reactStrictMode: true,
  // Avoid picking parent monorepo lockfile as turbopack root
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
