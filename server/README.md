# Wander Anyplace Backend Server

这是一个 Node.js 后端服务，用于处理 DeepSeek API 请求，安全地隐藏 API Key。

## 安装步骤

1. 进入 server 目录：
```bash
cd server
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
   - 复制 `.env.example` 为 `.env`
   - 编辑 `.env` 文件，添加你的 DeepSeek API Key：
```bash
cp .env.example .env
```

4. 编辑 `.env` 文件：
```
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here
```

## 启动服务器

```bash
npm start
```

服务器将在 http://localhost:3000 上运行。

## API 端点

### POST /api/packing-suggestions

请求体：
```json
{
  "destination": "beijing",
  "departureDate": "2026-05-15",
  "returnDate": "2026-05-20"
}
```

响应：
```json
{
  "success": true,
  "destination": { "name": "Beijing", "nameCN": "北京" },
  "season": "春季",
  "departureDate": "2026-05-15",
  "returnDate": "2026-05-20",
  "suggestions": {
    "weather": "平均温度15-25°C，早晚温差较大...",
    "clothing": ["长袖T恤 2-3件", "轻薄外套或风衣", ...],
    "essentials": ["雨伞或雨衣", "防晒霜", ...],
    "tips": "建议携带一件薄外套防止早晚温差..."
  }
}
```

## 支持的目的地

- beijing (北京)
- shanghai (上海)
- xian (西安)
- chengdu (成都)
- hangzhou (杭州)
- guilin (桂林)
- lijiang (丽江)
- zhangjiajie (张家界)

## 获取 DeepSeek API Key

访问 https://platform.deepseek.com/ 注册并获取 API Key。