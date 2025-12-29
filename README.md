# CEMS 交换院校指南

这是一个基于 Next.js 和 InsForge 云数据库构建的 CEMS 交换院校指南应用。

## 功能特性

- 📱 响应式设计，支持桌面和移动设备
- 🌍 按地区浏览交换院校信息
- 🏫 详细的院校信息展示
- 🗄️ 使用 InsForge 云数据库存储数据
- ⚡ 快速加载和流畅的用户体验

## 技术栈

- **前端框架**: Next.js 15
- **样式**: Tailwind CSS
- **数据库**: InsForge (PostgreSQL)
- **部署**: InsForge 云端

## 项目结构

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # 主页面组件
│   │   └── globals.css       # 全局样式
│   └── lib/
│       └── insforge-client.ts # InsForge 客户端配置
├── scripts/
│   └── seed-data.js         # 数据库种子数据脚本
├── create-tables.sql         # 数据库表结构
└── my-app/                  # 原始 React Native 应用
```

## 数据库设计

### 地区表 (regions)
- `id`: 地区唯一标识
- `name`: 地区名称
- `latitude`: 纬度
- `longitude`: 经度

### 大学表 (universities)
- `id`: 大学唯一标识
- `region_id`: 所属地区ID
- `name`: 大学名称
- `location`: 位置
- 其他详细信息字段...

## 快速开始

1. 安装依赖
```bash
npm install
```

2. 配置环境变量
```bash
cp env.example .env.local
# 编辑 .env.local 文件，填入 InsForge 配置
```

3. 构建应用
```bash
npm run build
```

4. 启动开发服务器
```bash
npm run dev
```

## 数据库操作

### 创建表结构
```bash
# 使用 InsForge MCP 工具执行 create-tables.sql
```

### 导入种子数据
```bash
npm run seed
```

## 部署

应用已部署到 InsForge 云端，可以通过以下地址访问：

[应用访问地址](https://zd8jv2d5.us-east.insforge.app)

## 开发说明

### 数据获取
应用使用 REST API 方式从 InsForge 数据库获取数据：

```javascript
const response = await fetch(`${process.env.NEXT_PUBLIC_INSFORGE_BASE_URL}/rest/v1/regions`, {
  headers: {
    'apikey': process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY,
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY}`
  }
});
```

### 样式系统
使用 Tailwind CSS 构建响应式界面，包含自定义的动画和交互效果。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 许可证

MIT License
