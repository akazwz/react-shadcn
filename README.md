# React ShadCN

一个基于 React Router v7 和 shadcn/ui 构建的现代 React 应用模板。

## ✨ 特性

- 🚀 **React Router v7** - 最新的文件系统路由
- 🎨 **shadcn/ui** - 精美的 UI 组件库
- 🎯 **TypeScript** - 类型安全的开发体验
- 🌈 **Tailwind CSS v4** - 现代化的 CSS 框架
- 🌙 **主题切换** - 支持明暗主题
- 🌍 **国际化** - 支持中英文切换
- 📱 **响应式设计** - 适配桌面端和移动端
- 🗂️ **状态管理** - 使用 Zustand 进行状态管理
- 🎯 **代码规范** - 使用 Biome 进行代码格式化和检查

## 🛠️ 技术栈

### 前端框架
- [React 19](https://react.dev/) - UI 库
- [React Router v7](https://reactrouter.com/) - 路由管理
- [TypeScript](https://www.typescriptlang.org/) - 类型检查

### 样式和组件
- [Tailwind CSS v4](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Radix UI](https://www.radix-ui.com/) - 无头组件
- [Lucide React](https://lucide.dev/) - 图标库
- [React Icons](https://react-icons.github.io/react-icons/) - 图标集合

### 状态管理和工具
- [Zustand](https://zustand-demo.pmnd.rs/) - 状态管理
- [next-themes](https://github.com/pacocoursey/next-themes) - 主题管理
- [clsx](https://github.com/lukeed/clsx) - 条件类名工具

### 开发工具
- [Vite](https://vitejs.dev/) - 构建工具
- [Biome](https://biomejs.dev/) - 代码格式化和检查
- [pnpm](https://pnpm.io/) - 包管理器

## 📦 安装

确保你已经安装了 [Node.js](https://nodejs.org/) (建议 v18+) 和 [pnpm](https://pnpm.io/)。

```bash
# 克隆项目
git clone <your-repo-url>

# 进入项目目录
cd react-shadcn

# 安装依赖
pnpm install
```

## 🚀 运行

```bash
# 开发模式
pnpm dev

# 类型检查
pnpm typecheck

# 构建项目
pnpm build

# 启动生产服务器
pnpm start

# 代码格式化
pnpm format
```

## 📁 项目结构

```
react-shadcn/
├── app/                    # 应用源码
│   ├── components/         # 公共组件
│   │   ├── ui/            # shadcn/ui 组件
│   │   ├── theme-provider.tsx
│   │   └── page-title.tsx
│   ├── lib/               # 工具库
│   ├── locales/           # 国际化文件
│   │   ├── en.json        # 英文翻译
│   │   ├── zh.json        # 中文翻译
│   │   └── locale.ts      # 国际化配置
│   ├── routes/            # 页面路由
│   │   ├── home.tsx       # 首页
│   │   ├── images.tsx     # 图片页
│   │   ├── videos.tsx     # 视频页
│   │   ├── account.tsx    # 账户页
│   │   └── layout.tsx     # 布局组件
│   ├── stores/            # 状态管理
│   ├── app.css            # 全局样式
│   ├── root.tsx           # 根组件
│   └── routes.ts          # 路由配置
├── public/                # 静态资源
├── components.json        # shadcn/ui 配置
├── package.json           # 项目配置
├── react-router.config.ts # React Router 配置
├── tailwind.config.ts     # Tailwind 配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── biome.json            # Biome 配置
```

## 🎨 组件使用

项目使用 shadcn/ui 组件库，你可以通过以下命令添加新组件：

```bash
# 添加新的 UI 组件
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## 🌍 国际化

项目支持中英文切换，配置文件位于 `app/locales/` 目录：

- `en.json` - 英文翻译
- `zh.json` - 中文翻译
- `locale.ts` - 国际化逻辑

## 🎯 路由配置

项目使用 React Router v7 的文件系统路由，每个路由文件位于 `app/routes/` 目录下：

- `/` - 首页 (`home.tsx`)
- `/images` - 图片页面 (`images.tsx`) 
- `/videos` - 视频页面 (`videos.tsx`)
- `/account` - 账户页面 (`account.tsx`)

## 🌙 主题切换

项目支持明暗主题切换，使用 `next-themes` 实现。主题相关配置在 `app/components/theme-provider.tsx` 中。

## 📱 响应式设计

- **桌面端**: 侧边栏导航
- **移动端**: 底部导航栏
- 使用 Tailwind CSS 断点实现响应式布局

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
