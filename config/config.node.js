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
    mainTokenContract: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
    commonPrivateKey: 'f6e512a3c259e5f9af981d7f99d245aa5bc52fe448495e0b0dd56e8406be6f71',
    WALLET_INFO: encodeURIComponent(JSON.stringify({
        AELF: {
            url: 'https://aelf-wallet-test.aelf.io',
            name: 'MainChain AELF'
        },
        tDVV: {
            url: 'https://tdvv-wallet-test.aelf.io',
            name: 'SideChain tDVV'
        },
        tDVW: {
            url: 'https://tdvw-wallet-test.aelf.io',
            name: 'SideChain tDVW'
        }
    })),
    // TODO use api instead of hard code config
    WEB_API_INFO: encodeURIComponent(JSON.stringify({
        AELF: {
            url: 'https://aelf-wallet-test.aelf.io/chain',
            explorer: 'https://explorer-test.aelf.io',
            id: 9992731,
            feeToken: 'ELF',
            mainTokenContract: 'JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE',
            crossChainContract: '2SQ9LeGZYSWmfJcYuQkDQxgd3HzwjamAaaL4Tge2eFSXw2cseq'
        },
        tDVV: {
            url: 'https://tdvv-wallet-test.aelf.io/chain',
            explorer: 'https://tdvv-explorer-test.aelf.io',
            id: 1866392,
            feeToken: 'ELF',
            mainTokenContract: '7RzVGiuVWkvL4VfVHdZfQF2Tri3sgLe9U991bohHFfSRZXuGX',
            crossChainContract: '2snHc8AMh9QMbCAa7XXmdZZVM5EBZUUPDdLjemwUJkBnL6k8z9'
        },
    })),
    TOKEN_CROSS_SUPPORT: encodeURIComponent(JSON.stringify({
        ELF: {
            issueChainId: 9992731,
            readyTo: [9992731, 1866392, 1931928, 1997464, 2063000, 2128536],
            decimals: 8
        }
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
