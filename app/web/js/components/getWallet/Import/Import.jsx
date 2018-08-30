import React, { Component } from 'react'
import { Button, WhiteSpace, List, TextareaItem, InputItem, Toast, Tabs, Radio, Flex } from 'antd-mobile'
import style from './Import.scss'
import { hashHistory } from 'react-router'
import passwordCheck from '../../../utils/passwordCheck'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import insertWalletInfo from '../../../utils/walletStorage'
import Password from '../Password/Password'
import WalletName from '../WalletName/WalletName'

import Agreement from '../Agreement/Agreement'

import aelf from 'aelf-sdk'


const tabs = [
  { title: '助记词' },
  { title: '私钥' }
];
// React component
class Import extends Component {
    constructor() {
        super();
        this.state = {
            mnemonic: '',
            privateKey: '',
            agreementDisplay: false
        };
        this.failMessage = '请填入助记词或者私钥';
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
            Toast.fail('导入失败');
            return;
        }

        let walletInfo = mnemonicWallet || privateKeyWallet; // 助记词钱包优先
        walletInfo.walletName = this.walletName;
        let result = insertWalletInfo(walletInfo, password);

        if (result) {
            Toast.info('导入成功，跳转到首页中', 3, () => {
                hashHistory.push('/assets');
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

    onTabChange(e) {
        // console.log('test: ', e);
        if (e.title === '私钥') {
            this.setState({
                mnemonic: ''
            });
            this.failMessage = '请填入私钥';
            // this.state.mnemonic = '';
        } else {
            this.setState({
                privateKey: ''
            });
            this.failMessage = '请填入助记词';
            // this.state.privateKey = '';
        }
    }

    setAgreement() {
        this.setState({agree: true});
    }

    toggleAgreement() {
        this.setState({
            agreementDisplay: !this.state.agreementDisplay
        });
    }
  
    render() {

        let createButton = '';
        if (this.password && this.state.walletName && this.state.agree) {
            createButton = <Button onClick={() => this.createAndGO()}>导入钱包</Button>;
        }

        return (
            <div>
                <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}
                    onChange={(e) => this.onTabChange(e)}>
                    <div style={{ height: '94px', backgroundColor: '#fff' }}>
                        {/*<List renderHeader={() => '助记词 / Mnemonic'}>*/}
                        <List>
                            <TextareaItem
                                value={this.state.mnemonic}
                                onChange={mnemonic => this.inputMnemonic(mnemonic)}
                                rows={3}
                                placeholder="此处填写助记词"
                                className={style.textareaItem}
                            />
                        </List>
                        <div className={style.error}>{this.state.mnemonicError}</div>
                    </div>
                    <div style={{ height: '94px', backgroundColor: '#fff' }}>
                        {/*<List renderHeader={() => '私钥 / PrivateKey'}>*/}
                        <List>
                            <TextareaItem
                                value={this.state.privateKey}
                                onChange={privateKey => this.inputPrivateKey(privateKey)}
                                rows={3}
                                placeholder="此处填写私钥"
                                className={style.textareaItem}
                            />
                        </List>
                        <div className={style.error}>{this.state.privateKeyError}</div>
                    </div>
                    {/*<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        Content of third tab
                    </div>*/}
                </Tabs>


                <p className={style.title}>助记词和私钥都可以，不过导入私钥将不会生成助记词</p>

                <WalletName
                    setWalletName={walletName => this.setWalletName(walletName)}
                ></WalletName>

                {/*<List renderHeader={() => '助记词 / Mnemonic'}>
                    <TextareaItem
                        value={this.state.mnemonic}
                        onChange={mnemonic => this.inputMnemonic(mnemonic)}
                        rows={3}
                        placeholder="Mnemonic"
                    />
                </List>
                <div className={style.error}>{this.state.mnemonicError}</div>*/}

                {/*<List renderHeader={() => '私钥 / PrivateKey'}>
                    <TextareaItem
                        value={this.state.privateKey}
                        onChange={privateKey => this.inputPrivateKey(privateKey)}
                        rows={2}
                        placeholder="PrivateKey is not necessary. 
                            With only PrivateKey, we can not get Mnemonic."
                    />
                </List>
                <div className={style.error}>{this.state.privateKeyError}</div>*/}

                <Password
                    setPassword={password => this.setPassword(password)}
                ></Password>

                <WhiteSpace />


                <Flex style={{ padding: '0 15px' }}>
                    <Flex.Item style={{ padding: '15px 0', color: '#888', flex: 'none' }}>
                        我已仔细阅读并同意<span 
                        className="aelf-blue"
                        onClick={() => this.toggleAgreement()}
                        >《服务及隐私条款》</span>
                    </Flex.Item>
                    <Flex.Item>
                        <Radio className="my-radio" onChange={() => this.setAgreement()}></Radio>
                    </Flex.Item>
                </Flex>

                <Agreement
                    agreementDisplay={this.state.agreementDisplay}
                    toggleAgreement={() => this.toggleAgreement()}
                ></Agreement>

                {/*<Button onClick={() => this.createAndGO()}>导入钱包</Button>*/}
                {createButton}
            </div>
        );
    }
}

export default Import