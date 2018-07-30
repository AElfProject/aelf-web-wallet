/*
 * huangzongzhe,hzz780
 * 2018.07.30
 * init aelf
 */
import Aelf from 'aelf-sdk'
import config from '../config/config.js'

// 如果传入了password，则使用私人账户来操作。
function init (password, contractAdress) {
	let wallet = '';
	if (password) {
		let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
	    let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
	    let AESEncryptoPrivateKey = walletInfoList[walletAddress].AESEncryptoPrivateKey;

	    let privateKey = '';
	    try {
	        privateKey = Aelf.wallet.AESDecrypto(AESEncryptoPrivateKey, password);
	    } catch (e) {
	    	return error('wrong password, program crash.');
	    }
	    if (!privateKey) {
            return error('wrong password.');
        }
        wallet = Aelf.wallet.getWalletByPrivateKey(privateKey);
	} else {
		// 公共账户用来进行查询操作。需要转账操作时,再使用用户的账户。
		wallet = Aelf.wallet.getWalletByPrivateKey('f6e512a3c259e5f9af981d7f99d245aa5bc52fe448495e0b0dd56e8406be6f71');
	}
	console.log('wallet: ', wallet);

	let aelf = new Aelf(new Aelf.providers.HttpProvider(config.httpProvider));
	aelf.chain.connectChain();
	let contractMethods = aelf.chain.contractAt(contractAdress || config.mainContract, wallet);
	return {
		aelf: aelf,
		contractMethods: contractMethods
		// 这里不应该吐这个数据，这个数据和Aelf没啥关系。
		// walletAddress: wallet.address
	};
}

export default init

// TODO, 整理一套返回格式。
function error (msg) {
	return {
		errormsg: msg
	};
}