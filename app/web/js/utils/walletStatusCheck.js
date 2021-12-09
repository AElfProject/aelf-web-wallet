/*
 * huangzongzhe,hzz780
 * 2018.10.19
 * Beijing IFC
 * 检测不到钱包就跳转到创建钱包页去。
 */
import { hashHistory } from 'react-router'
import WalletUtil from "./Wallet/wallet";

export default function walletStatusCheck () {
    const walletUtilInstance = new WalletUtil();
    const walletInfoList = walletUtilInstance.getWalletInfoListSync();
    const walletType = walletUtilInstance.getWalletType();
    if (Object.keys(walletInfoList).length) {
        return true;
    }
    if (walletType === 'local') {
        localStorage.removeItem('walletInfoList');
        localStorage.removeItem('lastuse');
    }
    return false;
    // hashHistory.replace('/get-wallet/guide');
    // return false;
}
