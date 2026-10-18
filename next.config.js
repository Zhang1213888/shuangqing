/** Next.js API 路由配置：使用 pages 风格 API（src/app/api/*.ts 由 next.config 转换） */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        { source: '/:path*', destination: '/index.html' },
      ],
    };
  },
};