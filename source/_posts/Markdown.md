---
title: Markdown
date: 2024-12-23 10:32:31
tags: 
- Blog
categories: Notes
---


## 展开折叠块
```html
<details>
  <summary>点击时的区域标题：点击查看详细内容</summary>
  <p> - 测试 测试测试</p>
  <pre><code lang="yaml">title，value，callBack可以缺省</code></pre>
</details>
```

### 插件1：markdown-it-container

1. 配置 `_config.yml` 如下：
    ```yaml
    markdown:
      plugins:
        - markdown-it-container
        - name: markdown-it-container
          options: success
        - name: markdown-it-container
          options: tips
        - name: markdown-it-container
          options: warning
        - name: markdown-it-container
          options: danger
    ```
2. 新建 `themes/fengye/source/css/_markdown.styl` 文件，并写入对应代码

3. 在 `themes/fengye/source/css/main.styl` 中添加代码：
    ```stylus
    @import '_markdown';
    ```

4. 在 md 文章中使用：
    ```markdown
    ::: warning
    warning test
    :::
    ```
