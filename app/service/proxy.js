/**
 * @file service/proxy.js
 * @author huangzongzhe
 * 2018.12
 */
// const Service = require('egg').Service;
const Service = require('../core/baseService');

function getNodeInfo(nodesInfo, contract_address) {
    let nodeInfo;
    for (let index = 0, len = nodesInfo.length; index < len; index++) {
        const item = nodesInfo[index];
        if (item.contract_address === contract_address) {
            nodeInfo = item;
            break;
        }
    }
    return nodeInfo;
}

class ProxyService extends Service {

    async getProxy(options) {
        const ctx = this.ctx;
        const {contract_address, ptype, action, query, nodesInfo} = options;

        let nodeInfo = getNodeInfo(nodesInfo, contract_address);

        let result;
        let url;
        let params = '?from=wallet';
        let origin;
        for (const key in query) {
            params += '&' + key + '=' + query[key];
        }
        let actionAndParams = action.replace('_', '/') + params;
        switch (ptype) {
            case 'api':
                origin = nodeInfo.api_domain || nodeInfo.api_ip;
                url = origin + '/api/' + actionAndParams;
                break;
            case 'rpc':
                origin = nodeInfo.rpc_domain || nodeInfo.rpc_ip;
                url = origin + '/chain/' + actionAndParams;
                break;
        }
        // ParamsCheck is ready in API. So, just transfer the params
        result = await ctx.curl(url, {
            dataType: 'json'
        });

        if (ptype === 'rpc') {
            return {
                ...result.data
            };
        }
        return {
            result: result.data
        };
    }

    async postProxy(options) {
        const ctx = this.ctx;
        const {
            contract_address,
            ptype,
            action,
            nodesInfo,
            body
        } = options;

        let nodeInfo = getNodeInfo(nodesInfo, contract_address);

        let url;
        let origin;
        let actionAndParams = action.replace('_', '/');
        switch (ptype) {
            case 'api':
                origin = nodeInfo.api_domain || nodeInfo.api_ip;
                url = origin + '/api/' + actionAndParams;
                break;
            case 'rpc':
                origin = nodeInfo.rpc_domain || nodeInfo.rpc_ip;
                url = origin + '/chain/' + actionAndParams;
                break;
        }
        // ParamsCheck is ready in API. So, just transfer the params
        const result = await ctx.curl(url, {
            // method is required
            method: 'POST',
            // telling HttpClient to send data as JSON by contentType
            contentType: 'json',
            Accept: 'json',
            data: body,
            // telling HttpClient to process the return body as JSON format explicitly
            dataType: 'json'
        });

        if (ptype === 'rpc') {
            return {
                ...result.data
            };
        }
        return {
            result: result.data
        };
    }
}

module.exports = ProxyService;