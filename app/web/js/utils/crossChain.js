/**
 * @author hzz780
 * @file crossChain.js
 * 2020.02.15
 * Beijing
 */
import AElf from 'aelf-sdk';
import {CrossChain} from 'aelf-sdk-cross-chain';

const Wallet = AElf.wallet;

export class CrossChainMethods {
    constructor(options) {
        this.wallet = options.wallet;
        this.WEB_API_INFO = options.WEB_API_INFO;
        this.TOKEN_CROSS_SUPPORT = options.TOKEN_CROSS_SUPPORT;
    }

    async crossChainInstanceInit(params) {
        const wallet = this.wallet;

        const {fromChain, toChain, transfer} = params;

        const {symbol} = transfer;
        const {issueChainId} = this.TOKEN_CROSS_SUPPORT[symbol];

        const toChainAPIInfo = this.WEB_API_INFO[toChain];
        const fromChainAPIInfo = this.WEB_API_INFO[fromChain];

        const receiveInstance = new AElf(new AElf.providers.HttpProvider(toChainAPIInfo.url));
        const sendInstance = new AElf(new AElf.providers.HttpProvider(fromChainAPIInfo.url));
        const crossChainInstance = new CrossChain({
            AElfUtils: AElf.utils,
            sendInstance,
            receiveInstance,
            wallet,
            // TODO: use api to getTokenInfo.
            // A good news is that we only support AELF, EPC, EDA, EDB, EDC, EDD to crossChain now.
            issueChainId,
            queryLimit: 1
        });

        await crossChainInstance.init({
            contractAddresses: {
                tokenContractAddressSend: fromChainAPIInfo.mainTokenContract,
                crossChainContractAddressSend: fromChainAPIInfo.crossChainContract,
                tokenContractAddressReceive: toChainAPIInfo.mainTokenContract,
                crossChainContractAddressReceive: toChainAPIInfo.crossChainContract
            },
            chainIds: {
                chainIdSend: fromChain,
                chainIdReceive: toChain
            }
        });
        return crossChainInstance;
    }

    // {
    //     transfer: {
    //         to: receiveAddress,
    //         symbol: 'ELF',
    //         amount: 1,
    //         memo: 'to be or not to be.'
    //     },
    //     fromChain: 'AELF':
    //     toChain: 'tDVV':
    // }
    async send(params) {
        const preSendInfo = this.isReadyToSend(params);
        if (preSendInfo.isNotReady) {
            return preSendInfo;
        }

        const crossChainInstance = await this.crossChainInstanceInit(params);
        const {
            crossTransferTxId
        } = await crossChainInstance.send(params.transfer);
        // TODO store the params in localStorage
        console.log('crossTransferTxId: ', crossTransferTxId);
        return crossTransferTxId;
    }

    // {
    //    crossTransferTxId,
    //    fromChain:
    //    toChain:
    // }
    async receive(params) {
        const crossChainInstance = await this.crossChainInstanceInit(params);
        const {crossTransferTxId} = params;
        console.log('crossTransferTxId: ', crossTransferTxId);
        const receiveInfo = await crossChainInstance.receive({
            // crossTransferTxId: 'f0263bb88a2fb392b174abb548432fa1dc8e8f8193b6b44841b9f048cecb414a'
            crossTransferTxId
        });
        // TODO remove the params in localStorage
        // The best way, after confirmed
        return receiveInfo;
    }

    // {
    //    crossTransferTxId,
    //    fromChain:
    //    toChain:
    // }
    // TODO use api at first
    // http://127.0.0.1:7000/api/cross-chain/is-ready-to-receive?
    // send=http://54.199.254.157:8000
    // &receive=http://3.112.250.87:8000
    // &main_chain_id=9992731&issue_chain_id=9992731
    // &cross_transfer_tx_id=841988ce167d5c6ae6a791c0113ef95dd57840b32275e5854a056af40eb13608
    async isChainReadyToReceive(params) {
        const crossChainInstance = await this.crossChainInstanceInit(params);
        const {crossTransferTxId} = params;
        return await crossChainInstance.isChainReadyToReceive({
            crossTransferTxId
            // crossTransferTxId: '688f6386a66fae9e6994a1a8e49ff2e22534c159ed91787ad120d6179c2e35cb'
        });
    }

    isReadyToSend(params) {
        const {transfer, toChain} = params;

        const {symbol} = transfer;
        if (!this.TOKEN_CROSS_SUPPORT[symbol]) {
            return {
                isNotReady: true,
                message: `Do not support ${symbol} yet.`
            };
        }

        if (!this.WEB_API_INFO[toChain]) {
            return {
                isNotReady: true,
                message: `${toChain} is not existed.`
            };
        }

        const {id, feeToken, url} = this.WEB_API_INFO[toChain];
        const {readyTo} = this.TOKEN_CROSS_SUPPORT[symbol];
        // match the chain rules! eg: AELF->tDVV transfer epc is ok, tDVV->tDVX transfer epc is not ok
        if (!readyTo.includes(id)) {
            return {
                isNotReady: true,
                message: `Do not support ${symbol} transfer to ${toChain} yet.`
            };
        }

        // TODO: is insufficient?
        // const receiveInstance = new AElf(new AElf.providers.HttpProvider(url));
        //
        // return {
        //     isNotReady: false,
        //     message: 'insufficient'
        // }; // true / false

        return {
            isNotReady: false,
            message: ''
        };
    }
}

window.CrossChainMethods = CrossChainMethods;
window.CrossChain = CrossChain;

// 2RCLmZQ2291xDwSbDEJR6nLhFJcMkyfrVTq1i1YxWC4SdY49a6
const defaultPrivateKey = '07da45c0a4cbe8e791c9249ed0255069ffac635e0da8650f05b19993ab109936';
const wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);

window.cross = new window.CrossChainMethods({
    wallet,
    WEB_API_INFO: window.defaultConfig.WEB_API_INFO,
    TOKEN_CROSS_SUPPORT: window.defaultConfig.TOKEN_CROSS_SUPPORT
});
// var params = {
//     transfer: {
//         to: '2RCLmZQ2291xDwSbDEJR6nLhFJcMkyfrVTq1i1YxWC4SdY49a6',
//         symbol: 'ELF',
//         amount: 1,
//         memo: 'to be or not to be.'
//     },
//     fromChain: 'AELF',
//     toChain: 'tDVV'
// };
// cross.send(params).then(result => {console.log(result);}).catch(error => {console.log(error);});
// //
// var time = (new Date()).getTime();
//
// cross.isChainReadyToReceive({
//     crossTransferTxId: '841988ce167d5c6ae6a791c0113ef95dd57840b32275e5854a056af40eb13608'
// }).then(result => {
//     console.log((new Date()).getTime() - time);
//     console.log(result);
// }).catch(error => {
//     console.log(error);
// });
