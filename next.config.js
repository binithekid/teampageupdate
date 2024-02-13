/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false, // Disable source maps in development

  // Add images configuration
  images: {
    domains: ["images.ctfassets.net"], // Configure allowed domains for images
  },

  // transpilePackages: ["@johanaarstein/dotlottie-player"],
  // concurrentFeatures: true,
  // optimizeFonts: false, // Disable font optimization
};

module.exports = nextConfig;
