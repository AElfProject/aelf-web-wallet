/*
 * huangzongzhe
 * 2018.08.24
 */
import React, {
	Component
} from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { hashHistory } from 'react-router'

const Item = List.Item;

class WalletManage extends Component {

	render() {
		let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
		let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
		let walletName = walletInfoList[walletAddress].walletName;
		return (
			<div>
				<List>
					<Item>
						<div>{walletName}</div>
	            		<div style={{fontSize: '12px'}}>{walletAddress}</div>
					</Item>
				</List>
				<WhiteSpace />

				<List>
					<Item 
						extra={walletName} 
						arrow="horizontal" 
						onClick={() => hashHistory.push('/personalcenter/walletnamechange')}>
						钱包名称
					</Item>
				</List>
				<WhiteSpace />

				<List>
					
					<Item arrow="horizontal" onClick={() => hashHistory.push('/get-wallet/backup')}>备份钱包</Item>
					<Item arrow="horizontal" onClick={() => hashHistory.push('/personalcenter/passwordchange')}>修改密码</Item>
                </List>
	    	</div>
		);
	}
}

export default WalletManage