/** @type {import('next').NextConfig} */
const nextConfig = {
eslint: {
    ignoreDuringBuilds: true,
    ignoreBuildErrors: true
  },
typescript: {
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true
  },
};

export default nextConfig;
