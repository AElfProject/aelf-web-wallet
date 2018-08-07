/*
 * huangzongzhe
 * 2018.08
 */
'use strict';

const Controller = require('egg').Controller;

function formatOutput(ctx, type, result, errcode) {
	switch (type) {
		case 'get':
			ctx.status = 200;
			break
        case 'get':
            ctx.status = 201;
            break
		case 'put':
			ctx.status = 204;
			break
		case 'error':
			ctx.status = parseInt(errcode, 10);
			break
		default: ;
	}
    ctx.body = JSON.stringify(result);
}

const transactionsRule = {
    address: 'string',
    limit: 'int',
	page: 'int'
};

class ApiController extends Controller {
    async getTransactions() {
    	let ctx = this.ctx;
        try {
        	let {address, limit, page} = ctx.request.query;
        	let options = {
                address: address,
                limit: parseInt(limit, 10),
                page: parseInt(page, 10)
            };
            ctx.validate(transactionsRule, options);
            let result = await ctx.service.api.transactions(options);
            formatOutput(ctx, 'get', result);
        } catch (error) {
            formatOutput(ctx, 'error', error, 422);
        }
    }
    async postTransactions() {
    	let ctx = this.ctx;
        try {
            let {address, limit, page} = ctx.request.body;
            let options = {
                address: address,
                limit: parseInt(limit, 10),
                page: parseInt(page, 10)
            };
            ctx.validate(transactionsRule, options);
            let result = await ctx.service.api.transactions(options);
            formatOutput(ctx, 'post', result);
        } catch (error) {
            formatOutput(ctx, 'error', error, 422);
        }
    }
}

module.exports = ApiController;