import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["eight-pets-greet.loca.lt", "*.loca.lt"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 70, 75, 80, 85, 88, 90, 92, 95, 97],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3840],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
