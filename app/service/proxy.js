/**
 * @file service/proxy.js
 * @author huangzongzhe
 * 2018.12
 */
const Service = require('egg').Service;

class ProxyService extends Service {

    async getProxy(options) {
        return '23333';
    }
}

module.exports = ProxyService;