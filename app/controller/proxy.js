/**
 * @file proxy.js
 * @author huangzongzhe
 */
// The framework recommends that the Controller layer is responsible for processing request parameters(verification and transformation)
// from user's requests, then calls related business methods in Service, encapsulates and sends back business result:
// 1.retrieves parameters passed by HTTP.
// 2.verifies and assembles parameters.
// 3.calls the Service to handle business, if necessary,
//          transforms Service process results to satisfy user's requirement.
// 4.sends results back to user by HTTP.
// 框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：
// 获取用户通过 HTTP 传递过来的请求参数。
// 校验、组装参数。
// 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
// 通过 HTTP 将结果响应给用户。
'use strict';

const Controller = require('../core/baseController.js');
const {apiServerProvider} = require('../../config/config.node.js');

// token=ELF&action=address_transactions&params=xxx
const getKeysRule = {
    token: 'string',
    ptype: 'string',
    action: 'string',
    query: 'object',
    nodesInfo: 'object',
};

const postKeysRule = {
    token: 'string',
    ptype: 'string',
    action: {
        type: 'string',
        required: false,
        allowEmpty: true
    },
    body: 'object',
    nodesInfo: 'object'
};

// TODO. Get list from redis.
// get list from api now.
async function getNodesInfo(ctx, curlOptions = {}) {
    const nodesInfo = await ctx.curl(apiServerProvider + '/api/nodes/info', curlOptions);
    if (nodesInfo && nodesInfo.data) {
        return nodesInfo.data.list;
    }
    throw Error('no information of nodes.');
}

class ProxyController extends Controller {
    async getProxy() {
        let ctx = this.ctx;

        try {
            let {
                token,
                ptype,
                action
            } = ctx.request.query;
            let options = {
                token,
                ptype,
                action,
                nodesInfo: await getNodesInfo(ctx, {
                    dataType: 'json'
                }),
                query: ctx.request.query
            };

            ctx.validate(getKeysRule, options);

            const result = await ctx.service.proxy.getProxy(options);
            this.formatOutput('get', result);
        }
        catch (error) {
            this.formatOutput('error', error, 422);
        }
    }

    async postProxy() {
        let ctx = this.ctx;

        try {
            let {
                token,
                ptype,
                action
            } = ctx.request.query;
            let body = ctx.request.body;
            let options = {
                token,
                ptype,
                action,
                body,
                nodesInfo: await getNodesInfo(ctx, {
                    dataType: 'json'
                })
            };

            ctx.validate(postKeysRule, options);

            const result = await ctx.service.proxy.postProxy(options);
            this.formatOutput('post', result);
        }
        catch (error) {
            this.formatOutput('error', error, 422);
        }
    }
}

module.exports = ProxyController;
