import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'], // Add your image hostname here
  },
};

export default nextConfig;
