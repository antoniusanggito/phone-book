// /** @type {import('next').NextConfig} */
// const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  // runtimeCaching,
  // buildExcludes: [/middleware-manifest.json$/],
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
