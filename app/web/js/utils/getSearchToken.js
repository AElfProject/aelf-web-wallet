/**
* @file
* @author zhouminghui
* 模糊查询的Token数据
*/

import {get} from '../utils/apisauce';

export default function getSearchToken(callback, name) {
    // TODO: Error Logic
    get('api/contract/searchtoken', {
        name
    }).then(result => {
        callback(result);
    }).catch(error => {
        console.log('error:', error);
    });
}
