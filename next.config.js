/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false, // Disable source maps in development
  
  // transpilePackages: ["@johanaarstein/dotlottie-player"],
  // concurrentFeatures: true,
  // optimizeFonts: false, // Disable font optimization
}

module.exports = nextConfig
