/**
 * @file config/plugin.js
 * @author huangzongzhe
 */
'use strict';

// had enabled by egg
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};

exports.validate = {
    enable: true,
    package: 'egg-validate'
};

exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};

exports.aelf = {
    enable: true,
    package: 'egg-aelf'
};

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
};
