/**
 * @file addressPrefixSuffix.js
 * @author huangzongzhe
 * 2020.01.10
 */

export default function addressPrefixSuffix(address) {
    const {PREFIX, CURRENT_CHAIN_ID} = window.defaultConfig.ADDRESS_INFO;
    return PREFIX + '_' + address + '_' + CURRENT_CHAIN_ID;
}
