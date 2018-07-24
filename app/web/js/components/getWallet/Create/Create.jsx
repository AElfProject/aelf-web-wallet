import React, { Component } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import style from './Create.scss'
import { hashHistory } from 'react-router'

import aelf from 'aelf-sdk'

// React component
class Agreement extends Component {
    constructor() {
        super();
        this.haveCreate = false;
        this.creating = false;
    }

    createAndGO() {
        if (!!this.haveCreate) {
            alert('钱包已经创建');
            hashHistory.push('/');
            return;
        }
        if (!!this.creating) {
            alert('钱包正在创建中');
            return;
        }

        this.creating = true;

        let password = 'hzz123';

        // TODO: 将localStorage部分封装到aelf-sdk中去，
        // node部分使用file（json）存储，RN使用AsyncStorage.
        let walletInfo = aelf.wallet.createNewWallet();
        console.log('walletInfo:::: ', walletInfo);
        walletInfo.AESEncryptoPrivateKey = aelf.wallet.AESEncrypto(walletInfo.privateKey, password);
        walletInfo.AESEncryptoMnemonic = aelf.wallet.AESEncrypto(walletInfo.mnemonic, password);

        delete walletInfo.privateKey;
        delete walletInfo.mnemonic;
        delete walletInfo.xPrivateKey;

        console.log('window decrypto: ', window.Aelf.wallet.AESDecrypto(walletInfo.AESEncryptoPrivateKey, password));
        console.log('aelf decrypto: ', aelf.wallet.AESDecrypto(walletInfo.AESEncryptoMnemonic, password));
        console.log('wallet info: ', walletInfo);
        if (typeof localStorage !== 'undefined') {
            let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList')) || {};

            // 日哦, 哪里配错了？不让我用。。。babel?
            // walletInfoList[walletInfo.address] = {
            //     ...walletInfo,
            //     walletId: walletInfo.address,
            //     assets: [{
            //         contractAddress: '',
            //         tokenName: '',
            //         // balance 从服务器再取
            //     }]
            // };
            walletInfoList[walletInfo.address] = Object.assign(walletInfo, {
                walletId: walletInfo.address,
                assets: [{
                    contractAddress: '',
                    tokenName: ''
                }]
            });
            localStorage.setItem('walletInfoList', JSON.stringify(walletInfoList));
            localStorage.setItem('agreement', true);
            localStorage.setItem('lastuse', walletInfo.address);
        } else {
            // TODO, 将这种判断提前到react的js加载之前。
            alert('不支持使用钱包, 请使用现代浏览器，如: chrome, Firefox, IE10及以上');
        }
        this.haveCreate = true;
        // TODO, 不提供限时的backup回退到这个页面
        // hashHistory.push('/get-wallet/backup')
    }

    render() {
        return (
            <div>
                <div className={style.center}>
                    <h3>AELF使用条款</h3>
                </div>
                <WhiteSpace />
                <div className={style.textContainer}>
                    这里放条款
                </div>
                <WhiteSpace />
                {/*<Button onClick={() => this.nextPage()}>已阅读并且同意条款</Button>*/}
                <Button onClick={() => this.createAndGO()}>确认生成钱包</Button>
            </div>
        );
    }
}

export default Agreement