/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // @see https://www.apollographql.com/docs/react/integrations/webpack/
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
  swcMinify: true,
  // styled-componentsの有効化
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
