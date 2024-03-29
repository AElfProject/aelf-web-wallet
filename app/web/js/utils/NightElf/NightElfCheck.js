/**
 * @file NightElfCheck
 * @author hzz780
 */
import serviceProvider from '../serviceProvider';
import {LOGIN_INFO} from "../../constant/config";
import WalletUtil from "../Wallet/wallet";

console.log('getProvider: ', serviceProvider);
const HTTP_PROVIDER = serviceProvider.getProvider();
const APP_NAME = 'Web Wallet';
let nightElfInstance = null;
let aelfInstanceByExtension = null;
let contractInstances = {};

export default class NightElfCheck {
    constructor() {
        let resolveTemp = null;
        this.check = new Promise((resolve, reject) => {
            if (window.NightElf) {
                console.log('There is NightElf');
                resolve(true);
            }
            setTimeout(() => {
                reject({
                    error: 200001,
                    message: 'timeout, please download and install the NightELF explorer extension'
                });
            }, 5000);
            resolveTemp = resolve;
        });
        document.addEventListener('NightElf', result => {
            resolveTemp(true);
        });
    }
    static getInstance() {
        if (!nightElfInstance) {
            nightElfInstance = new NightElfCheck();
            return nightElfInstance;
        }
        return nightElfInstance;
    }

    // For extension users
    static getAelfInstanceByExtension() {
        if (!aelfInstanceByExtension) {
            NightElfCheck.resetContractInstances();
            NightElfCheck.initAelfInstanceByExtension();
        }
        return aelfInstanceByExtension;
    }

    static initAelfInstanceByExtension() {
        aelfInstanceByExtension = new window.NightElf.AElf({
            httpProvider: [
                HTTP_PROVIDER
            ],
            APP_NAME
        });
        return aelfInstanceByExtension;
    }

    static resetContractInstances() {
        contractInstances = {};
    }

    static async checkAccount() {
        const aelf = NightElfCheck.getAelfInstanceByExtension();
        const accountInfo = await aelf.login(LOGIN_INFO);
        const addressFromExtension = JSON.parse(accountInfo.detail).address;

        const walletUtil = new WalletUtil();
        const lastUse = walletUtil.getLastUse().address;
        return lastUse.toLowerCase() === addressFromExtension.toLowerCase();
    }

    static async getContractInstance(inputInitParams) {
        const {contractAddress} = inputInitParams;
        await NightElfCheck.getInstance().check;
        const aelf = NightElfCheck.getAelfInstanceByExtension();

        // const accountInfo = await aelf.login(LOGIN_INFO);
        const walletUtil = new WalletUtil();
        const accountInfo = await walletUtil.getWalletInfoList();
        if (accountInfo.error) {
            throw Error(accountInfo.errorMessage.message || accountInfo.errorMessage);
        }
        // const address = JSON.parse(accountInfo.detail).address;
        const address = Object.keys(accountInfo)[0];

        await aelf.chain.getChainStatus();

        if (contractInstances[contractAddress + address]) {
            return contractInstances[contractAddress + address];
        }
        return await NightElfCheck.initContractInstance(inputInitParams);
    }

    // singleton to get, new to init
    static async initContractInstance(inputInitParams) {
        const {contractAddress} = inputInitParams;
        await NightElfCheck.getInstance().check;
        const aelf = NightElfCheck.getAelfInstanceByExtension();

        // const accountInfo = await aelf.login(LOGIN_INFO);
        //
        // console.log('accountInfo', accountInfo);
        // if (accountInfo.error) {
        //     throw Error(accountInfo.errorMessage.message || accountInfo.errorMessage);
        // }
        // const address = JSON.parse(accountInfo.detail).address;
        // const accountInfo = await aelf.login(LOGIN_INFO);
        const walletUtil = new WalletUtil();
        const accountInfo = await walletUtil.getWalletInfoList();
        if (accountInfo.error) {
            throw Error(accountInfo.errorMessage.message || accountInfo.errorMessage);
        }
        // const address = JSON.parse(accountInfo.detail).address;
        const address = Object.keys(accountInfo)[0];

        await aelf.chain.getChainStatus();

        const wallet = {
            address
        };
        // It is different from the wallet created by Aelf.wallet.getWalletByPrivateKey();
        // There is only one value named address;
        const contractInstance = await aelf.chain.contractAt(
          contractAddress,
          wallet
        );
        contractInstances[contractAddress + address] = contractInstance;
        return contractInstance;
    }
}
