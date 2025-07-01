---
title: Docker
date: 2024-12-30 19:51:01
tags:
- DevOps
category: Notes
featured: true
---

## 一、Docker 基本概念

- Docker是一个用于构建（build）、运行（run）、传送（share）**应用程序**的平台。
- Docker 使用 Client-Server 架构模式
  - 运行容器、存储镜像的，就是服务端
  - 执行 docker 命令的，就是客户端
  - 一般客户端和服务端都是运行在同一台主机上
- 镜像（image）：是一个只读的模板，可以用来创建容器
- 容器（container）：是Docker的运行实例，提供一个独立的可移植的环境，可以在该环境中运行应用程序
- 容器化（containerization）：将应用程序打包成容器，然后在容器中运行应用程序的过程。
  - 使用 Dockerfile 构建镜像、使用镜像创建和运行容器
- Dockerfile：用以构建镜像的代码文件，包括应用程序执行的所有命令，即各种依赖、配置环境和运行应用程序需要的全部内容
  - 一般包括：精简版的操作系统、运行时的环境（如NodeJs、Python解释器等）、应用程序（如Python代码）、应用程序第三方依赖库、应用程序配置文件、环境变量等等
- 容器是由镜像创建的，通过docker上传和下载的都是镜像，要想运行程序，就要先通过镜像创建容器后再去运行。镜像就相当于是一个 `类`，而容器就是`对类的实例化` 
- Docker和虚拟机的区别：
  - 虚拟机：通过**虚拟化技术**将 一个物理服务器分为多个独立且完整的虚拟机，各个虚拟机之间是互相隔离的，每个虚拟机都需要消耗大量的系统资源（CPU、硬盘等）
  - docker容器：是一种虚拟化技术，和虚拟机类似，是一个独立的环境，可以在环境里运行应用程序，并不需要运行完整的操作系统，而是建立在原操作系统之上启动。docker只是容器技术的一种实现，是一个容器化的解决方案和平台。


## 二、Docker 命令

### 2.1 基本命令
**Docker 基本使用：**
```bash
docker search <镜像名>  # 从 dockerhub 上搜索镜像

docker pull ubuntu:22.04 # 从 hub.docker.com 下载一个 Ubuntu 22.04 操作系统的镜像
docker pull dl.dockerpool.com:5000/ubuntu:22.04  # 从其他仓库服务器下载镜像，这里使用了“命名空间”

docker images  # 查看所有镜像
docker ps  # 查看正在运行的容器，-a 所有容器

docker run <镜像名>  # 根据镜像新建并启动容器
docker run -d --name <容器名> <镜像名>  # 基于镜像启动一个容器
## --name 自定义容器名称，如果没有指定名称，会给一个随机名
## -d 后台启动该容器
## --rm 容器结束后自动删除，即创建的容器是一次性的，但拉取的镜像会保下来
## -p 80:8080 将容器内部的 8080 端口映射到宿主机的 80 端口上，宿主机通过 80 端口可以访问容器内部 8080 端口的服务
## -v /path/to/host:/path/to/container 挂载宿主机的目录到容器的目录


docker start <容器ID/名称>  # 启动已有的容器，ID值输入前3~4位即可
docker stop <容器ID/名称>  # 停止运行中的容器，不会删除容器

docker logs -f <容器ID/名称>  # 动态查看已启动的容器的日志

docker exec <容器名> node index.js  # 通过容器执行命令
docker exec -it <容器名> bash  # 使用伪终端进入容器的 bash 命令行

docekr inspect <容器ID/名称>  # 检查一个容器的详情，包括启动方式、挂载卷等等

docker rm <容器名>  # 删除已经停止的容器，-f 强制删除
docker rmi <镜像名>  # 删除镜像文件

docker built  # 根据Dokcerfile文件构建镜像，-t 指定镜像名称和标签

docker rename xxx xxx  # 重命名容器

# 从容器中拷贝文件到本地
docker cp <容器ID/名称>:/path/to/file  C:\Users\yzz\Desktop

# 通过容器重打一个新镜像
docker commit <容器名> <镜像名>
```

**Docker 数据卷：**
```bash
docker volume ls  # 查看由 docker 管理的数据卷

docker volume inspect <volume_name>  # 查看某个卷的详细信息

docker volume rm <volume_name>  # 删除指定卷

docker volume prune  # 清除所有未使用的卷
```


**容器/镜像文件的保存：**
```bash
# 打包镜像
docker save my_image:latest > my_image_latest.tar

# 在目标机器上加载镜像
docker load < my_image_latest.tar

# 导出容器
docker export my_container > my_container.tar
```



