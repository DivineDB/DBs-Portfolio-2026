import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["eight-pets-greet.loca.lt", "*.loca.lt"],
  images: {
    qualities: [75, 90, 92, 95, 97],
    deviceSizes: [640, 828, 1080, 1200, 1920, 2560, 3840],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
