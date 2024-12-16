---
title: Hexo-note
date: 2024-12-16 13:49:29
tags: Notes
---

- 创建文章：`hexo new "文章名"`
- 生成静态文件：`hexo g`，会更新 `public` 文件夹
- 启动本地服务器：`hexo s`


主题：
- https://hexo.io/themes/

1. 安装渲染器：`npm install hexo-renderer-pug hexo-renderer-stylus --save`
2. 下载主题文件到 `./themes/` 目录下
3. 修改 `./_config.yml` 文件，如 `theme: cactus-light`
4. 重新生成静态文件 `hexo g`

部署到 github pages：
1. 安装工具: `npm install hexo-deployer-git --save`
2. 配置 `_config.yml` 文件
    ```yaml
    deploy:
        type: git
        repo: git@github.com:yzztin/yzztin.github.io.git
        branch: hexo
        name: yzz
        email: yzztin223@gmail.com
    ```
3. 执行 `hexo clean && hexo deploy`
4. 会生成一个文件夹 `.deplopy_git`，这里保存 commit 历史和提交信息，每次 `hexo deploy` 都会强制推送这个文件夹的 commit 到远程
