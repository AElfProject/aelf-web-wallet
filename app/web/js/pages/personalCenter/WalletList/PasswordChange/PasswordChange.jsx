/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'

import { WhiteSpace, List, InputItem, Button, Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'

import Password from '../../../../components/Password/Password'
import AelfButton from '../../../../components/Button/Button'
import NoticePanel from '../../../../components/NoticePanel/NoticePanel'
import NavNormal from '../../../NavNormal/NavNormal'

import moneyKeyboardWrapProps from '../../../../utils/moneyKeyboardWrapProps'
import insertWalletInfo from '../../../../utils/walletStorage'
import getPageContainerStyle from '../../../../utils/getPageContainerStyle'

import style from './PasswordChange.scss'

const Item = List.Item;
class PasswordChange extends Component {
	constructor() {
        super();
        this.haveCreate = false;
        this.creating = false;
        this.state = {
        	password: '',
            newPassword: ''
        };
    }
    inputPassword(password) {

        this.setState({password: password});
    }
 
	setNewPassword(newPassword) {
        this.setState({newPassword: newPassword});
    }

    changePassword() {
    	let password = this.state.password;

        let walletId = JSON.parse(localStorage.getItem('lastuse')).address;
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletInfo = walletInfoList[walletId];

        let privateKey = false;
        let mnemonic = false;

        try {
            privateKey = window.Aelf.wallet.AESDecrypto(walletInfo.AESEncryptoPrivateKey, password);
            mnemonic = window.Aelf.wallet.AESDecrypto(walletInfo.AESEncryptoMnemonic, password);
        } catch (e) {
            // 因为封装了一层，解密错误时，转换成utf-8会抛出异常。
            let string = '[ERROR] Hey guy, your invalid password make the program crash.';
            // privateKey = string;
            privateKey = false;
            mnemonic = false;
        }

        if (!!mnemonic || !!privateKey) {
	        walletInfo.privateKey = privateKey;
	        walletInfo.mnemonic = mnemonic;

	        insertWalletInfo(walletInfo, this.state.newPassword);
	        Toast.info('Password Change Success', 3, () => {
                // hashHistory.push('/assets');
                hashHistory.goBack();
            });
        	// console.log('change done: ', privateKey, result);
        } else {
        	Toast.fail('Wrong Password', 2);
        	// console.log('傻逼，滚。');
        }
    }

	render() {
		// let changeButton =
         //    <AelfButton
         //        text="修改密码"
         //        style={{
         //            opacity: 0.5
         //        }}
         //    ></AelfButton>;
        let rightContent =
            <div
                style={{
                    opacity: 0.5
                }}
            >完成
            </div>;
        if (this.state.newPassword && true) {
            // changeButton =
            //     <AelfButton
            //         onClick={() => this.changePassword()}
            //         text="修改密码"
            //         style={{
            //             opacity: 1
            //         }}
            //     ></AelfButton>
            rightContent =
                <div
                    onClick={() => this.changePassword()}
                >完成
                </div>;
        }

        let containerStyle = getPageContainerStyle();

		return (
			<div className={'aelf-dash'}>
                <NavNormal
                           rightContent={rightContent}
                ></NavNormal>
                <div className={style.container} >
                    <div>
                        <NoticePanel
                            mainTitle={'修改密码'}
                            subTitle={[
                                ''
                            ]}
                            iconHidden={true}
                        ></NoticePanel>
                        <List className={style.passwordContainer}>

                            <div className="aelf-input-title">
                                <div>当前密码</div>
                            </div>
                            <InputItem
                                value={this.state.password}
                                type="password"
                                placeholder=""
                                onChange={password => this.inputPassword(password)}
                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                            ></InputItem>
                        </List>


                        <Password
                            setPassword={newPassword => this.setNewPassword(newPassword)}
                        ></Password>

                        <div className={style.forget}>忘记密码？导入助记词或私钥可重置。
                            <a href="javascript:;"
                               className="aelf-blue"
                               onClick={() => hashHistory.push('/get-wallet/import')}>
                                马上导入
                            </a>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

export default PasswordChange