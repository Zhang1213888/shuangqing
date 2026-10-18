/** Next.js API 路由配置：使用 pages 风格 API */
module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return {
      fallback: [
        { source: '/:path*', destination: '/index.html' },
      ],
    };
  },
};