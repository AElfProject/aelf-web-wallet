/**
 * @file addressPrefixSuffix.js
 * @author huangzongzhe
 * 2020.01.10
 */

export default function addressPrefixSuffix(address, base58ChainID) {
    const {PREFIX, CURRENT_CHAIN_ID} = window.defaultConfig.ADDRESS_INFO;
    if (base58ChainID) {
        return PREFIX + '_' + address + '_' + window.defaultConfig.ADDRESS_INFO[base58ChainID];
    }
    return PREFIX + '_' + address + '_' + CURRENT_CHAIN_ID;
}
