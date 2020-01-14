/**
 * @file getPrivateKeyAndMnemonic.js
 * @author huangzongzhe
 * 2020.01.04
 */
import AElf from 'aelf-sdk';

// {password = '', successCallback, failCallback}
// password = password || this.state.password;
export default function getPrivateKeyAndMnemonic(password) {
    return new Promise((resolve, reject) => {
        let walletId = JSON.parse(localStorage.getItem('lastuse')).address;
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
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
