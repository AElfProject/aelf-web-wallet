/**
 * @file config/demo.config.default.js
 * @author huangzongzhe
 * F.Y.I
 * Official default config: node_modules/egg/config/config.default.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

console.log('__dirname: ', __dirname);

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '';

    // add your config here
    config.middleware = [];

    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };

    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(__dirname, '../favicon.ico')),
    };
    // config.proxy = {
    //   url: 'http://localhost:1234/chain', // target host that matched path will be proxy to
    //   match: /\/aelf\/api/ // path pattern.
    // };

    return config;
};