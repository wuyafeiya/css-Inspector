# CSS Inspector 🎨

> 交互式 CSS 属性编辑器和可视化工具

一个功能强大的 CSS 学习和实验平台，集成了完整的 MDN CSS 数据库，提供实时预览和交互式编辑体验。

## ✨ 特性

### 📚 完整的 CSS 数据库
- **441** 个 CSS 属性
- **111** 个 CSS 选择器
- **17** 个 At-Rules (@media, @keyframes, @font-face 等)
- **30** 个单位 (px, em, rem, deg, s 等)
- **38** 个类型定义 (color, length, angle 等)
- **总计 637 项** CSS 数据

### 🎯 核心功能
- 🔍 **实时搜索** - 快速查找任何 CSS 属性、选择器或规则
- 📂 **14 个分类** - 布局、字体、颜色、动画等完整分类
- 🎨 **实时预览** - 即时查看 CSS 效果
- 🌗 **主题切换** - 浅色/暗色模式
- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🔗 **MDN 文档链接** - 每个属性都有 MDN 官方文档链接

### 🎪 交互体验
- 手风琴式分类导航
- 属性拖拽添加
- 可视化编辑器（颜色选择器、滑块、下拉框等）
- 多种预览元素（Box、Text、Button、Card）
- CSS 代码导出

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/wuyafeiya/css-Inspector.git
cd css-Inspector

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **数据源**: MDN CSS Data
- **样式**: CSS Variables (主题系统)
- **图标**: Font Awesome

## 📖 使用说明

### 1. 浏览属性库
左侧栏包含14个分类，点击即可展开查看详细内容：
- 布局 (54)
- 尺寸 (14)
- 字体 (64)
- 边框 (73)
- 动画 (16)
- 等等...

### 2. 添加 CSS 属性
点击任意属性卡片即可添加到样式面板进行编辑。

### 3. 实时编辑
在中间的样式面板中，使用可视化编辑器调整属性值：
- **颜色**: 颜色选择器
- **长度**: 滑块 + 数字输入
- **选项**: 下拉选择框

### 4. 预览效果
右侧预览面板实时显示 CSS 效果，可切换不同的预览元素。

### 5. 导出代码
查看生成的 CSS 代码，一键复制使用。

## 🎨 主题
支持浅色和暗色两种主题，点击右上角的主题切换按钮即可切换。

## 📂 项目结构

```
css-Inspector/
├── src/
│   ├── components/        # Vue 组件
│   │   ├── PropertyLibrary/  # 属性库组件
│   │   ├── StylePanel/        # 样式编辑面板
│   │   └── Preview/           # 预览组件
│   ├── composables/       # 组合式函数
│   │   ├── useCSSEditor.ts   # CSS 编辑器状态管理
│   │   └── useTheme.ts       # 主题管理
│   ├── data/              # CSS 数据
│   │   ├── cssData.ts        # 数据导出
│   │   └── processed-css-data.json
│   ├── styles/            # 全局样式
│   │   └── theme.css         # 主题变量
│   └── types/             # TypeScript 类型定义
├── scripts/               # 数据处理脚本
│   └── process-mdn-data.js   # MDN 数据处理
└── public/                # 静态资源
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [MDN Web Docs](https://developer.mozilla.org/) - 提供完整的 CSS 数据
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

**Made with ❤️ by [wuyafeiya](https://github.com/wuyafeiya)**

🤖 *Built with assistance from [Claude Code](https://claude.com/claude-code)*
