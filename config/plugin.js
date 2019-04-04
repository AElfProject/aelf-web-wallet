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

exports.proxy = {
    enable: true,
    package: 'egg-proxy'
};

exports.aelf = {
    enable: true,
    package: 'egg-aelf'
};
