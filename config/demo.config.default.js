'use strict';

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
  // config.proxy = {
  //   url: 'http://localhost:1234/chain', // target host that matched path will be proxy to
  //   match: /\/aelf\/api/ // path pattern.
  // };

  return config;
};