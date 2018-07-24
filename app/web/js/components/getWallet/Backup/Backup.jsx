import React, { Component } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import style from './Backup.scss'
import { hashHistory } from 'react-router'
import aelf from 'aelf-sdk'

// React component
class Backup extends Component {
    constructor() {
        super();
        this.state = {
            privateKey: null,
            mnemonic: null
        };
    }

    getPrivateKeyAndMnemonic() {
        let password = 'hzz123';

        let walletId = localStorage.getItem('lastuse');
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletInfo = walletInfoList[walletId];

        let privateKey = aelf.wallet.AESDecrypto(walletInfo.AESEncryptoPrivateKey, password);
        let mnemonic = aelf.wallet.AESDecrypto(walletInfo.AESEncryptoMnemonic, password);

        this.setState({'privateKey': privateKey});
        this.setState({'mnemonic': mnemonic});

        console.log(privateKey);
        console.log(mnemonic);
    }
  
    render() {
        let goBack = '';

        if (this.state.mnemonic) {
            goBack = <Button onClick={() => hashHistory.push('/')}>返回</Button>;
        }

        return (
            <div>
                <div>
                    <h3>请确保环境安全下备份助记词和私钥</h3>
                </div>
                <WhiteSpace />
                <Button onClick={() => this.getPrivateKeyAndMnemonic()}>获取助记词和私钥</Button>
                <WhiteSpace />
                <div className={style.forbidden}>{this.state.mnemonic}</div>
                <WhiteSpace />
                <div className={style.forbidden}>{this.state.privateKey}</div>

                {goBack}
            </div>
        );
    }
}

export default Backup