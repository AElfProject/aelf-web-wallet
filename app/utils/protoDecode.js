/**
 * @file protoDecode.js
 * @author huangzongzhe
 * useless now
 */

const proto = require('aelf-sdk').pbjs;
const stringToBuffer = require('./stringToBuffer');

function protoToInt64(protoValue) {
    const reader = new proto.Reader(stringToBuffer(protoValue));
    return reader.uint64();
}

module.exports = {
    protoToInt64
};
