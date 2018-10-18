/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'

import { List } from 'antd-mobile'
import { hashHistory } from 'react-router'

const Item = List.Item;
class personalCenterHome extends Component { 
	render() {
		return (
			<div>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/walletmanage?title=钱包管理')}>钱包管理</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/about?title=关于我们')}>关于我们</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/help?title=帮助中心')}>帮助中心</Item>
	            </List>
			</div>
		);
	}
}

export default personalCenterHome