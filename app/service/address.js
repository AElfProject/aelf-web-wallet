/**
 * @file service/address.js
 * @author huangzongzhe
 * 2018.12
 */
/* eslint-disable fecs-camelcase */

const Service = require('../core/baseService');
const {nodesHttpProviderSelect} = require('../utils/utils');

const GETBALANCETIMEOUT = 1000;

class ProxyService extends Service {

    async getTokens(options, nodesInfo) {
        const getTokensBalance = () => new Promise((resolve, reject) => {
            const ctx = this.ctx;

            let tokensInfoArray = [];
            const nodesInfoLength = nodesInfo.length;
            tokensInfoArray.length = nodesInfoLength;
            let nodesInfoCount = 0;

            nodesInfo.map((item, index) => {
                // https://eggjs.org/zh-cn/basics/plugin.html
                // TODO: Initial Aelf
                const contract_address = item.contract_address;
                const url = nodesHttpProviderSelect(item.api_domain, item.api_ip)
                    + '/api/address/balance?'
                    + `address=${options.address}`
                    + `&contract_address=${contract_address}`;

                let tokenInfo = {};

                ctx.curl(url, {
                    dataType: 'json',
                    timeout: GETBALANCETIMEOUT
                }).then(resut => {
                    tokenInfo = resut.data;
                    tokenInfo.error = 0;

                }).catch(error => {
                    let message = error.message;
                    // Don not expose IP.
                    message = message.split(',')[0];
                    tokenInfo.msg = message;
                    tokenInfo.error = 1;

                }).finally(() => {
                    tokenInfo.token_name = item.token_name;
                    tokenInfo.chain_id = item.chain_id;
                    tokenInfo.symbol = item.symbol;
                    tokenInfo.name = item.name;
                    tokenInfo.address = options.address;
                    tokenInfo.contract_address = contract_address;

                    tokenInfo.income = tokenInfo.income || 0;
                    tokenInfo.expenditure = tokenInfo.expenditure || 0;
                    tokenInfo.balance = tokenInfo.balance || 0;

                    tokensInfoArray[index] = tokenInfo;
                    nodesInfoCount++;

                    if (nodesInfoCount === nodesInfoLength) {
                        resolve(tokensInfoArray);
                    }
                });
            });
        });

        const tokensBalance = await getTokensBalance();

        return tokensBalance;
    }

}

module.exports = ProxyService;