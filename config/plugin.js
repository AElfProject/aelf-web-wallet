'use strict';

// had enabled by egg
// exports.static = true;
// exports.react = {
//   enable: true,
//   package: 'egg-view-react',
// };
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};
// exports.view = {
//   enable: true,
//   package: 'egg-view',
// };

exports.proxy = {
  enable: true,
  package: 'egg-proxy',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};