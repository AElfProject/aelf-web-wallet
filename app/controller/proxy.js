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

const Controller = require('egg').Controller;
const nodeConfig = require('../../config/config.node.js');

class ProxyController extends Controller {
    async proxy() {
        let ctx = this.ctx;
        let result = await ctx.service.proxy.getProxy();
        ctx.status = 200;
        ctx.body = JSON.stringify({hzz:1});
    }
}

module.exports = ProxyController;
