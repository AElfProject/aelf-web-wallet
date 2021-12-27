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
// import AelfButton from '../../../../components/Button/Button'
import NoticePanel from '../../../../components/NoticePanel/NoticePanel'
import NavNormal from '../../../NavNormal/NavNormal'

import moneyKeyboardWrapProps from '../../../../utils/moneyKeyboardWrapProps'
import insertWalletInfo from '../../../../utils/walletStorage'
import getPageContainerStyle from '../../../../utils/getPageContainerStyle'

import { FormattedMessage } from 'react-intl'

import aelf from 'aelf-sdk'

import style from './PasswordChange.scss'
import WalletUtil from "../../../../utils/Wallet/wallet";

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

        const walletUtilInstance = new WalletUtil();
        let walletInfoList = walletUtilInstance.getWalletInfoListSync();

        let walletId = walletUtilInstance.getLastUse().address;
        let walletInfo = walletInfoList[walletId];

        let privateKey = false;
        let mnemonic = false;

        try {
            privateKey = aelf.wallet.AESDecrypt(walletInfo.AESEncryptoPrivateKey, password);
            mnemonic = aelf.wallet.AESDecrypt(walletInfo.AESEncryptoMnemonic || '', password);
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
          Toast.fail('Password Error', 2, () => { }, false);
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
            >
            <FormattedMessage
                id = 'aelf.Submit'
                defaultMessage = 'Submit'
            />
            </div>;
        if (this.state.newPassword) {
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
                >
                <FormattedMessage
                    id = 'aelf.Submit'
                    defaultMessage = 'Submit'
                />
                </div>;
        }

        let containerStyle = getPageContainerStyle();

      const walletUtilInstance = new WalletUtil();
        let walletName = walletUtilInstance.getLastUse().walletName;

		return (
			<div className={'aelf-dash'}>
                <NavNormal
                   rightContent={rightContent}
                />
                <div className={style.container} >
                    <div>
                        <NoticePanel
                            mainTitle={
                                <FormattedMessage
                                    id = 'aelf.Change Password'
                                    defaultMessage = 'Change Password'
                                />
                            }
                            subTitle={[
                                walletName
                            ]}
                            iconHidden={true}
                        />
                        <List className={style.passwordContainer}>

                            <div className="aelf-input-title">
                                <div>
                                    <FormattedMessage
                                        id = 'aelf.Old password'
                                        defaultMessage = 'Old password'
                                    />
                                </div>
                            </div>
                            <InputItem
                                value={this.state.password}
                                type="password"
                                placeholder=""
                                onChange={password => this.inputPassword(password)}
                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                            />
                        </List>

                        <Password
                            setPassword={newPassword => this.setNewPassword(newPassword)}
                        />

                        {/*<div className={style.forget}>忘记密码？导入助记词或私钥可重置。*/}
                        <div className={style.forget}>
                            <FormattedMessage
                                id = 'aelf.Forget your password'
                            />
                            <a href="javascript:;"
                               className="aelf-blue"
                               onClick={() => hashHistory.push('/get-wallet/import')}>
                                <FormattedMessage
                                    id = 'aelf.Immediately import'
                                    defaultMessage = 'Immediately import'
                                />
                            </a>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}

export default PasswordChange
