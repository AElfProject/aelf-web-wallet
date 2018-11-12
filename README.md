# AElf Web Wallet

## Quick Start

### 0.Dependecies

1.The RPC URL of AElf Node.

2.[aelf-block-api](https://github.com/AElfProject/aelf-block-api)

3.NodeJS: You can see the JS dependencies in pakage.json, we use egg.js(Node.js & Koa).

4.Nginx (or others) // Use SSL for Secure, And Use Proxy for cross-origin.

### 1.Change config
1. Set config.default.js // set your own config.keys

2. Set config/config.node.js // set you own rpc url.

### 2.Start the node server

npm install

dev: npm run dev

pro: npm start

default port: 7001

### 3.Nginx

online: nginx/servers/wallet.online.conf

dev: nginx/servers/wallet.conf

# Docker
todo