const n=`---
title: Git
date: 2024-12-29 14:45:24
tags:
- Code
- DevOps
category: Notes
---

## 一、Git 基础知识

- Git 主要用来管理代码和文件，在 Git 仓库中，每一个文件、每一行文本都是有迹可循的，任何修改都会被记录下来，所有的更改、所有的操作，都可以被追踪、都可以被复原
- \`.gitignore\` 用来表示不需要 Git 管理的文件或目录
- 空文件默认不被 Git 管理，如果需要，可以在空文件夹中添加 \`.gitkeep\` 空文件
- Git 会默认忽略对文件名的大小写的修改，可以在 \`.git/config\` 文件中，修改 \`ignorecase = false\`
- 如果当前 Git 仓库 A 下的某个文件夹下存在另一个 Git 仓库 B（存在\`.git\`文件夹），那么仓库 B 文件夹会被忽略，不会被 Git 仓库 A 管理

**一些概念：**
- 本地仓库（repository）：本地 Git 仓库文件夹，保存有 \`.git\` 文件夹，记录了所有 git 操作
- 远程仓库（remote）：远程 Git 仓库文件夹，和本地仓库同步，具有相同的操作历史
  - 可以说，远程仓库等同于本地仓库，远程仓库就是本地仓库的线上存储
  - 远程仓库和本地仓库的同步是以 “分支” 为基础的，远程和本地相互 “连接” 的分支是相同的
- 分支（branch）：一个仓库可以有多个分支，每个分支是独立的，用以保存不同的文件修改操作
  - 某个分支一般是另外一个分支的 “复制体”
- 工作区（workspace）：就是保存有 \`.git\` 文件夹的本地文件地址，用以更改本地 Git 仓库文件
  - 仓库是一个比较宽泛笼统的概念，可以这样理解：我在仓库的某个分支下工作（修改文件），那这里就是我的工作区
- 暂存区（Staged）：文件修改后，可以将其放到暂存区，是即将正式提交的文件
- 储藏区（stash）：将当前工作区中的文件恢复为原样，并把修改的内容临时保存到储藏区，储藏区的结构是一个**栈**
- 一个提交（commit）：确定某次修改后，将其放入暂存区，然后将暂存区的文件进行提交
  - 远程仓库和本地仓库就是以 “提交 commit” 为单位进行同步的
  - 某一个提交，代表一次确切的修改和保存
- 合并（merge）：将两个分支的文件进行合并
- 拉取（pull）：远程分支和本地分支进行同步，会做两件事
    1. 将远程仓库的文件拉取到本地仓库
    2. 将远程分支和本地连接的分支进行文件合并（merge）
- 推送（push）：将本地分支和远程分支进行同步，远程文件和本地文件达到一致

**工作区中一个文件会出现的几种状态：**
- 未跟踪（untrack）：存在于 git 工作区的文件，但不在 git 的管理范围
- 未修改（unmodified）：与之前的文件（上一个 commit）相同的文件
- 已修改（modified）：与之前的文件不同的文件
- 已暂存（staged）：确定修改的文件，一次提交（commit）就是只提交暂存区的文件


**一次提交的文件状态历程：**
- 新建文件（未追踪）、修改文件（已修改） -->  确定这个文件（已暂存）  -->  提交修改（变为未修改）


## 二、Git 用法和命令

### 2.1 本地配置

#### 2.1.1 SSH 密钥配置

- 生成 ssh 密钥
  - 为防止覆盖已有的密钥文件，可以指定一个新的密钥文件名称
  - 密钥文件一般存放在 \`用户目录/.ssh\` 下

    \`\`\`bash
    ssh-keygen -t rsa -C "邮箱"   # 生成ssh密钥，-b 4096 指定长度
    \`\`\`
- 将公钥文件内容添加到远程仓库的配置中

- 将本地私钥路径和远程仓库域名相对应：
  - 修改 \`用户目录/.ssh/config\` 文件，示例内容如下
    \`\`\`
    Host github.com
        HostName github.com
        PreferredAuthentications publickey
        IdentityFile C:\\Users\\yzz\\.ssh\\id_rsa

    Host gitlab.xxx.com
        HostName gitlab.xxx.com
        PreferredAuthentications publickey
        IdentityFile C:\\Users\\yzz\\.ssh\\id_rsa_gitlab
    \`\`\`

#### 2.1.2 Git 作者信息配置

\`\`\`bash
git config --list  # 查看配置信息，--gloabl 查看全局

# 配置全局默认 git 仓库的作者信息
git config --global user.name "xxx"  # 配置用户名，对所有仓库生效
git config --global user.email "xxx"  # 配置用户邮箱


# 为每个 git 项目单独配置用户名和邮箱：
# 在仓库目录下
git config user.name "xxx"
git config user.email "xxx"
\`\`\`

### 2.2 基本指令
\`\`\`bash

# 克隆远程仓库到本地，会新建一个文件夹
git clone <远程仓库http或ssh链接>  

# 创建当前目录为 git 仓库，会生成一个 .git 文件夹
git init

git pull  # 拉取远程和本地连接的分支，本地 commit 记录会和远程同步
git push  # 推送本地分支到远程分支，远程 commit 记录会和本地同步


git status  # 查看当前仓库的状态，如所处分支、提交信息等，-s 简略查看
git add <文件名>  # 将文件添加到暂存区，<文件名>为 . 表示所有文件，通配符 *.html
git ls-files  # 查看暂存区的文件，-s 详细查看

# git restore 是新版的 git rm，两者作者类似
git restore <文件名>  # 将修改恢复到最新的提交的状态，--staged 从暂存区恢复指定的文件


# 提交暂存区的文件到本地仓库中
git commit -m "<本次提交的注释>"  # 如果没有 -m 会进入 vim 编辑多行注释
## -am "<xxx>"  将已被追踪的文件的修改放到暂存区并提交，不包括未被跟踪的文件（新创建的文件）

git log  # 查看提交的日志记录，--oneline 简洁查看
git reflog  # 查看所有操作历史记录


# 回退提交记录
git reset HEAD^  # 将仓库回退到最新提交的上一次提交，HEAD 代表最新的一次提交，可以改为某次提交的唯一ID值
## --soft  回退到某个版本，并且保留本地里暂存区和工作区的所有修改内容
## --hard  回退到某个版本，并且丢弃本地里暂弃区和工作区的修改
## --mixed  默认参数，回退到某个版本，只保存本地里工作区的修改内容，丢弃暂存区的修改内容
\`\`\`

### 2.3 仓库

- \`git remote -vv\`  详细查看远程仓库

- 输出示例如下，可以这样认为：\`origin\` 这个关键字等同于 \`git@github.com:yzztin/yzztin.github.io.git\` 这个远程仓库地址，当执行 \`git pull\` 等命令时，默认就是 \`origin\` 对应的 git 仓库地址
    \`\`\`
    origin  git@github.com:yzztin/yzztin.github.io.git (fetch)
    origin  git@github.com:yzztin/yzztin.github.io.git (push)
    \`\`\`

- 其他关于仓库的命令
\`\`\`bash
git remote add origin2 <远程仓库地址>  # 关联远程仓库

git remote set-url origin2 <新地址>  # 修改 origin2 对应的远程仓库地址

git remote rename origin2 old_origin  # 重命名远程仓库名

git remote remove origin2  # 删除远程仓库
\`\`\`

### 2.4 branch 分支

- \`git branch -vv\`  详细查看本地分支和远程分支的关联关系

- 输出示例如下，可以理解如下信息
  - 当前正在处于 \`hexo\` 分支下
  - 本地分支 \`hexo\` 和远程仓库 \`origin\` 的 \`hexo\` 分支是相连接的，本地该分支落后远程该分支两个 commit，本地最新的 commit 的注释信息是 \`Site updated: 2024-12-16 14:10:50\`
  - 本地分支 \`main\` 和远程仓库 \`origin\` 的 \`main\` 分支是相连接的，本地和远程该分支 commit 记录相同，该分支本地最新的 commit 注释信息是 \`init\`
  \`\`\`bash
  * hexo      7a48463 [origin/hexo: behind 2] Site updated: 2024-12-16 14:10:50
  main      967e1a2 [origin/main] init
  \`\`\`

- 分支的其他操作：
\`\`\`bash

# 切换分支，类似于 git checkout，单纯切换分支建议使用 git switch
git switch <分支名>  
## -c 基于当前分支下新建一个新的分支并切换过去，新分支会复制当前分支的全部文件，包括未暂存和修改的文件

# 删除分支
git branch -d <分支名>  # 删除本地分支，需要先切换到别的分支，当分支已经推送到远程后才可以直接删除，-D 强制删除
git push origin --delete <分支名>  # 删除远程分支

# 合并分支
git merge <分支名>  # 合并分支，将指定分支合并到当前正在使用的分支


# 推送分支到远程
git push -u origin main:origin-main
## 把本地分支 main 推送给远程 origin-main 分支，如果远程仓库没有 origin-main 分支，会在远程新建分支该分支
## 如果没有没有指定远程分支名，默认远程分支与本地分支名相同，即 git push origin main 等同于 git push origin main:main
## -u 或 --set-upstream 设置远程和本地分支间的连接关系
## -f 强制推送，强制将远程分支的 commit 记录与本地保持一致

# 拉取远程仓库到本地
git pull origin origin-main:main  # 把远程的origin-main分支拉取到本地main分支中，操作同上

# 将本地分支和远程分支连接起来
git branch -u orgin/dev dev  # 远程的 dev 分支连接到本地的 dev 分支上
\`\`\`

- 其他概念：
  - 如果在 \`分支1\` 中修改了代码，但未提交，就切换到的 \`分支2\` 上，那么会把未修改的代码也带到 \`分支2\` 中，即 \`分支2\` 会展示 \`分支1\` 的代码（只有 \`分支1\` 和 \`分支2\` 处同一个 commit 才会这样，如果不是同一个 commit，会出现错误）
  - 如果不想将 \`分支1\` 的代码带到 \`分支2\` 中，也不想立刻暂存或提交代码，可以先通过 \`git stash\` 临时保存到储藏区


### 2.5 stash 储藏

- 储藏区是一个栈结构，用以临时保存工作区的修改内容

\`\`\`bash
git stash  # 保存当前工作区的修改内容到储藏区

git stash list  # 查看储藏区的记录

git stash show 0  # 查看栈顶的储藏记录的详细信息

git stash pop  # 恢复最近一次储藏的修改内容，并删除该记录

git stash push <文件>  # 将指定文件保存到储藏区

gi stash drop 0  # 删除栈顶的储藏记录
\`\`\`

### 2.6 diff 查看差异

> 一般在 IDE 工具中更加直观地查看文件之间的差异，而不是通过下面地命令

\`\`\`bash
git diff  # 可以查看工作区、暂存区、本地仓库、不同版本(提交)、不同分支之间的差异
# 默认比较的是工作区和暂存区之间的差异

git diff HEAD  # 比较**工作区**和最新一次提交之间的差异
git diff --cached  # 比较**暂存区**和最新一次提交之间的差异
git diff <提交ID-1> <提交ID-2> <文件名> # 比较两次提交之间的差异，有 <文件名> 则表示只查看该文件的差异
git diff <分支名1> <分支名2>  # 查看两个分支之间的差异

git diff HEAD^ HEAD  # 用 HEAD（最新提交）比较 HEAD^（最新提交的上一个提交）
git diff HEAD HEAD^  # 用 HEAD^（最新提交的上一个提交）比较 HEAD（最新提交）
\`\`\`

### 2.7 tag 标签

- 标签是一种标记，对某个分支的某个提交的标记，通过标签可以方便地找到特定的提交记录

\`\`\`bash
git tag  # 查看标签列表

git tag <标签名>  # 简易标签，为当前分支的最新提交创建一个标签名，如 git tag v1.0
git tag -a <标签名> -m <标签注释信息>  # 详细标签，如，git tag -a v1.0.0 -m "发布新版本"
git tag <标签名> <commit hash 值>  # 为某个特定的 commit 打标签

git push origin <标签名>  # 推送标签到远程

git checkout <标签名称>  # 切换到指定标签

git tag -d <标签名称>  # 删除本地标签
git push origin --delete <标签名称>  # 删除远程的标签
\`\`\`

### 2.8 rebase 变基

> rebase 变基，最常用来处理提交记录的合并，可以将多个提交记录合并成一条直线的提交记录

\`\`\`bash
git log  # 查看 commit 日志

# 找到想要保留的最早的 commit 的前一个的 hash值
git rebase -i <hash值>  # 进入到交互模式的 rebase 

# 界面示例如下，commit A 是想要保留的一次提交，所以上面的 hash 值就应该是 commit A 前一次的值
pick d9623b0 commit A (最早的一个commit)
pick c50221f commit B
pick 73deeed commit C (最新的一个commit)

# 将前面的 pick 修改为 f 或者 s
# 使用 f 会自动使用 commit A 的提交信息，使用 s 会要求重新写 commit 信息
pick d9623b0 commit A
f c50221f commit B
f 73deeed commit C

# 变基处理到第一个 commit 
git rebase -i --root
\`\`\`


### 2.9 合并冲突

> 解决冲突就是人工手动的一个一个去查看解决，将冲突的代码改成自己需要的代码
> 一般在 IDE 工具中解决冲突更加直观方便

- 合并冲突是指两个分支修改了同一文件，导致 git 无法自动合并，需要手动解决冲突
- 产生合并冲突后，会在有冲突的文件中用 \`<<<<<<<，=======，>>>>>>>\` 标记出不同分支的内容
- 完成冲突解决后，需要手动执行 \`git commit -m "xxx"\` 提交修改




## 三、Git 常见实际场景示例

### 3.1 一次代码修改和 commit 提交，并合并到 main 分支

- 在正式生产环境中，远程仓库的 main 分支一般是不可以随便修改的（受保护的），就需要新建一个分支，在该分支上做修改，然后请求合并到 main 分支

> 如果已经在 \`main\` 分支进行了修改，可以将修改后的 \`main\` 分支提交后合并到其他分支，再推送其他分支

\`\`\`bash
git pull  # 每次更改代码前，先使用 pull 命令拉取资源，尽量避免冲突

git switch -c yzz-dev  # 基于当前分支（main）新建一个分支，名称为 yzz-dev，并切换到该分支，此时仅在本地新建了分支

## 修改文件

git add .  # 将所有修改的文件添加到暂存区
git commit -m "xxx"  # 提交修改，-m 后面是注释信息
git push origin yzz-dev  # 将本地分支 yzz-dev 推送到远程，会在远程新建分支

## 此时进入到远程仓库（如Gitlab）项目中，发起合并请求
## 如果出现合并冲突，无法执行合并，则需要手动解决冲突，解决完冲突后，再次提交和推送

git merge main  # 将 main 分支合并到当前分支（yzz-dev）

## 手动解决冲突

git commit -m "xxx"
git push origin yzz-dev 

## 合并到 main 分支
\`\`\`



### 3.2 Github 让自己 Fork 的项目变为最新的，或指定远程某个分支、标签合并到本地
\`\`\`bash
## 在本地 Forked 仓库目录下

git remote add dify https://github.com/langgenius/dify.git  # 添加原项目仓库地址，命名为 dify
git remote -vv  # 确认 dify 远程仓库已成功添加

git fetch dify  # 获取 dify 仓库的最新代码

git merge dify/main  # 将远程仓库的 main 分支合并到本地当前分支中

## 远程标签的操作

git fetch dify --tags  # 拉取标签

git ls-remote --tags dify  # 查看本地拉取到的标签列表

# 根据标签签出分支
# git checkout <上面看到的标签名> <本地需要新建的分支名>
git checkout refs/tags/0.11.1 -b dify-11.1

\`\`\`

### 3.3 处理无意义的提交记录，或修改提交记录

- 情况1：如果只需要修改最新的一次提交
\`\`\`bash
## 先直接修改工作区的文件

# 将修改后的文件放入暂存区
git add .

# 重新提交，--amend 参数会修改最新的一次提交
git commit --amend -m "注释信息"

# 推送到远程
git push  # -f 强制推送，强制远程仓库的 commit 记录与本地保持一致
\`\`\`

- 情况2：如果需要修改之前的提交记录，可以使用 rebase 命令


### 3.4 某个文件已经推送到远程仓库，但现在不需要 git 管理该文件了

> 如果某个文件已经被提交到了远程仓库中，再把文件名写入到 \`.gitignore\` 是不会生效的，需要手动删除这个文件（不用在工作区中删除）

\`\`\`bash
# 从本地仓库中移除 .vscode .idea 这两个文件，但没有物理上删除文件
git rm -r --cached .vscode .idea

# 将需要忽略到远程仓库的文件夹名称写到 .gitignore 文件中，如下
.vscode/
.idea/

git add .gitignore
git commit -m "xxx"
git push origin yzz-dev
\`\`\`

### 3.5 拉取远程的非主分支到本地

\`\`\`bash
git switch -c dev origin/dev  # 新建一个分支dev，并追踪到远程的dev分支
\`\`\`


### 3.6 在多个提交记录中，只想要取其中某一个（cherry-pick）

\`\`\`bash
# 查看另一个分支上的你需要的 commit ID
git log dev

git cherry-pick <commit ID>  # 这个 commit 会加到当前分支上

## 存在冲突就手动解决

git push
\`\`\`

## 四、Git commit 注释信息规范

- 在代码提交的 commit 中，通常使用一些标签来标识提交的目的或类型，以便更好地理解和管理代码的变更。以下是一些常见的标签及其代表的含义：

\`\`\`
ENH（Enhancement）： 表示增强或改进功能的提交。通常用于描述对现有功能的改进或增强。
DOC（Documentation）： 表示文档相关的提交。这可能包括更新文档、添加注释、撰写使用手册等。
REF（Refactor）： 表示重构代码的提交。重构是指对现有代码进行修改，以改进其结构、提高可读性、降低复杂度，但并不改变代码功能的行为。
FEAT（Feature）： 表示新功能的提交。通常用于描述对代码库新增功能的修改或添加。
BUG（Bugfix）： 表示修复 Bug 的提交。用于描述对现有代码中的错误或缺陷进行修复的修改。
BLD（Build）： 表示与构建系统相关的提交。这可能包括修改构建脚本、构建配置文件、依赖管理等。
TST（Test）： 表示与测试相关的提交。这可能包括添加、修改或删除测试用例，以及与测试框架、测试工具相关的修改。
CHORE: 用于非业务逻辑的维护性工作，比如配置文件的调整。
\`\`\`


## 参考链接

+ Git官方文档：https://git-scm.com/book/zh/v2
+ 常用命令：https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
+ VS Code中使用Git：https://zhuanlan.zhihu.com/p/514135557
+ Git撤回已经push代码：https://www.cnblogs.com/arxive/p/11146637.html
+ gitlab：https://www.jianshu.com/p/95991a646f72
+ gitlab和GIt：https://zhuanlan.zhihu.com/p/183092443
+ 同时配置Github和Gitlab的不同SSH密钥：https://kangzhiheng.top/post/11-more-ssh-in-one-laptop/
+ 指令的解释：https://mp.weixin.qq.com/s/0rK9TJxMnoYYhtdy1kcvIg
+ 在线学习平台：https://learngitbranching.js.org/?locale=zh_CN
+ 变基：https://waynerv.com/posts/git-rebase-intro/`;export{n as default};
