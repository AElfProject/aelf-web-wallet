/**
 * @file 获取已绑定token列表
 * @author zhouminghui
*/

import {
    get
} from './apisauce';
import WalletUtil from "./Wallet/wallet";

export default function getTokens(callback) {
    const walletUtilInstance = new WalletUtil();
    let address = walletUtilInstance.getLastUse().address;

    // TODO: err逻辑待处理
    get('api/address/tokens', {
        address,
        nodes_info: true,
        limit: 50,
        page: 0
    }).then(result => {
        callback(result);
    }).catch(error => {
        console.log('error:', error);
    });
}
