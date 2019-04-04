/**
 * @file stringToBuffer.js
 * @author huangzongzhe
 * useless now
 */

module.exports = function (input) {
    let resultArray = [];
    if (typeof input !== 'string' || input.length % 2 !== 0) {
        throw Error('invalid input');
    }
    for (let i = 0, length = input.length; i < length; i += 2) {
        resultArray.push('0x' + input.slice(i, i + 2));
    }
    return Buffer.from(resultArray);
};
