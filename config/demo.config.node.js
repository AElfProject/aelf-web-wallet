/**
 * @file config/demo.config.node.js
 * @author huangzongzhe
 * @type {{httpProvider: string, apiServerProvider: string, mainTokenContract: string, commonPrivateKey: string}}
 */
// 默认的rpc接口的访问地址
module.exports = {
    // About the Web Api of AElf node
    httpProvider: '/chain',
    // About the api of aelf-block-api
    apiServerProvider: 'http://127.0.0.1:7101',
    mainTokenName: 'ELF',
    mainTokenContract: 'ELF_4Qna4KWEr9XyxewGNHku1gwUvqtfsARSHcwjd3WXBpLw9Yx',
    commonPrivateKey: 'f6e512a3c259e5f9af981d7f99d245aa5bc52fe448495e0b0dd56e8406be6f71'
};
