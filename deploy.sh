#!/bin/bash
set -e

echo "========== 双擎易学系统 一键部署 =========="

# 1. 安装 Docker（如未安装）
if ! command -v docker &> /dev/null; then
  echo "[1/4] 安装 Docker..."
  curl -fsSL https://get.docker.com | sh
  systemctl start docker
  systemctl enable docker
else
  echo "[1/4] Docker 已安装,跳过"
fi

# 2. 克隆/更新代码
if [ -d "shuangqing" ]; then
  echo "[2/4] 更新代码..."
  cd shuangqing && git pull && cd ..
else
  echo "[2/4] 克隆代码..."
  git clone https://github.com/Zhang1213888/shuangqing.git
fi

# 3. 配置密钥
cd shuangqing
if [ ! -f .env ]; then
  echo "[3/4] 请输入 DeepSeek API Key:"
  read -r API_KEY
  echo "DEEPSEEK_API_KEY=$API_KEY" > .env
  echo "已保存到 .env"
else
  echo "[3/4] .env 已存在,跳过"
fi

# 4. 启动服务
echo "[4/4] 构建并启动服务..."
docker compose up -d --build

echo ""
echo "========== 部署完成 =========="
echo "访问地址: http://$(curl -s ifconfig.me)"
echo "查看日志: docker compose logs -f"
echo "停止服务: docker compose down"