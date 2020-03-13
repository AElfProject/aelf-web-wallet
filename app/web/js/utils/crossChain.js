/**
 * @author hzz780
 * @file crossChain.js
 * 2020.02.15
 * Beijing
 */
import AElf from 'aelf-sdk';
import {CrossChain} from 'aelf-sdk-cross-chain';
import checkStatus from './checkStatus';
import {
    get
} from './apisauce';

const CSRF = document.cookie.match(/csrfToken=[^;]*/)[0].replace('csrfToken=', '');
export class CrossChainMethods {
    constructor(options) {
        this.wallet = options.wallet;
        this.WEB_API_INFO = options.WEB_API_INFO;
        this.TOKEN_CROSS_SUPPORT = options.TOKEN_CROSS_SUPPORT;

        this.sendInfoDefault = {
            sendNode: null,
            receiveNode: null,
            mainChainId: null,
            issueChainId: null
        };
        this.sendParamsDefault = {
            transfer: {
                to: null,
                symbol: null,
                amount: null,
                memo: null
            },
            fromChain: null
        };
        this.crossChainInstance = null;
    }

    async crossChainInstanceInit(params) {
        if (this.crossChainInstance) {
            return this.crossChainInstance;
        }

        const wallet = this.wallet;

        const {fromChain, transfer} = params;
        const {to: toAddress} = transfer;
        const toChain = this.getChainName(toAddress);

        const {symbol} = transfer;
        const {issueChainId} = this.TOKEN_CROSS_SUPPORT[symbol];

        const toChainAPIInfo = this.WEB_API_INFO[toChain];
        const fromChainAPIInfo = this.WEB_API_INFO[fromChain];

        this.sendInfoDefault = {
            sendNode: fromChainAPIInfo.url,
            receiveNode: toChainAPIInfo.url,
            mainChainId: this.WEB_API_INFO.AELF.id,
            issueChainId
        };
        console.log('sendInfoDefault: ', this.sendInfoDefault);

        const receiveInstance = new AElf(new AElf.providers.HttpProvider(toChainAPIInfo.url));
        const sendInstance = new AElf(new AElf.providers.HttpProvider(fromChainAPIInfo.url));
        const crossChainInstance = new CrossChain({
            AElfUtils: AElf.utils,
            sendInstance,
            receiveInstance,
            wallet,
            // TODO: use api to getTokenInfo.
            // A good news is that we only support AELF, EPC, EDA, EDB, EDC, EDD to crossChain now.
            mainChainId: this.WEB_API_INFO.AELF.id,
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
        this.crossChainInstance = crossChainInstance;
        return crossChainInstance;
    }

    // {
    //     transfer: {
    //         to: receiveAddress,
    //         symbol: 'ELF',
    //         amount: 1,
    //         memo: 'to be or not to be.'
    //     },
    //     amountShow: 1 * 10^-8,
    //     fromChain: 'AELF':
    //    // toChain: 'tDVV': // get from transfer to
    // }
    async send(params) {
        this.sendParamsDefault = params;
        const preSendInfo = this.isReadyToSend(params);
        if (preSendInfo.isNotReady) {
            return preSendInfo;
        }

        const crossChainInstance = await this.crossChainInstanceInit(params);
        const {
            crossTransferTxId
        } = await crossChainInstance.send(params.transfer);

        console.log('crossTransferTxId: ', crossTransferTxId);

        await this.bindSent({
            txId: crossTransferTxId,
            amountShow: params.amountShow
        });

        return crossTransferTxId;
    }

    // {
    //     crossTransferTxId,
    //     transfer: {
    //         to: receiveAddress,
    //         symbol: 'ELF',
    //         amount: 1,
    //         memo: 'to be or not to be.'
    //     },
    //     fromChain: 'AELF':
    // }
    // TODO: Error of Cross SDK; throw Error but not return error:1
    // config: 1.address send the cross transfer, 2.primary token info
    async receive(params, balanceCheckConfig) {
        const isReadyToRecevie = await this.isChainReadyToReceive(params, balanceCheckConfig);

        if (isReadyToRecevie.error) {
            throw Error(isReadyToRecevie.message);
        }

        const crossChainInstance = await this.crossChainInstanceInit(params);
        const {crossTransferTxId} = params;
        console.log('crossTransferTxId: ', crossTransferTxId);
        const receiveInfo = await crossChainInstance.receive({
            // crossTransferTxId: 'f0263bb88a2fb392b174abb548432fa1dc8e8f8193b6b44841b9f048cecb414a'
            crossTransferTxId
        });
        if (receiveInfo.error) {
            throw Error(receiveInfo.message);
        }
        await this.markReceived({
            txId: crossTransferTxId
        });
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
    async isChainReadyToReceive(params, balanceCheckConfig) {
        const crossChainInstance = await this.crossChainInstanceInit(params);
        const {crossTransferTxId} = params;

        const {symbol, owner, toChain} = balanceCheckConfig;
        const balance
          = await crossChainInstance.tokenCrossChainInstance.aelfInstance.tokenContractReceive.GetBalance.call({
              // target chain primary token
              symbol,
              // the address send the token
              owner
          });
        if (balance.balance <= 10 ** 8) {
            throw Error(`Insufficient ${symbol} in chain ${toChain} to pay the fee.`);
        }
        return await crossChainInstance.isChainReadyToReceive({
            crossTransferTxId
            // crossTransferTxId: '688f6386a66fae9e6994a1a8e49ff2e22534c159ed91787ad120d6179c2e35cb'
        });
    }

    isReadyToSend(params) {
        const {transfer} = params;
        const {to: toAddress} = transfer;
        const toChain = this.getChainName(toAddress);

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

        return {
            isNotReady: false,
            message: ''
        };
    }

    // name AELF; id: 9992731
    getChainName(address) {
        const chainName = address.split('_')[2];
        if (chainName) {
            return address.split('_')[2];
        }
        throw Error('Invalid address, please use ELF_xxx_chainName.');
    }

    // {
    //       "tx_id": "7578daf824216c9faf6e08d84c6744615c420aa84199a1962a77e9789a4b5872",
    //       "address": "2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX",
    //       "from": "address",
    //       "to": "address",
    //       "symbol": "ELF",
    //       "amount": "1",
    //       "memo": "2333",
    //       "time": "1581871716203",
    //       "send_node": "http://54.199.254.157:8000",
    //       "receive_node": "http://3.112.250.87:8000",
    //       "main_chain_id": "9992731",
    //       "issue_chain_id": "9992731",
    //       "signed_address": {
    //         "r":"5440bb599df0ab0fb915903c2ce6b379470fd21695aafdbad0688149fb70a4a5",
    //           "s":"68e580685cdc312877aa267bc1d258d9181f25e2bff9e8b96e4992d467324c5e",
    //           "recoveryParam":1
    //     },
    //         "public_key": {
    //             "x":"84dc77d6b059d50156bc1a803203a2733dc591ae1358d7538c001565380b6c47",
    //             "y":"7b268a32baa6e609e41c0920b6b0eff3bee7ac3fc72148a3f89cb6579e256fa5"
    //     }
    // }
    bindSent(options) {
        const localWalletInfo = getLocalWallet();
        const {address, signedAddress, publicKey} = localWalletInfo;

        const {txId, transferParams, sendInfo, amountShow} = options;

        const transferParamsTemp = transferParams || this.sendParamsDefault;
        const {transfer} = transferParamsTemp;
        const {to, symbol, amount, memo} = transfer;

        const sendIntoTemp  = sendInfo || this.sendInfoDefault;
        const {sendNode, receiveNode, mainChainId, issueChainId} = sendIntoTemp;

        return fetch('/cross/api/sent', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'x-csrf-token': CSRF,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                tx_id: txId,
                from: address,
                to,
                symbol,
                amount: amountShow,
                memo: memo + '',
                time: (new Date()).getTime() + '',
                send_node: sendNode,
                receive_node: receiveNode,
                main_chain_id: mainChainId + '',
                issue_chain_id: issueChainId + '',
                signed_address: signedAddress,
                public_key: publicKey
            })
        }).then(checkStatus).then(result => result);
    }

    markReceived(options) {
        const {txId} = options;
        const localWalletInfo = getLocalWallet();
        const {address, signedAddress, publicKey} = localWalletInfo;

        return fetch('/cross/api/received', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'x-csrf-token': CSRF,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                tx_id: txId,
                address,
                signed_address: signedAddress,
                public_key: publicKey
            })
        }).then(checkStatus);
    }

    getList(options) {
        const {offset, limit, address} = options;

        return get('/cross/api/list', {
            offset, // 13
            limit, // 0
            address // asc
        });
    }
}

function getLocalWallet() {
    let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
    let address = JSON.parse(localStorage.lastuse).address;
    return {
        address,
        signedAddress: walletInfoList[address].signedAddress,
        publicKey: walletInfoList[address].publicKey
    };
}

window.CrossChainMethods = CrossChainMethods;
window.Wallet = AElf.wallet;
