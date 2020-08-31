/**
 * @file address.js
 * @author huangzongzhe
 */
/* eslint-disable fecs-camelcase */
'use strict';

const Controller = require('../core/baseController.js');
const {
  apiServerProvider,
  mainTokenContract
} = require('../../config/config.node.js');

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
                max: 100,
                min: 0
            },
            page: {
                type: 'int',
                required: false,
                allowEmpty: true,
                min: 0
            },
            contract_address: {
                type: 'string',
                required: false,
                allowEmpty: true,
                min: 0
            },
            all: {
                type: 'bool',
                required: false,
                allowEmpty: true
            }
        };

        try {
            let {
                address,
                limit,
                page,
                contract_address,
                symbol,
                all,
            } = ctx.request.query;
            let options = {
                address,
                limit: limit ? parseInt(limit, 0) : 0,
                page: page ? parseInt(page, 0) : 0,
                contract_address: contract_address || '',
                symbol: symbol || '',
                all: all === 'true',
            };

            ctx.validate(keysRule, options);

            let nodesInfo;
            let tokenInfo;
            if (options.all) {
                nodesInfo = await ctx.service.address.getMultiTokensInfo(options);
                tokenInfo = nodesInfo;
            } else {
                const getNodesInfo = ctx.curl(
                  apiServerProvider
                  + `/api/address/tokens?address=${address}&nodes_info=1&limit=${limit}&page=${page}`, {
                      dataType: 'json'
                  }
                );
                const getTokenInfo = ctx.service.address.getMultiTokensInfo({});

                const result = await Promise.all([getNodesInfo, getTokenInfo]);
                nodesInfo = result[0].data;
                tokenInfo = result[1];
            }

            const tokenInfoFormatted = {};
            tokenInfo.forEach(item => {
                tokenInfoFormatted[item.symbol] = item;
            });

            if (contract_address) {
                nodesInfo = [nodesInfo.find(item => {
                    if (item.contract_address === contract_address
                        && item.symbol === symbol) {
                        return true;
                    }
                })];
            }

            let result = [];
            if (nodesInfo.length) {
                result = await ctx.service.address.getTokens(options, nodesInfo, tokenInfoFormatted);
            }

            this.formatOutput('get', result);
        }
        catch (error) {
            this.formatOutput('error', error, 422);
        }
    }

    async getTokensInfo() {
        const { ctx } = this;
        const { page, limit } = ctx.query;

        try {
            const keysRule = {
                page: {
                    type: 'int',
                    required: true,
                    allowEmpty: true,
                    min: 0
                },
                limit: {
                    type: 'int',
                    required: true,
                    allowEmpty: true,
                    max: 100,
                    min: 0
                }
            };

            const options = {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10)
            };

            ctx.validate(keysRule, options);

            this.formatOutput('get', await ctx.service.address.getMultiTokensInfo(options));
        } catch(error) {
            this.formatOutput('error', error, 422);
        }
    }
}

module.exports = addressController;
