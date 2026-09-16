/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Keep dev compiles fast: import only the four icons the header/hero use.
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
