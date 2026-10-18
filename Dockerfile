# Stage 1: 构建 d2c 前端 SPA
FROM node:20-alpine AS d2c-builder
WORKDIR /app/d2c
COPY d2c/package*.json ./
RUN npm ci
COPY d2c/ ./
RUN npm run build

# Stage 2: 构建 Next.js 后端（含前端静态文件）
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
COPY --from=d2c-builder /app/d2c/dist ./public/
RUN npx next build

# Stage 3: 生产运行镜像
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]