# 部署到Netlify指南

## 1. 创建GitHub仓库

由于GitHub API权限问题，请手动创建仓库：

1. 访问 https://github.com/new
2. 仓库名称：`web-mobile-app`
3. 描述：`一个包含网页和手机界面的大学信息管理应用，使用Next.js和React Native构建`
4. 设置为Public（公开）
5. **不要**初始化README、.gitignore或license
6. 点击"Create repository"

## 2. 推送代码到GitHub

创建仓库后，在本地终端执行以下命令（替换YOUR_USERNAME为你的GitHub用户名）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/web-mobile-app.git
git branch -M main
git push -u origin main
```

## 3. 连接到Netlify

1. 访问 https://app.netlify.com
2. 登录或创建账号
3. 点击"Add new site" → "Import an existing project"
4. 选择"GitHub"并授权
5. 选择刚创建的`web-mobile-app`仓库

## 4. 配置Netlify构建设置

在Netlify构建配置中设置：

- **Build command**: `npm run build`
- **Publish directory**: `.next`（或者留空，Netlify会自动识别Next.js）
- **Base directory**: （留空）

## 5. 设置环境变量

在Netlify的Site settings → Environment variables中添加以下变量：

从你的`.env.local`文件复制以下变量（如果没有.env.local，参考`env.example`）：

```
NEXT_PUBLIC_INSFORGE_URL=https://your-insforge-url.com
INSFORGE_API_KEY=your-api-key-here
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

**重要**：
- 不要提交`.env.local`文件到GitHub（已被.gitignore排除）
- 所有敏感信息必须通过Netlify环境变量配置
- 如果使用InsForge，需要确保API密钥有正确的权限

## 6. 部署

点击"Deploy site"，Netlify会自动：
1. 拉取GitHub上的代码
2. 运行`npm install`安装依赖
3. 运行`npm run build`构建项目
4. 部署到CDN

## 7. 测试部署

部署完成后：
1. 检查部署日志确保没有错误
2. 访问提供的Netlify URL测试网站
3. 测试所有功能：登录、添加大学、查看详情等

## 常见问题

### 构建失败
- 检查`package.json`中的scripts是否正确
- 确保所有依赖都在`package.json`中列出
- 查看Netlify构建日志获取详细错误信息

### API路由不工作
- 确保Next.js版本支持（使用的是Next.js 15.5.7）
- 检查`src/app/api/`目录结构是否正确

### 环境变量问题
- 确保在Netlify中正确设置了所有环境变量
- 检查变量名拼写是否与代码中使用的一致
- 需要重新部署才能使新环境变量生效

## 项目结构

```
├── src/                    # Next.js应用源码
│   ├── app/               # Next.js App Router
│   │   ├── api/          # API路由
│   │   ├── page.tsx      # 主页
│   │   └── ...          # 其他页面
│   ├── hooks/            # React Hooks
│   └── lib/              # 工具库
├── my-app/               # React Native移动应用
├── public/               # 静态资源
├── package.json          # 项目配置
├── next.config.ts        # Next.js配置
└── tsconfig.json         # TypeScript配置
```

## 技术栈

- **前端框架**: Next.js 15.5.7
- **UI库**: React 19.2.3
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **后端**: InsForge SDK
- **部署**: Netlify
