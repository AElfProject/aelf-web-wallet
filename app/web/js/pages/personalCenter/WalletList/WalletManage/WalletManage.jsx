/*
 * huangzongzhe
 * 2018.08.24
 */
import React, {
	Component
} from 'react'
import { List, WhiteSpace, Modal, Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'

import ListContent from '../../../../components/ListContent/ListContent'
import NoticePanel from '../../../../components/NoticePanel/NoticePanel'
import AelfButton from '../../../../components/Button/Button'

import NavWithDrawer from '../../../NavWithDrawer/NavWithDrawer'
import insertWalletInfo from '../../../../utils/walletStorage'
import getPageContainerStyle from '../../../../utils/getPageContainerStyle'
import walletStatusCheck from '../../../../utils/walletStatusCheck'

import style from './WalletManage.scss'

const Item = List.Item;
const prompt = Modal.prompt;
const alert = Modal.alert;

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
        Toast.success('Change success', 1.5, () => {
            // hashHistory.goBack();
        }, false)
        this.setState({
        	nameChanged: ''
        });
    }

    deleteWallet() {
		let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
		delete walletInfoList[walletAddress];

        localStorage.setItem('walletInfoList', JSON.stringify(walletInfoList));

        let count = 0;
        let lock = false;
        for (let each in walletInfoList) {
            if (count) {
                break
            } else {
                console.log(each);
                localStorage.setItem('lastuse', JSON.stringify({
                    address: walletInfoList[each].address,
                    walletName: walletInfoList[each].walletName
                }));
                count++;
                lock = true;
                Toast.success('Deleted', 3, () => {
                    hashHistory.push('/personalcenter/home');
                })
            }
        }
        if (!lock) {
            localStorage.removeItem('walletInfoList');
            localStorage.removeItem('lastuse');
            Toast.fail('No wallet now，please create or insert a wallet.', 3, () => {
                hashHistory.push('/get-wallet/guide');
            }, 3);
		}
	}

	render() {

		let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
		let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
		let walletName = walletInfoList[walletAddress].walletName;

        let containerStyle = getPageContainerStyle();
        containerStyle.height = containerStyle.height - 61;
		let html =
			<div className={'aelf-personal-pages aelf-solid' + ' ' + style.container} style={containerStyle}>
				<div className={style.top}>
                    <NoticePanel
                        mainTitle={walletName}
                        subTitle={[
                            walletAddress
                        ]}
                        subTitleStyle={{
                            opacity: 0.5
                        }}
                        iconHidden={true}
                    ></NoticePanel>

                    {/*<List>*/}
                    {/*<Item>*/}
                    {/*<div>{walletName}</div>*/}
                    {/*<div style={{fontSize: '12px'}}>{walletAddress}</div>*/}
                    {/*</Item>*/}
                    {/*</List>*/}
                    {/*// Todo: 将这种promt用Modal重写，保证 maskClosable*/}
                    <List className={'aelf-list'}>
                        {/*arrow="horizontal"*/}
                        <Item
                            onClick={
                                () => prompt('', 'New Name', [{
                                    text: 'Cancel'
                                }, {
                                    text: 'Submit',
                                    onPress: name => this.changeName(name)
                                }, ], 'default', '')
                            }>
                            <ListContent
                                text="Wallet Name"
                            ></ListContent>
                        </Item>
                    </List>

                    <List className={'aelf-list'}>
                        <Item onClick={() => hashHistory.push('/get-wallet/backup')}>
                            <ListContent
                                text="Backup"
                            ></ListContent>
                        </Item>
                    </List>
                    <List className={'aelf-list'}>
                        <Item onClick={() => hashHistory.push('/personalcenter/passwordchange')}>
                            <ListContent
                                text="Change Password"
                            ></ListContent>
                        </Item>
                    </List>
				</div>

				<div className={style.bottom}>
                    <AelfButton
                        text="Delete Wallet"
                        onClick={
                            () => alert('Delete', 'Are you sure?', [{
                                text: 'Cancel'
                            }, {
                                text: 'Submit',
                                onPress: name => this.deleteWallet()
                            }, ], 'default', '')
                        }
                    ></AelfButton>

				</div>
			</div>;

		return (
			<div>
				<NavWithDrawer 
				showLeftClick={true}
                hiddenBottom={true}
				onLeftClick={() => hashHistory.push('/personalcenter/home')}
				children={html}/>
	    	</div>
		);
	}
}

export default WalletManage