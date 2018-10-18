import React, { Component } from 'react'
import { WhiteSpace, List, InputItem, Toast, Radio, Flex } from 'antd-mobile'
import Password from '../../../components/Password/Password'
import WalletName from '../WalletName/WalletName'
import AelfButton from '../../../components/Button/Button'
import Svg from '../../../components/Svg/Svg'
import NoticePanel from '../../../components/NoticePanel/NoticePanel'

import style from './Create.scss'
import { hashHistory } from 'react-router'

import passwordCheck from '../../../utils/passwordCheck'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import insertWalletInfo from '../../../utils/walletStorage'
import bindToken from '../../../utils/bindToken'
import getPageContainerStyle from '../../../utils/getPageContainerStyle'

import Agreement from '../Agreement/Agreement'

import aelf from 'aelf-sdk'

// React component
class Create extends Component {
    constructor() {
        super();
        this.haveCreate = false;
        this.creating = false;
        this.state = {
            password: '',
            agreementDisplay: false
        };
        this.backpDir = '/get-wallet/backup?hash_redirect=%2Fassets'
    }

    createAndGO() {
        if (!!this.haveCreate) {
            Toast.info('钱包已经创建', 3, () => {
                hashHistory.push(this.backpDir);
            });
            return;
        }
        if (!!this.creating) {
            Toast.info('钱包正在创建中', 3);
            return;
        }
        Toast.info('钱包初始化中', 30);

        this.creating = true;

        let password = this.state.password;

        let walletInfo = aelf.wallet.createNewWallet();
        walletInfo.walletName = this.state.walletName;
        // 如果是创建的钱包，需要先备份才能使用，否则转账，获取收款二维码的操作将跳转到提示页。
        walletInfo.hasBackup = false;
        let result = insertWalletInfo(walletInfo, password);

        if (result) {
            this.haveCreate = true;

            bindToken({
                address: result.address,
                contract_address: window.defaultConfig.mainContract,
                signed_address: result.signedAddress,
                public_key: result.publicKey
            }, () => {
                Toast.hide();
                Toast.success('创建成功', 3, () => {
                    hashHistory.push(this.backpDir);
                });
            });
        } else {
            Toast.fail('(꒦_꒦) ...额，要不去github联系下作者？');
        }
    }

    setPassword(password) {
        this.setState({password: password});
    }

    setWalletName(walletName) {
        this.setState({walletName: walletName})
    }

    inputWalletName(walletName) {
        this.setState({walletName: walletName});
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
        let createButton =
            <AelfButton
                text="创建"
                style={{
                    opacity: 0.5
                }}
            ></AelfButton>;
        if (this.state.password && this.state.walletName && this.state.agree) {
            createButton =
                <AelfButton
                    text="创建"
                    onClick={() => this.createAndGO()}
                ></AelfButton>;
        }

        // let argeementStyle = this.state.agreementDisplay ? { display: 'block' } : { display: 'none' };
        // argeementStyle.height = document.documentElement.offsetHeight;

        let agreementHtml = <Svg icon="radio_select12"></Svg>;
        if (this.state.agree) {
            agreementHtml = <Svg icon="radio_selected12"></Svg>
        }

        let containerStyle = getPageContainerStyle();
        return (
            <div className={style.container} style={containerStyle}>
                <div style={{
                    margin: '24px 0 0 0'
                }}>
                    <NoticePanel
                        mainTitle={'创建钱包'}
                        content={[
                            '密码用于加密私钥和助记词, 至少9位混合大小写和数字。',
                            'AElf钱包不会储存密码，也无法帮您找回，请务必牢记！'
                        ]}
                    ></NoticePanel>

                    <WalletName
                        setWalletName={walletName => this.setWalletName(walletName)}
                    ></WalletName>

                    <Password
                        setPassword={password => this.setPassword(password)}
                    ></Password>

                    <Flex style={{ padding: '0 24px 0 24px' }}>

                        <Flex.Item style={{ padding: '15px 0', color: '#FFF', flex: 'none', opacity: 0.5 }}>
                            我已仔细阅读并同意<span
                            className="aelf-blue"
                            style={{
                                color: '#26B7FF'
                            }}
                            onClick={() => this.toggleAgreement()}
                        >《服务及隐私条款》</span>
                        </Flex.Item>
                        <Flex.Item>
                            <div onClick={() => this.setAgreement()}>
                                {agreementHtml}
                            </div>
                        </Flex.Item>
                    </Flex>

                    <Agreement
                        agreementDisplay={this.state.agreementDisplay}
                        toggleAgreement={() => this.toggleAgreement()}
                    ></Agreement>
                </div>

                <div className={style.bottom}>
                    {createButton}
                </div>
            </div>
        );
    }
}

export default Create