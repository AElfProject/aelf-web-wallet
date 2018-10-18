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
// import style from './QRCode.scss'

// const Item = List.Item;

class WalletList extends Component {

	goWalletManage() {
		hashHistory.push('/personalcenter/walletmanage');
	}

	render() {
		let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
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

		// let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;

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