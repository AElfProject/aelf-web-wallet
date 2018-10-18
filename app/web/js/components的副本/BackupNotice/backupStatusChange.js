/*
 * huangzongzhe
 * 2018.09.01
 */
import insertWalletInfo from '../../utils/walletStorage'

function backupStatusChange(status = true) {

	let walletId = JSON.parse(localStorage.getItem('lastuse')).address;
    let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
    let walletInfo = walletInfoList[walletId];
	// 如果是创建的钱包，需要先备份才能使用，否则转账，获取收款二维码的操作将跳转到提示页。
	walletInfo.hasBackup = status;
	insertWalletInfo(walletInfo);
}

export default backupStatusChange