/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cloudinary-2-s3.s3.amazonaws.com" },
      { protocol: "https", hostname: "cloudinary2.s3.amazonaws.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
    ],
  },
};

module.exports = nextConfig;
