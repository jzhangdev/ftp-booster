import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GRAPH_API: process.env.GRAPH_API,
  },
};

export default nextConfig;
