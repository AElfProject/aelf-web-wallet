/**
 * @file service/address.js
 * @author huangzongzhe
 * 2018.12
 */
/* eslint-disable fecs-camelcase */

const Service = require('../core/baseService');
// const protoDecode = require('../utils/protoDecode');
// const Long = require('long');
// const {nodesHttpProviderSelect} = require('../utils/utils');

// const GETBALANCETIMEOUT = 1000;

class ProxyService extends Service {

    // use Long.js to deal with Balance.
    async getTokens(options, nodesInfo, tokenInfoFormatted) {
        const getTokensBalance = () => new Promise((resolve, reject) => {
            const ctx = this.ctx;

            let tokensInfoArray = [];
            const nodesInfoLength = nodesInfo.length;
            tokensInfoArray.length = nodesInfoLength;
            let nodesInfoCount = 0;

            const getBalance = (contractInstance, item, index) => {
                contractInstance.GetBalance.call({
                    symbol: item.symbol,
                    owner: options.address
                }, (err, result) => {
                    let tokenInfo = {
                        token_name: item.symbol,
                        chain_id: item.chain_id,
                        symbol: item.symbol,
                        decimals: tokenInfoFormatted[item.symbol].decimals,
                        name: item.name,
                        address: options.address,
                        contract_address: item.contract_address,
                        balance: result.balance || 0
                    };

                    tokensInfoArray[index] = tokenInfo;
                    nodesInfoCount++;

                    if (nodesInfoCount === nodesInfoLength) {
                        resolve(tokensInfoArray);
                    }
                });
            };

            nodesInfo.map((item, index) => {
                // 1.看插件是否初始化了实例，如果初始化了，使用。
                // 2.如果没有初始化，初始化实例，并使用。
                const aelfContractInstances = ctx.app.aelf.contractInstances;
                const {
                    contract_address,
                    chain_id
                } = item;
                if (aelfContractInstances[contract_address + chain_id]) {
                    getBalance(aelfContractInstances[contract_address + chain_id], item, index);
                }
                else {
                    ctx.app.aelf.initContractInstance(item).then(contractInstance => {
                        getBalance(contractInstance, item, index);
                    });
                }

                // Backup 方案, 不走rpc，走 aelf-block-api
                // const contract_address = item.contract_address;
                // const url = nodesHttpProviderSelect(item.api_domain, item.api_ip)
                //     + '/api/address/balance?'
                //     + `address=${options.address}`
                //     + `&contract_address=${contract_address}`;

                // let tokenInfo = {};

                // ctx.curl(url, {
                //     dataType: 'json',
                //     timeout: GETBALANCETIMEOUT
                // }).then(resut => {
                //     tokenInfo = resut.data;
                //     tokenInfo.error = 0;

                // }).catch(error => {
                //     let message = error.message;
                //     // Don not expose IP.
                //     message = message.split(',')[0];
                //     tokenInfo.msg = message;
                //     tokenInfo.error = 1;

                // }).finally(() => {
                //     tokenInfo.token_name = item.token_name;
                //     tokenInfo.chain_id = item.chain_id;
                //     tokenInfo.symbol = item.symbol;
                //     tokenInfo.name = item.name;
                //     tokenInfo.address = options.address;
                //     tokenInfo.contract_address = contract_address;

                //     tokenInfo.income = tokenInfo.income || 0;
                //     tokenInfo.expenditure = tokenInfo.expenditure || 0;
                //     tokenInfo.balance = tokenInfo.balance || 0;

                //     tokensInfoArray[index] = tokenInfo;
                //     nodesInfoCount++;

                //     if (nodesInfoCount === nodesInfoLength) {
                //         resolve(tokensInfoArray);
                //     }
                // });
            });
        });

        const tokensBalance = await getTokensBalance();

        return tokensBalance;
    }

}

module.exports = ProxyService;
