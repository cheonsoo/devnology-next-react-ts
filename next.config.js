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
    return config;
  }
  // ,
  // images: {
  //   loader: 'imgix',
  //   domains: ['media.bunjang.co.kr']
  // }
}

module.exports = nextConfig;
