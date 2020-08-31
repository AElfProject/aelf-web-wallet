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
                // console.log('item2333', item, item.symbol);
                contractInstance.GetBalance.call({
                    symbol: item.symbol,
                    owner: options.address
                }, (err, result) => {
                    tokensInfoArray[index] = {
                        token_name: item.symbol,
                        chain_id: item.chain_id,
                        symbol: item.symbol,
                        decimals: tokenInfoFormatted[item.symbol].decimals,
                        name: item.name,
                        address: options.address,
                        contract_address: item.contract_address,
                        balance: result.balance || 0
                    };
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

            });
        });

        return await getTokensBalance();
    }

    async getMultiTokensInfo(options) {
        const { page, limit} = options;

        const aelf0 = this.ctx.app.mysql.get('aelf0');
        const getTxsSql = limit
          ? 'select * from contract_aelf20 order by id limit ? offset ?'
          : 'select * from contract_aelf20 order by id';
        const sqlVal = limit ? [limit, page * limit] : [];

        return await aelf0.query(getTxsSql, sqlVal);
    }

}

module.exports = ProxyService;
