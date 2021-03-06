const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  experimental: {
    scrollRestoration: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config){
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod? 'production' : 'development',
      devtool: prod? 'hidden-source-map' : 'eval',
    }
  }
});