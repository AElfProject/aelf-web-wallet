'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532058713465_9824';

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  // use nginx
  // config.proxy = {
  //   host: 'http://localhost:1234', // target host that matched path will be proxy to
  //   match: /\/aelf\/api/ // path pattern.
  // }

  // config.view = {
  //   mapping: {
  //     '.js': 'react',
  //     '.jsx': 'react',
  //   },
  // };

  return config;
};