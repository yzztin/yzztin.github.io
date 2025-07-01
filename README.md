## 使用 vue3 重写的 fengye 主题
主要目的是学习 vue3 编程，用到的技术：
- vue3 + TypeScript  组合式 api
- vue router  路由管理
- Tailwind CSS  样式框架
- Pinia  状态管理
- pnpm  依赖管理

### 项目结构
  ```
  ├── src
  │   ├── App.vue         # 入口组件
  │   ├── assets          # 文章文件等资源
  │   ├── components      # 具体的组件
  │   ├── composables     # 可组合函数
  │   ├── main.ts         # 入口代码
  │   ├── plugins         # 工具插件等
  │   ├── router          # 路由配置
  │   ├── stores          # 状态管理
  │   ├── styles          # css 样式
  │   ├── types           # ts 类型定义
  │   ├── views           # 页面组件
  │   └── vite-env.d.ts   # 类型声明
  ```


## 使用
- 使用脚手架创建项目：`pnpm create vite@latest blog-fengye-vue --template vue-ts`
- 安装依赖：`pnpm install`
- 启动项目：`pnpm run dev`
- 构建项目：
  - 生成静态资源文件：`pnpm run build`
  - 可本地 web 服务器启动：`python -m http.server --directory dist`
- 将生成的静态资源文件 `./dist` 目录下的内容推送到 github pages 指定的分支下
  - 执行 `pnpm run deploy` 会在把 `./dist` 目录的内容推送到当前代码仓库的 `gh-pages` 分支

**具体的使用过程示例：**
1. 在 GitHub 上的个人特殊仓库 `<username>.github.io` 中导入完整的本仓库代码
2. 安装项目依赖，尝试运行项目，确保页面正常
3. 在 `src/assets/_posts` 下创建具体的文章，可参考 `./测速文章.md` 中的文章元数据
4. 执行 `pnpm run build` 和 `pnpm run deploy`，此时当前仓库的 `gh-pages` 分支应该就是完整的本地刚刚生成的 `./dist` 文件夹下的内容
5. 设置 GitHub 仓库的 `GitHub Pages` 为 `gh-pages`
6. 访问 `https://<username>.github.io/`


## vscode 插件
- JavaScript Debugger
- Auto Close Tag
- Auto Rename Tag
- Color Highlight
- CSS Peek
- ESLint
- HTML CSS Support
- indent-rainbow
- Live Server
- Path Intellisense
- PostCSS Language Support
- Tailwind CSS IntelliSense
- Vue - Official
- Vue 3 Snippets


## Time Line
- 2025.05.29 - 2025.06.05 学习和项目基本框架

- 2025.06.09-15
1. 不同页面动态标题
2. 文章、分类、标签页面，文章数据 mock
3. 文章字数统计、标签、分类显示、创建时间、更新时间

- 2025.6.23-30
1. 文章创建命令（❌）
2. 文章显示效果（md、代码块等等）
3. about


## All Thanks To Our Contributors
- [claude.ai](https://claude.ai/)
- [chatgpt](https://chatgpt.com/)
- [kimi](https://www.kimi.com/)
- [cursor](https://www.cursor.com/)
- [copilot](https://github.com/copilot)
