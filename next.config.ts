import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["eight-pets-greet.loca.lt", "*.loca.lt"],
  images: {
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
