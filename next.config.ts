import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the WordPress URLs (/about/, /contact/ …) unchanged.
  trailingSlash: true,
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
