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

- `important`call the API[POST:api/nodes/info] of aelf-block-api to insert the AElf Node information.
    - Detail the APIs [Postman share link](https://www.getpostman.com/collections/b97c94ea6f024360b7a7)
    - You can update the information throught the PUT API.
    
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

try build.sh at first

```bash
npm install
# If meet permisson problem.
# sudo npm install --unsafe-perm=true --allow-root

# dev
npm run dev
# pro
pro: npm start
```

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
sh build.sh pro # or npm start
```

# Docker[TODO]