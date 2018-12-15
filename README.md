# AElf Web Wallet

## Quick Start

Please ensure your dependencies are ready.

If you meet some permission problem, please use 'sudo'.

```shell
bash build.sh < type|optional > < node_moduels|optinal >
// if you only want to use the second param, you must set the type=""
bash build.sh dev
bash build.sh dev reinstall
bash build.sh "" reinstall

bash build.sh === bash build.sh pro
```

### 0.Dependencies

1.The RPC URL of AElf Node.

2.[aelf-block-api](https://github.com/AElfProject/aelf-block-api)

3.NodeJS: You can see the JS dependencies in pakage.json, we use egg.js(Node.js & Koa).

4.Nginx (or others) // Use SSL for Secure, And Use Proxy for cross-origin.

5.Correct config.

### 1.Change config

```shell
cp config/demo.config.default.js config/config.default.js 
// set your own config.keys

cp config/demo.config.node.js config/config.node.js
// set you own httpProvider
// set your own default mainContract
```

### 2.Nginx

Please set your own RPC URL.

Please ser your own server_name.

online(https): nginx/servers/wallet.online.conf

dev(http): nginx/servers/wallet.conf

### 3.Start the node server

npm install

dev: npm run dev

pro: npm start

default port: 7001

# Docker[TODO]