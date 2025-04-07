---
title: WSL 基本使用
date: 2024-12-16 11:21:46
tags:
- Windows
- DevOps
- WSL
categories: Notes
---

> WSL：Windows Subsystem for Linux，运行在 Hypervisor 虚拟化平台上的 Linux 子系统。

## 1. 基本命令和使用
1. `wsl --list -v`  查看虚拟机列表详细信息
2. `wsl --list --online`  查看可安装的 linux 发行版系统
3. `wsl --install --web-download Ubuntu-22.04`  从网络上下载安装 Ubuntu-22.04 子系统
4. `wsl -t Ubuntu-22.04`  终止运行 Ubuntu-22.04 子系统
5. `wsl --shutdown`  终止所有的子系统
6. `wsl --unregister Ubuntu-22.04`  卸载系统
**子系统备份和恢复：**
7. wsl --export Ubuntu-22.04 Ubuntu-22.04.tar  将子系统备份到压缩包
8. wsl --import <子系统名称> <子系统数据存放路径> <压缩包路径> 将子系统压缩包导入到指定目录


## 2. 运行 WSL

+ 直接输入 `wsl` 运行默认的 Linux 子系统
    - `wsl -s Ubuntu-22.04`  设置默认的子系统
    - `wsl -d xxx`  启动指定的系统
+ 在 windows 的 powershell 中开启对应的 linux 系统
+ 在 windows 任务管理器的左侧栏看到不同 Linux 对应的文件
+ 可以直接在 Linux 子系统使用 windows 命令，如：
  + `notepad.exe test.txt`  以 windows 记事本打开 linux 上的 `test.txt` 文件
  + `explorer.exe .`  以 windows 资源管理的形式打开 linux 上的当前文件夹
+ 也可以直接在 windows 使用 linux 子系统的命令，如：`ls | wsl grep txt`
+ 显卡直通：
  +   在 wsl Linux 上可以直接使用 windows 的显卡，查看显卡：`nvidia-smi`

## 3. wsl 相关常用配置
### 3.1 本地主机和 WSL 共享端口服务
> 比如我在 wsl 开启了一个 5001 端口服务，我希望可以通过本地主机 127.0.0.1:5001 访问到 wsl 上的服务
1. 在 windows 用户目录下新建 `.wslconfig` 文件，写入内容如下：
    ```
    [experimental]
    networkingMode=mirrored
    dnsTunneling=true
    firewall=true
    autoProxy=true
    hostAddressLoopback=true
    ```
2. 执行 `wsl --shutdown` 关闭 wsl 子系统，等待十几秒后重启

### 3.2 在 wsl 上和 windows 共用相同的 ssh 密钥文件
-  通过符号链接实现：ln -s /mnt/c/Users/yzz/.ssh  ~/.ssh
-  可能出现符号链接后文件权限的问题，可以在 wsl 中 `/etc/wsl.conf` 文件中添加如下配置：
    ```
    [automount]
    enabled = true
    root = /mnt/
    options = "metadata,umask=22,fmask=11"
    mountFsTab = true
    ```
-   在 `~/ssh/config` 文件中可能会出现 wsl 和 windows 无法同时识别不同路径格式的问题，可以使用改为可以通用文件路径格式，示例如下：
    ```
    Host github.com
        HostName ssh.github.com
        PreferredAuthentications publickey
        IdentityFile %d/.ssh/id_ed25519  # 使用 %d 代表用户文件夹路径
        Port 443
    ```

## 4. Q&A
1. 设置 root 用户密码
- 初始的 Ubuntu 中，root 密码是每次都随机的，需要手动设置
- 执行命令：`sudo passwd root`
2. 报错：`WSL (12) ERROR: CreateProcessEntryCommon:570: execvpe /usr/bin/zsh`
- 由于设置了默认进入 zsh ，但现在 zsh 无法正常使用导致错误
- 执行：`wsl ~ -e bash`，表示在用户目录下执行 bash 命令