/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sitemap: {
    baseUrl: "https://next.biogengroupltd.com",
    autoLastmod: true,
    priority: 0.5,
    changefreq: "daily",
  },
};

module.exports = nextConfig;
