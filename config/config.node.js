/**
 * @file config/config.node.js
 * @author huangzongzhe
 * @type {{httpProvider: string, apiServerProvider: string, mainContract: string, commonPrivateKey: string}}
 */
// 默认的rpc接口的访问地址
module.exports = {
    // About the Web Api of AElf node
    httpProvider: '/chain',
    apiServerProvider: 'http://127.0.0.1:7000',
    mainTokenName: 'ELF',
    chainId: 'AELF',
    explorerURL: 'https://explorer-test.aelf.io',
    mainTokenContract: '25CecrU94dmMdbhC3LWMKxtoaL4Wv8PChGvVJM6PxkHAyvXEhB',
    commonPrivateKey: 'f6e512a3c259e5f9af981d7f99d245aa5bc52fe448495e0b0dd56e8406be6f71',
    WALLET_INFO: encodeURIComponent(JSON.stringify({
        AELF: 'https://aelf-wallet-test.aelf.io',
        tDVV: 'http://tdvv-wallet-test.aelf.io',
        tDVW: 'http://tdvw-wallet-test.aelf.io',
        tDVX: 'http://tdvx-wallet-test.aelf.io',
        tDVY: 'http://tdvy-wallet-test.aelf.io',
        tDVZ: 'http://tdvz-wallet-test.aelf.io'
    })),
    ADDRESS_INFO: encodeURIComponent(JSON.stringify({
        PREFIX: 'ELF',
        CURRENT_CHAIN_ID: 'AELF',
        9992731: 'AELF',
        1866392: 'tDVV',
        1931928: 'tDVW',
        1997464: 'tDVX',
        2063000: 'tDVY',
        2128536: 'tDVZ'
    }))
};
