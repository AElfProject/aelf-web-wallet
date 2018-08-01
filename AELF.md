## 空白机器钱包搭建指南

### 1.brew 安装(MAC), debian(Ubuntu)使用apt-get

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### 2.nvm安装

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### 3.node安装

开发部署目前使用的 v8.11.x

nvm install < Latest LTS version >

### 4.Linux上安装nginx

额，apt-get install 要root权限？

### 5.安装egg

### 6.安装tmux保证hold住程序

apt-get install tmux

tmux使用：http://louiszhai.github.io/2017/09/30/tmux/#%E5%AE%89%E8%A3%85

### 7.安装redis
```
// mac上用 brew安装
apt-get -y install redis-server
```

### 8.下载钱包

```
git clone https://github.com/AElfProject/aelf-web-wallet.git
```

### 9.安装webpack

```
npm install -g webpack
npm install -g webpack-cli
```

### 10.启动钱包服务

这里需要写一个脚本，包含webpack编译和egg服务启动。