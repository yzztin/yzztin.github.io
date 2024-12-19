---
title: Hexo-note
date: 2024-12-16 13:49:29
tags: Notes
---


## 初次使用

1. 安装应用程序
   - `npm install -g hexo-cli`  安装 hexo 命令行工具
   - `npm install hexo-renderer-pug hexo-renderer-stylus --save`  安装渲染器
   - `npm install hexo-deployer-git --save`  安装部署器

2. 初始化博客文件夹
    - `hexo init`  在一个空文件夹中初始化博客
    - `npm install`  安装依赖

3. 新建文章
    - `hexo new "文章名"`  新建文章，会在 `./source/_posts/` 文件夹下新建一个 Markdown 文件

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

1. `hexo d -g`  生成静态文件并部署
