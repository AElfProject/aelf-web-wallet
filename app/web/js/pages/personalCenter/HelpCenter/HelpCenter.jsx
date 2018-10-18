/*
 * huangzongzhe
 * 2018.08.20
 */
import React, {
	Component
} from 'react'

import { List } from 'antd-mobile'
import { hashHistory } from 'react-router'
import NavNormal from '../../NavNormal/NavNormal'

const Item = List.Item;
class HelpCenter extends Component {
	render() {
		return (
			<div>
				<NavNormal navTitle="帮助中心"></NavNormal>
				<div className="aelf-white-space"></div>
				<List>
	                <Item onClick={() => hashHistory.push('/personalcenter/whatismnemonic')}>什么是助记词</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/whatiskeystore')}>什么是keyStore</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/whatisprivatepublickey')}>什么是公钥私钥</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/whatisaelfwallet')}>AElf钱包介绍</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/howtochangepassword')}>如何修改密码？忘记密码怎么办？</Item>
	            </List>
			</div>
		);
	}
}

export default HelpCenter