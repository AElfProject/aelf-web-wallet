import React, { Component } from 'react'
import { Button, WhiteSpace, List, TextareaItem, InputItem, Toast } from 'antd-mobile'
import style from './Import.scss'
import { hashHistory } from 'react-router'
import passwordCheck from '../../../utils/passwordCheck'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import insertWalletInfo from '../../../utils/walletStorage'
import Password from '../Password/Password'
import WalletName from '../WalletName/WalletName'

import aelf from 'aelf-sdk'

// React component
class Import extends Component {
    constructor() {
        super();
        this.state = {
            mnemonic: '',
            privateKey: ''
        };
    }

    createAndGO() {
        let password = this.password;
        if (!password) {
            Toast.fail('No password', 2);
            return;
        }
        if (!this.walletName) {
            Toast.fail('No walletName', 2);
            return;
        }

        if (!this.state.mnemonic && !this.state.privateKey) {
            Toast.fail('Please input your privateKey or mnemonic', 3);
            return;
        }

        let mnemonicWallet = aelf.wallet.getWalletByMnemonic(this.state.mnemonic || '');
        let privateKeyWallet = aelf.wallet.getWalletByPrivateKey(this.state.privateKey || '');

        // if (!privateKeyWallet && !mnemonicWallet) {
        if (!mnemonicWallet) {
            this.setState({mnemonicError: 'invalid mnemonic'})
        } else {
            this.setState({mnemonicError: ''})
        }

        // if (!mnemonicWallet && !privateKeyWallet) {
        if (!privateKeyWallet) {
            this.setState({privateKeyError: 'invalid privateKey'})
        } else {
            this.setState({privateKeyError: ''})
        }

        if (!privateKeyWallet && !mnemonicWallet) {
            return;
        }


        let walletInfo = mnemonicWallet || privateKeyWallet; // 助记词钱包优先
        walletInfo.walletName = this.walletName;
        let result = insertWalletInfo(walletInfo, password);

        if (result) {
            Toast.info('Import success. Turn to home after 3s.', 3, () => {
                hashHistory.push('/');
            });
        } else {
            Toast.fail('(꒦_꒦) ...Fail, please check the form. Or call Huang Zongzhe');
        }
        
    }

    inputMnemonic(mnemonic) {
        this.setState({
            mnemonic: mnemonic,
            mnemonicError: ''
        });
    }

    inputPrivateKey(privateKey) {
        this.setState({
            privateKey: privateKey,
            privateKeyError: ''
        });
    }

    setPassword(password) {
        this.password = password;
    }

    setWalletName(walletName) {
        this.walletName = walletName;
    }
  
    render() {
        return (
            <div>
                <h3 className={style.title}>导入钱包 / Import Wallet</h3>

                <p className={style.title}>We will use mnemonic in preference than privateKey</p>

                <WalletName
                    setWalletName={walletName => this.setWalletName(walletName)}
                ></WalletName>

                <List renderHeader={() => '助记词 / Mnemonic'}>
                    <TextareaItem
                        value={this.state.mnemonic}
                        onChange={mnemonic => this.inputMnemonic(mnemonic)}
                        rows={3}
                        placeholder="Mnemonic"
                    />
                </List>
                <div className={style.error}>{this.state.mnemonicError}</div>

                <List renderHeader={() => '私钥 / PrivateKey'}>
                    <TextareaItem
                        value={this.state.privateKey}
                        onChange={privateKey => this.inputPrivateKey(privateKey)}
                        rows={2}
                        placeholder="PrivateKey is not necessary. 
                            With only PrivateKey, we can not get Mnemonic."
                    />
                </List>
                <div className={style.error}>{this.state.privateKeyError}</div>

                <Password
                    setPassword={password => this.setPassword(password)}
                ></Password>

                <WhiteSpace />
                <Button onClick={() => this.createAndGO()}>导入钱包 / Import</Button>
            </div>
        );
    }
}

export default Import