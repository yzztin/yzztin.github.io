---
title: Hexo-note
date: 2024-12-16 13:49:29
tags: 
- Blog
categories: Notes
---


## 初次使用

1. 安装应用程序
   - `npm install -g hexo-cli`  安装 hexo 命令行工具
   - `npm install hexo-renderer-pug hexo-renderer-stylus --save`  安装渲染器
   - `npm install hexo-deployer-git --save`  安装部署器
   - markdown 相关：
     - `npm un hexo-renderer-marked --save`  卸载 hexo 的默认 md 插件
     - `npm i hexo-renderer-markdown-it --save`  安装新的 md 插件

2. 初始化博客文件夹
    - `hexo init`  在一个空文件夹中初始化博客
    - `npm install`  安装依赖

3. 新建文章和页面
    - `hexo new "文章名"`  新建文章，会在 `./source/_posts/` 文件夹下新建一个 Markdown 文件
    - `hexo new page "文件名"`  新建一个 "页面"，会生成 `./source/文件名/index.md`

4. 生成静态文件
    - `hexo g`  生成静态文件，会在 `./public/` 文件夹下生成静态文件
    - `hexo clean`  清除缓存，会删除 `./public/` 文件夹下的静态文件

5. 启动本地服务器
   - `hexo s`  

6. 部署到服务器
   - 配置 `_config.yml` 文件
        ```yaml
        deploy:
            type: git
            repo: git@github.com:yzztin/yzztin.github.io.git
            branch: hexo
            name: yzz
            email: yzztin223@gmail.com
        ```
   - `hexo d`  部署到服务器，会将 `./public/` 文件夹下的静态文件部署到服务器上
   - 会生成一个文件夹 `.deplopy_git`，这里保存 commit 历史和提交信息，每次 `hexo deploy` 都会强制推送这个文件夹的 commit 到远程

## 主题：
> https://hexo.io/themes/

1. 下载主题文件到 `./themes/` 目录下
2. 修改 `./_config.yml` 文件，如 `theme: cactus-light`
3. 重新生成静态文件 `hexo g`


## 配置文件
- 配置文件生效顺序
  1. 主题文件下的配置文件，如 `./themes/xxx/_config.yml`
  2. 复制到根目录下的主题的配置文件，如 `./_config.[theme].yml`
  3. 根目录下的配置文件，如 `./_config.yml` 

## 快速启动命令

1. `hexo d -g`  生成静态文件并部署，如果出现修改了内容但无更新的情况，可以先 `hexo clean` 再执行部署


## 问题记录
   
   1. git 会默认忽略对文件名的大小写的修改，导致博客的路径请求不到对应的文件
   - 解决方式：在 `.deploy_git/.git/config` 文件中，修改为 `ignorecase = false`
   
   1. “分类” 页面下总是请求小写的路径地址
   - 解决方式：在 `themtes/fengye/layout/categories.ejs` 文件下修改代码为：
        ```json
        // 去除 category.path.toLowerCase() 方法
        <a href="<%- url_for(category.path) %>" class="py-2 group">
        ```

   1. md 图片问题
      - 对于某个 md 文章 `xxx.md` 使用相对路径引用图片 `![](../images/xxx/xxx.png)`，所有图片统一放在 `source/images/xxx/` 下
      - 在 `_config.yml` 文件中添加配置：
         <details>
         <summary> 增加的配置内容 </summary>
         <pre><code lang='yaml'>markdown:
            preset: 'default'
            render:
               html: true
               xhtmlOut: false
               breaks: false
               linkify: true
               typographer: false
            anchors:
               # Minimum level for ID creation. (Ex. h2 to h6)
               level: 2
               # A suffix that is prepended to the number given if the ID is repeated.
               collisionSuffix: ''
               # If `true`, creates an anchor tag with a permalink besides the heading.
               permalink: false
               # Class used for the permalink anchor tag.
               permalinkClass: header-anchor
               # Set to 'right' to add permalink after heading
               permalinkSide: 'left'
               # The symbol used to make the permalink
               permalinkSymbol: '#'
               # Transform anchor to (1) lower case; (2) upper case
               case: 0
               # Replace space with a character
               separator: '-'
            plugins:
            images:
               prepend_root: false
               post_asset: true</code></pre>
         </details>


   2. 主页 `Cannot GET /`
      - 没有成功生成 `public/index.html` 文件，可能是缺少某个依赖，执行 `npm audit fix` ，再次生成测试
      - 或者删除 `node_modules` 文件夹，执行 `npm install` 重新安装依赖
