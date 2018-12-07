/** @file
 *  @author zhouminghui
 *  2018.12.5
 *  中文的分类并返回心的列表
 */

import contactCompare from './contactCompare';

function pinyinSegSort(arry) {
    let addressclass = arry;
    if (addressclass === undefined) {
        return;
    }
    else if (addressclass.lenght === 0) {
        return;
    }
    let newAddressclass = addressclass.sort(contactCompare('srt'));
    return newAddressclass;
}

export default pinyinSegSort;

