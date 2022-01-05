import React, { Component, Fragment } from 'react'
import { Modal, Button, WhiteSpace, List, InputItem, Toast } from 'antd-mobile'
import style from './Backup.scss'

import Mnemonic from './pages/Mnemonic'
import SelectModal from "../../../components/SelectModal/SelectModal";
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import { historyPush } from '../../../utils/historyChange'
import clipboard from '../../../utils/clipboard'
import getPageContainerStyle from '../../../utils/getPageContainerStyle'
import getPrivateKeyAndMnemonic from '../../../utils/getPrivateKeyAndMnemonic'

import backupStatusChange from '../../BackupNotice/backupStatusChange'
import AelfButton from '../../../components/Button/Button'
import Svg from '../../../components/Svg/Svg'
import NoticePanel from '../../../components/NoticePanel/NoticePanel'

import NavNormal from '../../NavNormal/NavNormal'

import aelf from 'aelf-sdk'

import { FormattedMessage } from 'react-intl'
import WalletUtil from "../../../utils/Wallet/wallet";

const prompt = Modal.prompt;

// React component
class Backup extends Component {
    constructor() {
        super();
        const walletUtilInstance = new WalletUtil();
        let walletInfoList = walletUtilInstance.getWalletInfoListSync();

        let walletId = walletUtilInstance.getLastUse().address;
        let walletInfo = walletInfoList[walletId];

        this.state = {
            privateKey: '',
            // mnemonic: 'grocery jungle body action shop vast toilet fog prevent banner deliver indicate',
            mnemonic: '',
            password: '',
            AESEncryptoMnemonic: walletInfo.AESEncryptoMnemonic,
            mnemonicDisplay: false,
            privateKeyModal: false,
            passwordModal: false
        };
        clipboard('#clipboard-backup');
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

    passwordCheck(password = '') {
        password = password || this.state.password;
        return getPrivateKeyAndMnemonic(password).then(result => {
            this.setState({
                privateKey: result.privateKey,
                mnemonic: result.mnemonic
            });
            return true;
        }).catch(error => {
            Toast.fail('Password Error', 1, () => {}, false);
            return false;
        });
    }

    // 子组件要用，要么this.toggleMnemonic = this.toggleMnemonic.bind(this);
    // 要么在传递是使用箭头函数，比如: onLeftClick={() => this.toggleMnemonic()}
    toggleMnemonic() {
        this.setState({
            mnemonicDisplay: !this.state.mnemonicDisplay
        });
    }

    componentDidUpdate() {
        if (this.state.mnemonicDisplay && !this.state.mnemonic) {
            this.state.mnemonicDisplay = false;
            // Toast.fail('该钱包是由私钥导入，无助记词', 2, () => {}, false);
            Toast.fail('There is no Mnemonic because the wallet import by Private Key.', 2, () => {}, false);
        }
    }

    render() {

        let mnemonicHtml = '';
        if (this.state.mnemonic) {
            mnemonicHtml =  <Mnemonic
                                navTitle="Mnemonic"
                                mnemonic={this.state.mnemonic}
                                display={this.state.mnemonicDisplay}
                                onLeftClick={() => this.toggleMnemonic()}>
                            </Mnemonic>;
        }
        let mnemonicButtonHtml;
        if (this.state.AESEncryptoMnemonic) {
          mnemonicButtonHtml
            = <Fragment>
              <AelfButton
                  text='Mnemonic'
                  onClick={(e) => prompt(
                      'Password',
                      'Please make sure you are under safe enviroment.',
                      [
                          { text: 'Cancel' },
                          { text: 'Submit', onPress: password => {
                                  this.passwordCheck(password).then(result => {
                                      result && this.toggleMnemonic();
                                  });
                              }
                          },
                      ],
                      'secure-text',
                  )}
              />

              <div className='aelf-blank12'/>
          </Fragment>;
        }

        let containerStyle = getPageContainerStyle();

        return (
            <div className='aelf-bg-light'>

                {/*<NavNormal navTitle="导入钱包" */}
                <NavNormal
                    onLeftClick={() => historyPush('/personalcenter/walletManage')}
                />

                <div className={style.container} style={containerStyle}>
                    <div className={style.textContainer}>
                        <NoticePanel
                            mainTitle={
                                <FormattedMessage
                                    id = 'aelf.Backup Wallet'
                                    defaultMessage = 'Backup Wallet'
                                />
                            }
                            subTitle={[
                                <FormattedMessage
                                    id = 'aelf.AElf Wallet'
                                    defaultMessage = 'AElf Wallet'
                                />,
                                <FormattedMessage
                                    id = 'aelf.Manage your wallet addresses'
                                    defaultMessage = 'Manage your wallet addresses'
                                />
                            ]}
                            content={[
                                // '请在安全的环境下备份助记词！',
                                // '没有妥善备份就无法保障资产安全；',
                                // '删除程序或钱包后，',
                                // '您需要通过备份的助记词来会恢复钱包！'
                                <FormattedMessage
                                    id = 'aelf.Becareful03'
                                    defaultMessage = 'Please backup your Mnemonic in a secure environment!'
                                />,
                                <FormattedMessage
                                    id = 'aelf.Becareful04'
                                    defaultMessage = 'No secure Mnemonic backup means no secure wallet.'
                                />,
                                <FormattedMessage
                                    id = 'aelf.Becareful05'
                                    defaultMessage = 'In the case of wallet or App deletion,'
                                />,
                                <FormattedMessage
                                    id = 'aelf.Becareful06'
                                    defaultMessage = 'you will need your Mnemonic to recover your wallet.'
                                />
                            ]}
                        />
                    </div>

                    <div className={style.bottom}>

                        {mnemonicButtonHtml}

                        <div className='aelf-blank12'/>

                        <AelfButton
                            text='Private Key'
                            onClick={
                                e => {
                                    // be nullified after the event callback has been invoked,
                                    // if dont e.persist(), we can't get e.preventDefault in this.showModal
                                    // https://reactjs.org/docs/events.html#event-pooling
                                    e.persist();
                                    prompt(
                                        'Password',
                                        'Please make sure you are under safe enviroment.',
                                        [
                                            { text: 'Cancel' },
                                            { text: 'Submit', onPress: password => {
                                                    this.passwordCheck(password).then(result => {
                                                        result && this.showModal(e, 'privateKeyModal');
                                                    });
                                                }
                                            },
                                        ],
                                        'secure-text',
                                    );
                                }
                            }
                        />
                    </div>
                </div>

                <SelectModal
                    visible={!this.state.privateKeyModal}
                    privateKey={this.state.privateKey}
                    type="backup"
                    onSure={()=>{
                        this.onClose('privateKeyModal')
                    }}
                    onCancel={() => {
                        this.onClose('privateKeyModal')
                    }}
                    />
                {/* <Modal
                    popup
                    visible={this.state.privateKeyModal}
                    onClose={() => this.onClose('privateKeyModal')}
                    animationType="slide-up"
                >
                    <div>
                        <div className={style.pannelTitle}>
                            <FormattedMessage
                                id = 'aelf.Copy Private Key'
                                defaultMessage = 'Copy Private Key'
                            />
                        </div>
                        <div className={style.copyArea}>
                            <div style={{ width: '100%' }}>
                                {this.state.privateKey}
                            </div>
                            <textarea
                                id="privateKeyBackUp"
                                className={style.textarea}
                                defaultValue={this.state.privateKey}>
                            </textarea>
                        </div>

                        <div
                            className={style.pannelBtnPurple}
                            onClick={() => {
                                let btn = document.getElementById('clipboard-backup');
                                btn.click();
                            }}
                        >
                            <FormattedMessage
                                id = 'aelf.Copy'
                                defaultMessage = 'Copy'
                            />
                        </div>
                        <div
                            className={style.pannelBtnPurple + ' ' + style.pannerlBtnGrey}
                            onClick={() => this.onClose('privateKeyModal')}
                        >
                            <FormattedMessage
                                id = 'aelf.Close'
                                defaultMessage = 'Close'
                            />
                        </div>
                        <button
                          id="clipboard-backup"
                          data-clipboard-target="#privateKeyBackUp"
                          style={{display: 'none'}}>copy</button>
                    </div>
                </Modal> */}


               {mnemonicHtml}

            </div>
        );
    }
}

export default Backup
