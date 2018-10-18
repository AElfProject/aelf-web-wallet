/*
 * huangzongzhe
 * 2018.08.24
 */
import React, {
	Component
} from 'react'
import { List, WhiteSpace, Modal, Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'

import NavWithDrawer from '../../../NavWithDrawer/NavWithDrawer'
import insertWalletInfo from '../../../../utils/walletStorage'

const Item = List.Item;
const prompt = Modal.prompt;

class WalletManage extends Component {
	constructor() {
		super();
		this.state = {
			walletNameModal: false,
			nameChanged: ''
		};
	}

    showModal(e, key) {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onClose(key) {
        this.setState({
            [key]: false,
        });
    }

    changeName(name) {
        let walletId = JSON.parse(localStorage.getItem('lastuse')).address;
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletInfo = walletInfoList[walletId];
        walletInfo.walletName = name;

        insertWalletInfo(walletInfo, false);
        Toast.success('修改成功', 1.5, () => {
            // hashHistory.goBack();
        }, false)
        this.setState({
        	nameChanged: ''
        });
    }

	render() {
		let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
		let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
		let walletName = walletInfoList[walletAddress].walletName;

		let html =
			<div>
				<List>
					<Item>
						<div>{walletName}</div>
	            		<div style={{fontSize: '12px'}}>{walletAddress}</div>
					</Item>
				</List>
				<WhiteSpace />

				{/*// Todo: 将这种promt用Modal重写，保证 maskClosable*/}
				<List>
					<Item 
						extra={walletName} 
						onClick={
							() => prompt('', '新的名称', [{
								text: '取消'
							}, {
								text: '修改',
								onPress: name => this.changeName(name)
							}, ], 'default', '')
						}>
						钱包名称
					</Item>
				</List>

				<WhiteSpace />

				<List>
					<Item arrow="horizontal" onClick={() => hashHistory.push('/get-wallet/backup')}>备份钱包</Item>
					<Item arrow="horizontal" onClick={() => hashHistory.push('/personalcenter/passwordchange')}>修改密码</Item>
                </List>
			</div>;

		return (
			<div>
				<NavWithDrawer 
				showLeftClick={true}
				onLeftClick={() => hashHistory.push('/personalcenter/home')}
				children={html}/>
	    	</div>
		);
	}
}

export default WalletManage