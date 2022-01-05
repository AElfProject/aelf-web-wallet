/**
 * @file getPrivateKeyAndMnemonic.js
 * @author huangzongzhe
 * 2020.01.04
 */
import AElf from 'aelf-sdk';
import WalletUtil from "./Wallet/wallet";

// {password = '', successCallback, failCallback}
// password = password || this.state.password;
export default function getPrivateKeyAndMnemonic(password) {
    return new Promise((resolve, reject) => {
        const walletUtilInstance = new WalletUtil();
        let walletInfoList = walletUtilInstance.getWalletInfoListSync();
        let walletId = walletUtilInstance.getLastUse().address;
        let walletInfo = walletInfoList[walletId];

        let privateKey = '';
        let mnemonic = '';

        try {
            privateKey = AElf.wallet.AESDecrypt(walletInfo.AESEncryptoPrivateKey, password);
            mnemonic = walletInfo.AESEncryptoMnemonic
              ? AElf.wallet.AESDecrypt(walletInfo.AESEncryptoMnemonic, password) : null;
        }
        catch (e) {
        }

        if (privateKey || mnemonic) {
            resolve({
                privateKey,
                mnemonic
            });
        }
        reject();
    });
}
