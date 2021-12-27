/**
 * @file initAelf.js
 * @author huangzongzhe,hzz780
 * 2018.07.30
 * init aelf
 */
import Aelf from 'aelf-sdk';
import {Toast} from 'antd-mobile';

import {
    serviceProvider
} from '../utils/utils';
import WalletUtil from "./Wallet/wallet";

let hasAlert = false;

// const TIMEOUT = 10000;
const TIMEOUT = null;
// 如果传入了password，则使用私人账户来操作。
// 如果传入了password, 需要在组件内方法执行initAelf
export default function init(options = {}) {

    let {password, contractAddress, chainOnly, httpProvider = ''} = options;
    let wallet = getWallet(password);

    // var HttpProvider = function (host, timeout, user, password, headers) { /*...*/ }
    // const proxyHttpProvider = `/api/proxy?contract_address=${contractAddress}&ptype=rpc&action=`;
    let httpProviderTemp = httpProvider || serviceProvider.getProvider();
    // httpProviderTemp = contractAddress ? proxyHttpProvider : httpProviderTemp;

    let aelf = new Aelf(
        new Aelf.providers.HttpProvider(
            httpProviderTemp,
            TIMEOUT,
            'aelf-wallet',
            'aelf-wallet',
            [{
                name: 'x-csrf-token',
                value: document.cookie.match(/csrfToken=[^;]*/)[0].replace('csrfToken=', '')
            }]
        )
    );

    // TODO: 使用异步，这里调整为 await async
    try {
        aelf.chain.getChainStatus({sync: true});
    }
    catch (e) {
        Toast.hide();
        window.location.href = window.location.protocol + '//' + window.location.host + '#/error';
    }
    let contractMethods = chainOnly
        ? {} : aelf.chain.contractAt(contractAddress || window.defaultConfig.mainTokenContract, wallet, {sync: true});

    // 固定合约，如果没有对应的方法，返回'非法合约'的信息。
    if (!chainOnly && !contractMethods.GetBalance && !hasAlert) {
        hasAlert = true;
        throw Error('Contract Error');
    }

    return {
        aelf,
        contractMethods
    };
}

export function getWallet(password) {
    let wallet = '';
    if (password) {
        const walletUtilInstance = new WalletUtil();
        let walletInfoList = walletUtilInstance.getWalletInfoListSync();
        let walletAddress = walletUtilInstance.getLastUse().address;

        let AESEncryptPrivateKey = walletInfoList[walletAddress].AESEncryptoPrivateKey;

        let privateKey = '';
        try {
            privateKey = Aelf.wallet.AESDecrypt(AESEncryptPrivateKey, password);
        }
        catch (e) {
            throw Error('Password Error');
        }
        if (!privateKey) {
            throw Error('Password Error');
        }
        wallet = Aelf.wallet.getWalletByPrivateKey(privateKey);
    }
    else {
        // 公共账户用来进行查询操作。需要转账操作时,再使用用户的账户。
        wallet = Aelf.wallet.getWalletByPrivateKey(window.defaultConfig.commonPrivateKey);
    }
    return wallet;
}

// TODO, 整理一套返回格式。
function error(msg) {
    return {
        errormsg: msg
    };
}
