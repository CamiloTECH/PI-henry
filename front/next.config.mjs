/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.pixabay.com" },
      { hostname: "i.blogs.es" },
      { hostname: "www.educaciontrespuntocero.com" },
      { hostname: "mac-center.com" },
    ],
  },
};

export default nextConfig;