### 2.2  完整命令示例

- 在一个项目中通过 Dockerfile 构建镜像
```bash
## 在一个项目中，已经有了 Dockerfile 文件

# 构建镜像
docker build -t my_docker_image:v1.0 .  
## 最后的 . 表示当前目录下，该目录下应当有 Dockerfile 文件和构建镜像需要的其它文件

# 通过镜像创建容器，并启动容器
docker run -d --rm --name my_docker_container my_docker_image -p 80:8080

# 以 bash 命令行进入容器
docker exec -it my_docer_container bash 

docker restart my_docer_container  # 重启容器，容器不会销毁
docker stop my_docer_container  # 停止容器
```

## 三、Dockerfile

### 3.1 一些概念
- Dockerfile 是一个文本文件，用来构建 Docker 镜像，
- 在 Dockerfile 中，详细完整地描述了在一个全新的环境中（Linux）成功执行代码程序的所有步骤
- 一般情况下，Dockerfile 会基于某个已经有一定代码运行环境的镜像去构建自己的镜像，比如打包 Python 代码作为一个镜像， 就可以基于 `python:3.10-slim` 等镜像
- 只有当容器被初次创建时，才会执行 Dockerfile 中的 CMD 命令（或 ENTRYPOINT）
- 启动已存在的容器，是不会执行 CMD 命令的

### 3.2 常用语法
+ `FROM` 基于某个基础镜像去构建我写的镜像
+ `WORKDIF` 指定当前工作目录
+ `COPY` 复制本地文件到镜像中
+ `RUN` 在构建镜像时就执行的命令
+ `CMD` 在容器真正运行的时候才会执行的命令
+ `EXPOSE` 镜像开放的端口
+ `ENV` 指定容器中的环境变量和值

### 3.3 完整 Dockerfile 示例
```bash
# 使用官方的OpenJDK运行时作为父镜像
FROM openjdk:11-jre-slim

# 设置环境变量GROBID_HOME为指定目录
ENV GROBID_HOME=/opt/grobid

# 将本地全部文件复制到指定目录下
COPY . ${GROBID_HOME}

# 设置工作目录，后续指令都会在这个工作目录下进行
WORKDIR ${GROBID_HOME}

# 安装必要的依赖包
# 反斜杠表示命令还没有结束，用以换行
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    build-essential \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Download and install GROBID models
RUN ./gradlew grobid-home:installModels

# Docker容器应该开放8070端口，在实际运行该容器时，需要用到 -p 参数来实际映射端口
EXPOSE 8070

# Start the GROBID service
CMD ["./gradlew", "run"]
```

## 四、docker compose

### 4.1 基础概念
+ 镜像运行成为容器需要 `docker run` 命令去定义，但是某个命令可能会较长，而且如果有多个镜像，就需要大量的命令，docker compose 用以在一个 `yaml` 文件中详细定义这些镜像的启动方式，从而节省了冗长的 `docker run` 命令
+ 也就是说，docker compose 用于定义和运行一个或多个 Docker 镜像启动为容器的方式


### 4.2 语法和命令

1. 基础 docker compose 语法

```bash
docker compose pull  # 拉取最新镜像

docker compose up -d  # 启动容器，-d 后台启动

dcker compose down  # 停止并删除容器

docker compose logs -f  # 查看容器的日志， --tail 100 查看最近的 100 条日志
```

2. `.env` 环境变量

   - `docker-compose.yaml`会默认去尝试读取同目录下的`.env`文件作为变量值使用
   - `.env`文件的变量只会作用到 `docker-compose.yaml`文件中，不会作用到容器中
   - 需要作用在容器中的变量，需要通过`env_file`或者`environment`定义
   - 如果修改了已经启动的容器的环境变量，通过`restart`是无法做到应用到容器的，需要重新构建容器并启动


3. 完整 docker-compose.yaml 示例

```yaml
version: '3.8'  # 指定 docker-compose 文件的版本

services:
  my_docker_container:  # 服务名称，与 docker run 中的 --name 相对应
    image: my_docker_image  # 指定要使用的镜像
    ports:  # 映射端口
      - "80:8080"  # 将容器的 8080 端口映射到宿主机的 80 端口
    volumes:  # 定义挂载的卷
      - "/path/on/host:/path/in/container"  # 将宿主机的路径挂载到容器中
    environment:  # 配置到容器中的环境变量
      - PORT=8080
    restart: always  # 容器退出时总是重启
```


## 疑问与解答

