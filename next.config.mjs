/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer modern, smaller image formats when the browser supports them.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  }
};

export default nextConfig;
