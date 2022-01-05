/*
 * huangzongzhe
 * 2018.08.24
 */
import React, {
	Component
} from 'react'
import { List } from 'antd-mobile'
import { hashHistory } from 'react-router'

import addressOmit from '../../../utils/addressOmit'
import WalletUtil from "../../../utils/Wallet/wallet";
// import style from './QRCode.scss'

// const Item = List.Item;

class WalletList extends Component {

	goWalletManage() {
		hashHistory.push('/personalcenter/walletmanage');
	}

	render() {
		const walletUtilInstance = new WalletUtil();
		let walletInfoList = walletUtilInstance.getWalletInfoListSync();
	    let listItems = [];
	    for (let address in walletInfoList) {
	      listItems.push(
	        (
		        <List.Item key={address}
		              multipleLine
		              onClick={() => this.goWalletManage(address)}
		            >
	            	<div>{walletInfoList[address].walletName}</div>
	            	<div>{addressOmit(address)}</div>
	            </List.Item>
	        )
	      );
	    }

		return (
			<div>
				<List>
                    {listItems}
                </List>
	    	</div>
		);
	}
}

export default WalletList
