# AElf Web Wallet

## 0.Dependencies

- Start up
[AElf Chain](https://github.com/AElfProject/AElf),
[aelf-block-scan](https://github.com/AElfProject/aelf-block-scan),
[aelf-block-api](https://github.com/AElfProject/aelf-block-api)
at first

- `important` call the API[POST:api/nodes/info] of aelf-block-api to insert the AElf Node information.
  - Detail the APIs [Postman share link](https://www.getpostman.com/collections/6332e0fab94cdacc9c35)
  - You can update the information throught the PUT API.

- NodeJS: You can see the JS dependencies in pakage.json, we use egg.js(Node.js & Koa).

- Correct config.

- `optional` Nginx (or others) // SSL for Secure, Proxy for cross-origin.

## 1.Change config

```shell
config/config.default.js
# set your own metaSource // api from aelf-block-api
# set your own config.keys
# set your own sequelize

config/config.node.js
# set you own apiServerProvider // api from aelf-block-api
# set your own default mainTokenName & mainTokenContract

database/config.json
# set your sql config for sequelize
```

## 2.Install Webpack & compile front files

```bash
npm install -g webpack
npm install -g webpack-cli

npm run build
# npm run build:dev
# npm run build:dev:w
```

## 3.Operate mysql by sequelize

```bash
npm run create-db
# npm run create-db:dev
npm run migrate
# npm run migrate:dev
# npm run undo-all
# npm run undo-all:dev
```

## 3.Start the node server

```bash
npm install
# If meet permisson problem.
# sudo npm install --unsafe-perm=true --allow-root

# dev
npm run dev
# pro
npm start
```

default port: 7001

## Nginx(For Your Information)

How to open gizp.

How to config https.(We do not config https server in nodejs.)

How to proxy in nginx instead of proxy in nodejs.

- nginx.conf
  - see how to open gizp

- servsers/wallet.online.conf & servsers/wallet.conf
  - set your own RPC URL.
  - set your own server_name.
  - `when use online(https)`set your own ssl_certificate and ssl_certificate_key.

And please use plugin.nginx.js & demo.config.default.nginx.js instead of plugin.js & demo.config.defalut.js

## FAQ

### permission denied, open '/home/zhengyue/github/aelf-web-wallet/.travis.yml'

### no such file or directory, scandir '/opt/aelf/app/aelf-web-wallet/node_modules/node-sass/vendor'

https://github.com/eggjs/egg/issues/2442#issuecomment-421895549

```bash
sudo npm install --unsafe-perm=true --allow-root
# Then
bash build.sh pro # or npm start
```

### How to deal with int64

Use Long.js

https://www.npmjs.com/package/long

## Docker[TODO]
