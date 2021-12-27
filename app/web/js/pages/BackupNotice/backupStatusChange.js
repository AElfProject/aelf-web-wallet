/*
 * huangzongzhe
 * 2018.09.01
 */
import insertWalletInfo from '../../utils/walletStorage'
import WalletUtil from "../../utils/Wallet/wallet";

function backupStatusChange(status = true) {
	const walletUtilInstance = new WalletUtil();
	let walletInfoList = walletUtilInstance.getWalletInfoListSync();
	let walletId = walletUtilInstance.getLastUse().address;
	let walletInfo = walletInfoList[walletId];
	// 如果是创建的钱包，需要先备份才能使用，否则转账，获取收款二维码的操作将跳转到提示页。
	walletInfo.hasBackup = status;
	insertWalletInfo(walletInfo);
}

export default backupStatusChange
