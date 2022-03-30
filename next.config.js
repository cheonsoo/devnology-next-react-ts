/** @type {import('next').NextConfig} */
const path = require('path');
// const withSass = require('@zeit/next-sass');

const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: "raw-loader"
      }
    );

    config.resolve.fallback = {
      fs: false,
      crypto: false
    };

    return config;
  }
  ,
  images: {
    domains: [
      'cafeptthumb-phinf.pstatic.net',
      'media.bunjang.co.kr',
      'dnvefa72aowie.cloudfront.net',
    ]
  }
}

module.exports = nextConfig;
