/**
 * @file config/config.node.js
 * @author huangzongzhe
 * @type {{httpProvider: string, apiServerProvider: string, mainContract: string, commonPrivateKey: string}}
 */
// 默认的rpc接口的访问地址
module.exports = {
    // About the Web Api of AElf node
    httpProvider: '/chain',
    apiServerProvider: 'http://127.0.0.1:7101',
    mainTokenName: 'ELF',
    mainTokenContract: 'mS8xMLs9SuWdNECkrfQPF8SuRXRuQzitpjzghi3en39C3SRvf',
    commonPrivateKey: 'f6e512a3c259e5f9af981d7f99d245aa5bc52fe448495e0b0dd56e8406be6f71'
};
