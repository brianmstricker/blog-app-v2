/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  remotePatterns: [
   {
    hostname: "lh3.googleusercontent.com",
   },
   {
    hostname: "chirp-project.s3.amazonaws.com",
   },
   { hostname: "chirp-project.s3.us-east-1.amazonaws.com" },
   { hostname: "chirp-project.s3*" },
  ],
 },
};

module.exports = nextConfig;