1. 怎么查看一个现有镜像的 Dockerfile 文件？
- 无法直接查看。
  1. 如果镜像的 DockerHub 页面给出了 Dockerfile 文件，那可以看到，但也是别人给你的而不是直接从镜像中得到的。
  2. 可以通过一些工具去反编译 docker 镜像。
  3. 通过 `docker history` 命令查看镜像构建历史。类似与你无法确定一个`.exe`文件会做什么、怎么做的，你也无法确定一个docker镜像会创建什么样的容器、怎么创建的容器。同样的，就像你无法保证一个`.exe`文件是安全的，一个镜像也不一定是决定安全的。

2. docker 启动的容器的数据会保留吗
- 如果只是停止了容器，再次启动容器时，数据会保留，因为容器的文件系统和状态未被重置；如果是删除了容器，那么再次通过镜像启动容器时，数据将不会存在。
- Docker 容器的数据持久化主要依赖于数据卷（Volumes）或绑定挂载（Bind Mounts）
  1. 数据卷（Volumes）：Docker 可以创建数据卷来持久化容器数据。数据卷是一个专门用于持久化数据的仓库，它在文件系统中独立于容器的生存周期。即使容器被删除，数据卷中的数据仍然存在，直到显式地删除数据卷。 
  2. 绑定挂载（Bind Mounts）（最常用方式）：可以将宿主机的文件系统目录或文件挂载到容器内部，这样容器内的数据就会存储在宿主机的指定位置。即容器使用宿主机的磁盘。
  3. 如果数据直接写入容器的文件系统，而没有使用数据卷或绑定挂载，那么当容器被删除时，这些数据也会丢失。

  - 当使用数据卷或绑定挂载时，即使容器停止或被销毁，数据仍然安全地存储在指定的位置。下次启动相同名称的容器时，可以使用相同的数据卷或挂载点，这样数据库就可以继续访问之前的数据。

  - 如果没有做容器的数据的持久化处理，那在容器停止后，容器里的数据会丢失。


    ```bash
    docker volume create my_volume  # 创建一个卷

    docker run -d -v my_volume:/path/in/container my_image  # 使用卷启动容器

    # 或者进行绑定挂载启动容器
    docker run -d -v /path/on/host:/path/in/container my_image
    ```

3. 从 dockerhub 上拉取的镜像存储在了哪里，如何找到我已经拉取的那个镜像文件，镜像文件可以随意移动位置吗？

+ Docker 会将镜像文件存储在本地的 Docker 镜像文件夹中。
+ docker 镜像文件无法移动，镜像文件是由多个层组成的，Docker 会将每一层存储在镜像库中，并在需要时重新构建镜像。Docker 需要通过其内部机制来管理这些文件。
+ 可以使用 docker save 命令将镜像保存为一个 tar 文件 `docker save -o myimage.tar myimage:tag`
+ 使用 docker load 命令重新加载镜像的 tar 文件 `docker load -i myimage.tar`
+ 使用 docker inspect 命令可以查看镜像的详细信息 `docker inspect myimage:tag`


4. 某个项目用 docker 启动，代码更新后，docker上的东西需要跟随代码更新吗，如何更新

- 如果是本地的代码并构建的镜像：
  1. 更新 Dockerfile（如果需要的话）
  2. 构建新镜像 `docker build`
  3. 停止并删除旧容器
  4. 通过新镜像构建容器

- 如果是 dockerhub 上拉取的镜像有了更新：
  1. 重新拉取镜像 `docker pull`
  2. 停止并删除旧容器
  3. 运行新容器

- 如果是在容器中进行了更新代码等操作，可以根据容器重打一个新镜像
  1. `docker commit <容器名> <镜像名:v1.1>`
  2. 根据新镜像重新启动容器

## 其它知识

1. 推送镜像到 dockerhub 或 harbor 等仓库

```bash
# 登录个人账号
docker login
## 默认是 hub.docker.com ，可以指定仓库地址，如果 docker login xxx.com

# 可以为镜像打一个命名空间格式的镜像名和标签，可直接推送到目标仓库
docker tag my_image:v1.2 xxx.com/my/my_image:v1.2  # 没有命令空间的标识，则推到默认的 hub.docker.com

docker xxx.com/my/my_image:v1.2
```

## 参考链接

- https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html
- http://www.dockerinfo.net/
- https://yeasy.gitbook.io/docker_practice/contributing
- docker快速入门手册：https://docker.easydoc.net/doc/81170005/cCewZWoN/lTKfePfP
- https://www.bilibili.com/video/BV14s4y1i7Vf/?p=1
- docker在线平台：https://labs.play-with-docker.com/