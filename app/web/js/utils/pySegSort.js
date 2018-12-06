/** @file
 *  @author zhouminghui
 *  2018.12.5
 *  中文的分类并返回心的列表
 */

import compare from './compare';

function pySegSort(arry) {
    let addressclass = arry;
    if (addressclass === undefined) {
        return;
    }
    else if (addressclass.lenght === 0) {
        return;
    }
    let newAddressclass = addressclass.sort(compare('srt'));
    return newAddressclass;
}

export default pySegSort;

