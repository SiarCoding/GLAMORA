/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Keep dev compiles fast: import only the four icons the header/hero use.
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async redirects() {
    return [
      // Language roots → their entry page.
      { source: "/tr", destination: "/tr/abiye-hamburg", permanent: true },
      { source: "/ar", destination: "/ar/fasatin-sahra-hamburg", permanent: true },
      // Common guesses / old slugs.
      { source: "/abaya", destination: "/abaya-hamburg", permanent: true },
      { source: "/abendkleider", destination: "/abendkleider-hamburg", permanent: true },
      { source: "/kontakt", destination: "/termin", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Scroll frames and OG images rarely change — cache for 30 days.
        source: "/:dir(seiten|og|hero-sequence|showroom|atelier-sequence|abendkleider)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/:file(llms.txt|llms-full.txt)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
