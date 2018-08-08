/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'

import { WhiteSpace, List } from 'antd-mobile'
import { hashHistory } from 'react-router'

const Item = List.Item;
class personalCenterHome extends Component {
    // <List>
    //     <Item extra={'TODO'}>TODO: 联系人管理</Item>
    // </List>
	render() {

		let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;

		return (
			<div>
				<List>
	                <Item onClick={() => hashHistory.push('/get-wallet/backup')}>备份助记词和私钥</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/about')}>关于我们</Item>
	            </List>
			</div>
		);
	}
}

export default personalCenterHome