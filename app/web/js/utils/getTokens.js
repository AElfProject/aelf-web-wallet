/**
 * @file 获取已绑定token列表
 * @author zhouminghui
*/

import {
    get
} from './apisauce';

export default function getTokens(callback) {

    // TODO: err逻辑待处理
    get('api/address/tokens', {
        address: JSON.parse(localStorage.lastuse).address,
        nodes_info: true,
        limit: 50,
        page: 0
    }).then(result => {
        callback(result);
    }).catch(error => {
        console.log('error:', error);
    });
}
