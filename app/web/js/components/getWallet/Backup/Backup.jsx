import React, { Component } from 'react'
import { Button, WhiteSpace, List, InputItem, Toast } from 'antd-mobile'
import style from './Backup.scss'
import { hashHistory } from 'react-router'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import { historyPush } from '../../../utils/historyChange'

import aelf from 'aelf-sdk'

// React component
class Backup extends Component {
    constructor() {
        super();
        this.state = {
            privateKey: 'wait your password',
            mnemonic: 'wait your password',
            password: ''
        };
    }

    getPrivateKeyAndMnemonic() {
        let password = this.state.password;

        let walletId = JSON.parse(localStorage.getItem('lastuse')).address;
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletInfo = walletInfoList[walletId];

        let privateKey = '';
        let mnemonic = '';

        try {
            privateKey = aelf.wallet.AESDecrypto(walletInfo.AESEncryptoPrivateKey, password) || 'invalid password';
            mnemonic = aelf.wallet.AESDecrypto(walletInfo.AESEncryptoMnemonic, password) || 'invalid password';
        } catch (e) {
            // 因为封装了一层，解密错误时，转换成utf-8会抛出异常。
            let string = '[ERROR] Hey guy, your invalid password make the program crash.';
            privateKey = string;
            mnemonic = string;
        }

        this.setState({'privateKey': privateKey});
        this.setState({'mnemonic': mnemonic});
    }

    inputPassword(password) {
        this.setState({password: password});
    }
  
    render() {
        return (
            <div>
                <h3 className={style.title}>请确保环境安全下备份助记词和私钥 / Please ensure environmental safety.</h3>

                <List renderHeader={() => '输入密码解密 / Password to decrypto your password and mnemonic.'}>
                    <InputItem
                        value={this.state.password}
                        type="password"
                        placeholder="******"
                        onChange={password => this.inputPassword(password)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >password</InputItem>
                </List>

                <WhiteSpace />
                <Button onClick={() => this.getPrivateKeyAndMnemonic()}>获取助记词和私钥 / Decrypto</Button>
                <WhiteSpace />

                <div className={style.text}>无法直接复制，需要手抄 / Can not copy directly, you need write it in somewhere.</div>
                <List renderHeader={() => '助记词 / Mnemonic'}>
                    <div className={style.forbidden}>{this.state.mnemonic}</div>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '私钥 / PrivateKey'}>
                    <div className={style.forbidden}>{this.state.privateKey}</div>
                </List>

                <WhiteSpace />
                <WhiteSpace />
                <Button onClick={() => historyPush('/assets')}>返回主页 / Back to home</Button>
                
            </div>
        );
    }
}

export default Backup