import React, { Component } from 'react'
import { Button, WhiteSpace, List, InputItem, Toast } from 'antd-mobile'
import Password from '../Password/Password'

import style from './Create.scss'
import { hashHistory } from 'react-router'

import passwordCheck from '../../../utils/passwordCheck'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import insertWalletInfo from '../../../utils/walletStorage'

import aelf from 'aelf-sdk'

// React component
class Create extends Component {
    constructor() {
        super();
        this.haveCreate = false;
        this.creating = false;
        this.state = {
            password: ''
        };
    }

    createAndGO() {
        if (!!this.haveCreate) {
            Toast.info('钱包已经创建', 3, () => {
                hashHistory.push('/get-wallet/backup');
            });
            return;
        }
        if (!!this.creating) {
            Toast.info('钱包正在创建中', 3);
            return;
        }

        this.creating = true;

        let password = this.state.password;

        let walletInfo = aelf.wallet.createNewWallet();
        let result = insertWalletInfo(walletInfo, password);

        if (result) {
            this.haveCreate = true;
            Toast.info('Create success. Turn to Backup after 3s.', 3, () => {
                hashHistory.push('/get-wallet/backup');
            });
        } else {
            Toast.fail('(꒦_꒦) ...Fail, please check the form. Or call Huang Zongzhe');
        }
    }

    setPassword(password) {
        this.setState({password: password});
    }

    render() {
        let createButton = '';
        if (this.state.password) {
            createButton = <Button onClick={() => this.createAndGO()}>ELF to da moon!</Button>;
        }

        return (
            <div>
                <h3 className={style.title}>创建钱包 / Create Wallet</h3>

                <div className={style.text}>
                    <p>https://en.wikipedia.org/wiki/Advanced_Encryption_Standard</p>
                    <p>AES: In June 2003, the U.S. Government announced that AES could be used to protect classified information;</p>
                    <p>Your privateKey,mnemonic + password -> AES -> localStorage without network transfer</p>
                </div>

                 <Password
                    setPassword={password => this.setPassword(password)}
                ></Password>

                <WhiteSpace />
                {createButton}
            </div>
        );
    }
}

export default Create