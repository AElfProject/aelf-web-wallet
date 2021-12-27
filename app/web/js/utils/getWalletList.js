/**
 * @file utils/getParam.js
 * @author huangzongzhe
 * 2019.01
 */

import WalletUtil from "./Wallet/wallet";

// Mark
export default function getWalletList() {
    const walletUtilInstance = new WalletUtil();

    return walletUtilInstance.getWalletInfoListSync();
}
