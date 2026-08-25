import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "emandee.in" },
      { protocol: "http", hostname: "emandee.in" },
    ],
  },
};

export default nextConfig;
