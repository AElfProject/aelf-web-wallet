/**
 * @file deserializeParams.js
 * @author huangzongzhe
 *
 * 根据调用contract的情况来选择不同的proto来反序列化。
 *
 * Warning:
 * 1.在nodejs, Buffer使用很正常。
 * 在浏览器端，pb.js处理Buffer数据用的Uint8Array.
 * 所以代码出现了以下情况，在nodejs端不需要这个Buffer.from的。
 * utils.encodeAddressRep(Buffer.from(result.issuer.Value).toString('hex'));
 * TODO: check why it is not Long in browser after deserialize the data.
 * 2.在浏览器端，输出的amount居然不是Long类型的，比较尴尬。可能会出问题。
 */
const AElf = require('aelf-sdk');
const utils = AElf.utils;
const protobuf = AElf.pbjs;
const tokenContractPb = require('../proto/token_contract.proto.json');
const tokenContractRoot = protobuf.Root.fromJSON(tokenContractPb);
const Long = require('long'); // For Token Contract

export default function deserializeParams(params, contractAddress, options = {}) {
    let output = '';
    // if (txResult.Transaction) {
    // const params = txResult.Transaction.Params || '';
    const bufferTemp = Buffer.from(params, 'base64');
    // if (contractAddress === config.defaultContracts.token) {
    if (contractAddress === window.defaultConfig.mainTokenContract) {
        const method = (options.method || '').toLocaleLowerCase();
        let result = {};
        switch (method) {
            case 'create':
                result = tokenContractRoot.nested.token.CreateInput.decode(bufferTemp);
                result.issuer = utils.encodeAddressRep(Buffer.from(result.issuer.Value).toString('hex'));
                result.totalSupplyStr = (new Long(result.totalSupply)).toString();
                break;
            case 'transfer':
                result = tokenContractRoot.nested.token.TransferInput.decode(bufferTemp);
                const addressTo = utils.encodeAddressRep(Buffer.from(result.to.Value).toString('hex'));
                result.to = addressTo;
                result.amountStr = (new Long(result.amount)).toString();
                break;
            default:
                break;
        }
        // result.constructor === TransferInput
        // when JSON.stringify result.to = {}
        // and result.amount will be the result of 'long.toString()'
        // so we need {...result}
        output = result;
    }
    return output;
}
