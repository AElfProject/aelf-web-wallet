/**
 * @file config/config.default.js
 * @author huangzongzhe
 * F.Y.I
 * Official default config: node_modules/egg/config/config.default.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + 'your own key';

    // DISCUSS & TODO: proxy API -> plugin???
    // 如果不使用Nginx来代理，请使用这段node代码
    // For dev: you can use these codes instead of the config in nginx.
    config.proxy = [{
        serviceName: 'AElf Node RPC', // never use
        host: 'http://127.0.0.1:7250', // target host that matched path will be proxy to
        match: /^\/chain/, // path pattern.
        map(path) {
          return path.replace(/^\/chain/, '');
        }
    }, {
        serviceName: 'aelf-block-api', // never use
        host: 'http://127.0.0.1:7250', // target host that matched path will be proxy to
        match: /^\/api/, // path pattern.
        map(path) {
            return path.replace(/^\/block/, '');
        }
    }];

    // add your config here
    config.middleware = [];

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        }
    };

    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(__dirname, '../favicon.ico')),
    };

    config.httpclient = {
        // whether to enable local DNS cache, default disable, enable will have two characteristics
        // 1. All DNS lookup will prefer to use the cache by default, even DNS query error does not affects the application
        // 2. For the same hostname, query only once during the interval of dnsCacheLookupInterval (default 10s)
        enableDNSCache: false,
        // minimum interval of DNS query on the same hostname
        dnsCacheLookupInterval: 10000,
        // maximum number of hostname DNS cache simultaneously, default 1000
        dnsCacheMaxLength: 1000,

        request: {
            // default timeout of request
            timeout: 3000
        },

        httpAgent: {
            // default enable http KeepAlive
            keepAlive: true,
            // idle KeepAlive socket can survive for 4 seconds
            freeSocketTimeout: 4000,
            // when sockets have no activity for more than 30s, it will be processed as timeout
            timeout: 30000,
            // maximum number of sockets allow to be created
            maxSockets: Number.MAX_SAFE_INTEGER,
            // maximum number of idle sockets
            maxFreeSockets: 256
        },

        httpsAgent: {
            // default enable https KeepAlive
            keepAlive: true,
            // idle KeepAlive socket can survive for 4 seconds
            freeSocketTimeout: 4000,
            // when sockets have no activity for more than 30s, it will be processed as timeout
            timeout: 30000,
            // maximum number of sockets allow to be created
            maxSockets: Number.MAX_SAFE_INTEGER,
            // maximum number of idle sockets
            maxFreeSockets: 256
        }
    };

    return config;
};
