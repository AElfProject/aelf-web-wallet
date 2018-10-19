/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { hashHistory } from 'react-router'
import walletStatusCheck from '../../../utils/walletStatusCheck'
// import style from './QRCode.scss'
require('./Nav.css');

// TODO: 待重构优化
class GetWalletsNav extends Component {
	render() {
		let pathname = hashHistory.getCurrentLocation().pathname;
		let walletStatus = walletStatusCheck();

		let isCreate = pathname.match(/\/get-wallet\/create/);
		let isBackup = pathname.match(/\/get-wallet\/backup/);
		let isGuide = pathname.match(/\/get-wallet\/guide/);
		// console.log('hashHistory: ', hashHistory);
		let title = isCreate ? '' : '导入钱包';
		title = isBackup ? '备份钱包' : title;
        title = isGuide ? '' : title;

        let leftHtml =
			<NavBar icon={<Icon type="left" />} onLeftClick={() => hashHistory.goBack()}>
				{title}
			</NavBar>;
        if (!walletStatus && isGuide) {
            leftHtml =
				<NavBar>
					{title}
				</NavBar>;
		}

		return (
			<div className='aelf-bg-light'>
				<div className='aelf-wd-100percent'>
					{leftHtml}
                    {this.props.children}
				</div>
			</div>
		);
	}
}

export default GetWalletsNav