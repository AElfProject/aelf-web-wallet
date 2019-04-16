/**
* @file
* @author zhouminghui
* 获取全部token列表
*/
import {get} from './apisauce';

export default function getContracts(callback, pIndex, NUM_ROWS) {

    // TODO: 统一一下规范
    // 以后所有的callback 都用 err, result这样的返回形式。
    // callback(err, result)
    get('/api/contract/contracts', {
        limit: NUM_ROWS,
        page: pIndex
    }).then(result => {
        callback(result);
    }).catch(error => {
        console.log('error:', error);
        // Toast.fail(error.message, 6);
    });
}
