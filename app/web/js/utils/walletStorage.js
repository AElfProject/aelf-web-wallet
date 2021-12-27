/*
 * huangzongzhe,hzz780
 * 2018.07.25
 * Beijing IFC
 */
// Immutability Is Important
// https://reactjs.org/tutorial/tutorial.html#why-immutability-is-important
import aelf from 'aelf-sdk';
import WalletUtil from "./Wallet/wallet";

// TODO: 将localStorage部分封装到aelf-sdk中去，
// node部分使用file（json）存储，RN使用AsyncStorage.
export default function insertWalletInfo(walletInfoInput, password) {
    if (!walletInfoInput || (walletInfoInput.privateKey && !password)) {
        return false;
    }

    let walletInfo = Object.assign({}, walletInfoInput);
    // let walletInfo = mnemonicWallet || privateKeyWallet; // 助记词钱包优先
    if (password) {
        walletInfo.AESEncryptoPrivateKey = aelf.wallet.AESEncrypt(walletInfo.privateKey, password);
        walletInfo.AESEncryptoMnemonic =
          walletInfo.mnemonic ? aelf.wallet.AESEncrypt(walletInfo.mnemonic, password) : null;

        if (!walletInfo.publicKey) {
            let publicKey = walletInfo.keyPair.getPublic();
            walletInfo.publicKey = {
                x: publicKey.x.toString('hex'),
                y: publicKey.y.toString('hex')
            };
            walletInfo.signedAddress = walletInfo.keyPair.sign(walletInfo.address);
        }

        delete walletInfo.privateKey;
        delete walletInfo.mnemonic;
        delete walletInfo.xPrivateKey;
        delete walletInfo.keyPair;
    }
    // console.log('window decrypto: ', window.Aelf.wallet.AESDecrypt(walletInfo.AESEncryptoPrivateKey, password));
    // console.log('aelf decrypto: ', aelf.wallet.AESDecrypt(walletInfo.AESEncryptoMnemonic, password));
    // console.log('wallet info: ', walletInfo);

    const walletUtilInstance = new WalletUtil();
    let walletInfoList = walletUtilInstance.getWalletInfoListSync() || {};
    // 日哦, 哪里配错了？不让我用。。。babel?
    // walletInfoList[walletInfo.address] = {
    //     ...walletInfo,
    //     walletId: walletInfo.address,
    //     assets: [{
    //         contractAddress: '',
    //         tokenName: '',
    //         // balance 从服务器再取
    //     }]
    // };
    walletInfoList[walletInfo.address] = Object.assign({
        walletId: walletInfo.address,
        assets: [{
            contractAddress: '',
            tokenName: ''
            // balance 从服务器再取
        }]
    }, walletInfo);
    localStorage.setItem('walletInfoList', JSON.stringify(walletInfoList));
    localStorage.setItem('agreement', true);
    walletUtilInstance.setLastUse(walletInfo.address, walletInfo.walletName);
    return walletInfo;
    // return true;
}
