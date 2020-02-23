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
        tDVV: 'https://tdvv-wallet-test.aelf.io',
        tDVW: 'https://tdvw-wallet-test.aelf.io',
        tDVX: 'https://tdvx-wallet-test.aelf.io',
        tDVY: 'https://tdvy-wallet-test.aelf.io',
        tDVZ: 'https://tdvz-wallet-test.aelf.io'
    })),
    // TODO use api instead of hard code config
    WEB_API_INFO: encodeURIComponent(JSON.stringify({
        AELF: {
            url: 'https://aelf-wallet-test.aelf.io/chain',
            // urlTemp: 'http://3.25.10.185:8000',
            explorer: 'https://explorer-test.aelf.io',
            id: 9992731,
            feeToken: 'ELF',
            mainTokenContract: '25CecrU94dmMdbhC3LWMKxtoaL4Wv8PChGvVJM6PxkHAyvXEhB',
            crossChainContract: 'x7G7VYqqeVAH8aeAsb7gYuTQ12YS1zKuxur9YES3cUj72QMxJ'
        },
        tDVV: {
            url: 'https://tdvv-wallet-test.aelf.io/chain',
            // urlTemp: 'http://13.211.28.67:8000',
            explorer: 'https://tdvv-explorer-test.aelf.io',
            id: 1866392,
            feeToken: 'EPC',
            mainTokenContract: 'NCsfF8mqPNwaPxps9zvZcYb9RJmMbuD47vu2UY1LypCPZ7DP7',
            crossChainContract: '2A1LuQTnH8uSfCiAvr2yn1VsGVXZvafjnQp5ZeGME6x8BKFeNX'
        },
        tDVW: {
            url: 'https://tdvw-wallet-test.aelf.io/chain',
            // urlTemp: 'http://13.236.40.223:8000',
            explorer: 'https://tdvw-explorer-test.aelf.io',
            id: 1931928,
            feeToken: 'EDA',
            mainTokenContract: '2AeYzEekStDQPYbhUAmtzXjEA9hP7CWTyTAQoniWX9ATFQQwFK',
            crossChainContract: 'JTsGuqdiH2N2Z1tygsXZ8A9ZChNNC1kw8yPDiTs65qbQHPdXy'
        },
        tDVX: {
            url: 'https://tdvx-wallet-test.aelf.io/chain',
            // urlTemp: 'http://13.239.50.175:8000',
            explorer: 'https://tdvx-explorer-test.aelf.io',
            id: 1997464,
            feeToken: 'EDB',
            mainTokenContract: '2ELTSBpU7fjidMAQdSyqimDL6hx3kNVR8k8x2ytXs3oLuDZQfU',
            crossChainContract: 'x1GW1NAc3t3igHhk2CgXAC2KohPjAj2sap9n6AdRNGYh5x1CV'
        },
        tDVY: {
            url: 'https://tdvy-wallet-test.aelf.io/chain',
            // urlTemp: 'http://13.55.199.121:8000',
            explorer: 'https://tdvy-explorer-test.aelf.io',
            id: 2063000,
            feeToken: 'EDC',
            mainTokenContract: 'Gcd8V3yBqy8WFWJHWmQjiVRMK2bwderzRT6U5AKyRgYjFiERC',
            crossChainContract: 'NQkLvMfm5PKd1tU9pMFY95sPtDDspzaqD1p3Fvk2yrC91Va5n'
        },
        tDVZ: {
            url: 'https://tdvz-wallet-test.aelf.io/chain',
            // urlTemp: 'http://3.104.42.91:8000',
            explorer: 'https://tdvz-explorer-test.aelf.io',
            id: 2128536,
            feeToken: 'EDD',
            mainTokenContract: '2CnJ19W6DtjieZcxjgkWYa8Dy6S6fD8Ms8dRih16XsKhLzdto7',
            crossChainContract: 'x5ZEuTBRF5onpKpWbAS2MPhuuhvAo9GcnJ2V9vSmmp17YQ1kz'
        }
    })),
    TOKEN_CROSS_SUPPORT: encodeURIComponent(JSON.stringify({
        ELF: {
            issueChainId: 9992731,
            readyTo: [9992731, 1866392, 1931928, 1997464, 2063000, 2128536],
            decimals: 8
        },
        EPC: {
            issueChainId: 1866392,
            readyTo: [9992731, 1866392],
            decimals: 8
        },
        EDA: {
            issueChainId: 1931928,
            readyTo: [9992731, 1931928],
            decimals: 8
        },
        EDB: {
            issueChainId: 1997464,
            readyTo: [9992731, 1997464],
            decimals: 8
        },
        EDC: {
            issueChainId: 2063000,
            readyTo: [9992731, 2063000],
            decimals: 8
        },
        EDD: {
            issueChainId: 2128536,
            readyTo: [9992731, 2128536],
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
