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
  // config.proxy = {
  //   url: 'http://localhost:1234/chain', // target host that matched path will be proxy to
  //   match: /\/aelf\/api/ // path pattern.
  // };

  config.mysql = {
    clients: {
      // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
      aelf0: {
        // host
        // host: 'mysql.com',
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '',
        // 数据库名
        database: 'aelf_test',
      }
      // ,
      // db2: {
      //   // host
      //   host: 'mysql2.com',
      //   // 端口号
      //   port: '3307',
      //   // 用户名
      //   user: 'test_user',
      //   // 密码
      //   password: 'test_password',
      //   // 数据库名
      //   database: 'test',
      // },
      // ...
    },
    // 所有数据库配置的默认值
    default: {

    },

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  // config.view = {
  //   mapping: {
  //     '.js': 'react',
  //     '.jsx': 'react',
  //   },
  // };

  return config;
};