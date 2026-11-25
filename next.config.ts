import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating "N" dev-tools button in development (errors still show).
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "emandee.in" },
      { protocol: "http", hostname: "emandee.in" },
    ],
  },
};

export default nextConfig;
