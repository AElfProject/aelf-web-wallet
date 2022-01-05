/**
 * @file whetherBackupCheck.js
 * @author huangzongzhe
 * 2018.12.13
 */
import WalletUtil from "./Wallet/wallet";

function whetherBackupCheck () {
    const walletUtilInstance = new WalletUtil();
    const walletType = walletUtilInstance.getWalletType();
    if (walletType !== 'local') {
        return true;
    }

    let walletId = walletUtilInstance.getLastUse().address;
    let walletInfoList = walletUtilInstance.getWalletInfoListSync();
    let walletInfo = walletInfoList[walletId] || {};

    // import wallet: walletInfo.hasBackup === undefined;
    // create wallet: default walletInfo.hasBackup === false;
    return walletInfo.hasBackup === undefined
        ? true : walletInfo.hasBackup;
}

export default whetherBackupCheck
