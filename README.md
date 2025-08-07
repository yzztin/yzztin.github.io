## 使用 vue3 重写的 [fengye](https://github.com/chen-yingfa/hexo-theme-fengye) 主题
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
- 下载本项目，进入项目目录
- 安装依赖：`pnpm install`
- 启动项目：`pnpm run dev`
- 构建项目：
  - 生成静态资源文件：`pnpm run build`
  - 可本地 web 服务器启动：安装依赖：`pnpm install -g serve`，随后执行：`serve -s dist`
- 将生成的静态资源文件 `./dist` 目录下的内容推送到 github pages 指定的分支下
  - 执行 `pnpm run deploy` 会在把 `./dist` 目录的内容推送到当前代码仓库的 `gh-pages` 分支（如果出现一直卡住的情况，可以尝试先创建一个名为 `gh-pages` 的分支再次执行）
- 配置 Github Action 自动部署：
  - 将本项目源代码复制到个人仓库`<usernmae>.github.io`中`.github/workflows/CICD.yml.example`指定`push`的分支（如示例中是分支名称是`blog-code`）
  - 将 `.github/workflows/CICD.yml.example`，改为 `.github/workflows/CICD.yml`
  - 当工作流分支和部署的 `gh-pages` 分支是同一个仓库时，可以直接使用 `secrets.GITHUB_TOKEN `，需要在仓库设置中修改密钥权限：`Setting -> Actions General -> Workflow permissions -> Read and write permissions`
  - 每次修改代码或添加文章，只要 `push` 后就自动执行生成静态文件并放到`gh-pages`分支的流程

**具体的使用过程示例：**
1. 在 GitHub 上的个人特殊仓库 `<username>.github.io` 中导入完整的本仓库代码
2. 安装项目依赖，尝试运行项目，确保页面正常
3. 在 `public/posts` 下创建具体的文章，可参考 `./测速文章.md` 中的文章元数据
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


## 问题记录
- 使用 `pnpm run build` 生成静态文件，再通过 `python -m http.server --directory dist` 启动 web 服务后，可以从网页的 `/` 根路径下正常访问 `/posts`，但是直接进入 `http://xxx/posts` 出现找不到页面的问题，当使用 `pnpm run dev` 进入页面时没有问题
  - 本质原因是使用 `vue router` 的 `createWebHistory()` 创建的是 `单页面应用（SPA）`，只有一个`index.html`文件，使用 `pnpm run dev` 开启的 web 服务是可以探测出这个是 `SPA` 应用的，会将未知路径比如 `/posts` 重新定向到 `index.html`，然后由 `vue router` 在前端处理这些路径。但是静态文件服务器只会寻找比如 `/posts/index.html` 这样的文件，找不到于是就返回无页面。
  - 此处会把`dist`的静态文件上传到 `gh-pages`，由于`gh-pages`服务器在找不到文件时会自动寻找和显示 `404.html` 的内容，因此，此处的解决办法是给一个特殊的 `404.html` （详见 ./pubilc/404.html）让其重定向到根目录的 `/index.html` 并保留路径地址，再重新跳转到对应的路径。

- busuanzi 服务端 502 的问题导致网页加载很慢（浏览器页面的图标一直转圈）