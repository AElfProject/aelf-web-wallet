/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { hashHistory } from 'react-router'
// import style from './QRCode.scss'
require('./Nav.css');

class GetWalletsNav extends Component {
	render() {
		let pathname = hashHistory.getCurrentLocation().pathname;
		let isCreate = pathname.match(/\/get-wallet\/create/);
		let isBackup = pathname.match(/\/get-wallet\/backup/);
		console.log('hashHistory: ', hashHistory);
		let title = isCreate ? '创建钱包' : '导入钱包';
		title = isBackup ? '备份钱包' : title;

		return (
			<div>
				<NavBar icon={<Icon type="left" />} onLeftClick={() => hashHistory.goBack()}>
					{title}
				</NavBar>
	        	{this.props.children}
			</div>
		);
	}
}

export default GetWalletsNav