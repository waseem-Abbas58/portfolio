import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are pre-optimized to right-sized WebP by scripts/optimize-images.mjs,
  // so the runtime optimizer isn't needed (faster, and works on any static host).
  images: { unoptimized: true },
};

export default nextConfig;
