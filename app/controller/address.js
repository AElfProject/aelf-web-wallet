/**
 * @file address.js
 * @author huangzongzhe
 */
'use strict';

const Controller = require('../core/baseController.js');
const {apiServerProvider} = require('../../config/config.node.js');
const {getNodesInfo} = require('../utils/utils.js');

class addressController extends Controller {
    // the structure of return data is almost the same as the getTokens API of aelf-block-api.
    async getTokens() {
        let ctx = this.ctx;

        const keysRule = {
            address: 'string',
            limit: {
                type: 'int',
                required: false,
                allowEmpty: true,
                max: 500,
                min: 0
            },
            page: {
                type: 'int',
                required: false,
                allowEmpty: true,
                min: 0
            }
        };

        try {
            let {
                address,
                limit,
                page
            } = ctx.request.query;
            let options = {
                address,
                limit: limit ? parseInt(limit, 0) : 0,
                page: page ? parseInt(page, 0) : 0
            };

            ctx.validate(keysRule, options);

            const nodesInfo = (await ctx.curl(apiServerProvider
                + `/api/address/tokens?address=${address}&nodes_info=1&limit=${limit}&page=${page}`, {
                dataType: 'json'
            })).data;

            const result = await ctx.service.address.getTokens(options, nodesInfo);
            this.formatOutput('get', result);
        }
        catch (error) {
            this.formatOutput('error', error, 422);
        }
    }
}

module.exports = addressController;
