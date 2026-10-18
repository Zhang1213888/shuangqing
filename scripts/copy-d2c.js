/**
 * 构建前步骤：将 d2c SPA 打包产物复制到 Next.js public/ 目录
 * 使 Next.js 在提供 API 的同时，也能直接托管前端静态页面
 */
const fs = require('fs');
const path = require('path');

const d2cDist = path.resolve(__dirname, '..', 'd2c', 'dist');
const publicDir = path.resolve(__dirname, '..', 'public');

if (!fs.existsSync(d2cDist)) {
  console.error('[copy-d2c] d2c/dist/ 不存在，请先运行 d2c 的构建');
  process.exit(1);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(d2cDist, publicDir);
console.log('[copy-d2c] d2c/dist/ → public/ 复制完成');