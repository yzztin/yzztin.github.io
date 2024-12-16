---
title: WSL
date: 2024-12-16 11:21:46
tags: Notes
---

> WSL：Windows Subsystem for Linux，运行在 Hypervisor 虚拟化平台上的 Linux 子系统。



## 基本命令和使用
1. `wsl --list -v`  查看虚拟机列表详细信息
2. `wsl --list --online`  查看可安装的 linux 发行版系统
3. `wsl --install --web-download Ubuntu-22.04`  从网络上下载安装 Ubuntu-22.04 子系统
4. `wsl -t Ubuntu-22.04`  终止运行 Ubuntu-22.04 子系统
5. `wsl --shutdown`  终止所有的子系统
6. `wsl --unregister Ubuntu-22.04`  卸载系统



**运行 wsl linux：**

+ 直接输入 `wsl` 运行默认的 Linux 子系统
    - `wsl -s Ubuntu-22.04`  设置默认的子系统
+ 在 windows 的 powershell 中开启对应的 linux 系统
+ 在 windows 任务管理器的左侧栏看到不同 Linux 对应的文件

****

**子系统备份和恢复：**

7. `wsl --export Ubuntu-22.04 Ubuntu-22.04.tar`  将子系统备份到压缩包
8. `wsl --import <子系统名称> <子系统数据存放路径> <压缩包路径>` 将子系统压缩包导入到指定目录



可以直接在 Linux 子系统使用 windows 命令，如：

+ `notepad.exe test.txt`  以 windows 记事本打开 linux 上的 test.txt 文件
+ `explorer.exe .`  以 windows 资源管理的形式打开 linux 上的当前文件夹

也可以直接在 windows 使用 linux 子系统的命令，如：`ls | wsl grep txt`



**显卡直通：**

+ 在 wsl Linux 上可以直接使用 windows 的显卡，查看显卡：`nvidia-smi`


