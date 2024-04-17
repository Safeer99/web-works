/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  images: {
    domains: ["uploadthing.com", "utfs.io", "img.clerk.com", "subdomain"],
  },
  reactStrictMode: false,
};

export default nextConfig;
