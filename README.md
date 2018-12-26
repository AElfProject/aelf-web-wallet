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

- Start up
[AElf Chain](https://github.com/AElfProject/AElf),
[aelf-block-scan](https://github.com/AElfProject/aelf-block-scan),
[aelf-block-api](https://github.com/AElfProject/aelf-block-api)
at first

- NodeJS: You can see the JS dependencies in pakage.json, we use egg.js(Node.js & Koa).
- Correct config.
- `optional`Nginx (or others) // Use SSL for Secure, And Use Proxy for cross-origin.

### 1.Change config

```shell
cp config/demo.config.default.js config/config.default.js 
// set your own config.keys

cp config/demo.config.node.js config/config.node.js
// set you own httpProvider
// set your own default mainContract
// set your own proxy
```

### 2.Install Webpack

```javascript
npm install -g webpack
npm install -g webpack-cli
```

### 3.Start the node server

npm install

dev: npm run dev

pro: npm start

default port: 7001

## Nginx(For Your Information.)

How to open gizp.

How to config https.(We do not config https server in nodejs.)

How to proxy in nginx instead of proxy in nodejs.

- nginx.conf
    - see how to open gizp

- servsers/wallet.online.conf & servsers/wallet.conf
    - set your own RPC URL.
    - set your own server_name.
    - `when use online(https)`set your own ssl_certificate and ssl_certificate_key.

## FAQ

### permission denied, open '/home/zhengyue/github/aelf-web-wallet/.travis.yml'

https://github.com/eggjs/egg/issues/2442#issuecomment-421895549

```bash
sudo npm install --unsafe-perm=true --allow-root
# Then
sh build.sh # or npm start
```

# Docker[TODO]