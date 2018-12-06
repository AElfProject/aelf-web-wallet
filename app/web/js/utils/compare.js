/** @file
 *  @author zhouminghui
 *  2018.12.5
 *  用来对名称排序
 */

function compare(property) {
    return function (a, b) {
        let t1 = a[property];
        let t2 = b[property];
        return t1.localeCompare(t2);
    };
}

export default compare;
