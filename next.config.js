/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // styled-componentsの有効化
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
