/**
 * @file WalletManage.jsx
 * @author huangzongzhe
 * 2018.08.24
 */
import React, {
    Component
} from 'react';
import {List, Modal, Toast} from 'antd-mobile';
import {hashHistory} from 'react-router';

import ListContent from '../../../../components/ListContent/ListContent';
import NoticePanel from '../../../../components/NoticePanel/NoticePanel';
import AelfButton from '../../../../components/Button/Button';

import NavWithDrawer from '../../../NavWithDrawer/NavWithDrawer';
import addressPrefixSuffix from '../../../../utils/addressPrefixSuffix';
import getPrivateKeyAndMnemonic from '../../../../utils/getPrivateKeyAndMnemonic';

import {
    insertWalletInfo,
    getPageContainerStyle,
    whetherBackupCheck
} from '../../../../utils/utils';

import {FormattedMessage} from 'react-intl';

import style from './WalletManage.scss';


const Item = List.Item;
const prompt = Modal.prompt;

export default class WalletManage extends Component {
    constructor() {
        super();
        this.state = {
            walletNameModal: false,
            nameChanged: ''
        };
    }

    changeName(name) {
        let walletId = JSON.parse(localStorage.getItem('lastuse')).address;
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletInfo = walletInfoList[walletId];
        walletInfo.walletName = name;

        insertWalletInfo(walletInfo, false);
        Toast.success('Change success', 1.5, () => {
            // hashHistory.goBack();
        }, false);
        this.setState({
            nameChanged: ''
        });
    }

    deleteWallet() {
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
        delete walletInfoList[walletAddress];

        localStorage.setItem('walletInfoList', JSON.stringify(walletInfoList));

        let count = 0;
        let lock = false;
        for (let each in walletInfoList) {
            if (count) {
                break;
            }
            else {
                console.log(each);
                localStorage.setItem('lastuse', JSON.stringify({
                    address: walletInfoList[each].address,
                    walletName: walletInfoList[each].walletName
                }));
                count++;
                lock = true;
                Toast.success('Deleted', 3, () => {
                    hashHistory.push('/personalcenter/home');
                });
            }
        }
        if (!lock) {
            localStorage.removeItem('walletInfoList');
            localStorage.removeItem('lastuse');
            Toast.fail('No wallet now，please create or insert a wallet.', 3, () => {
                hashHistory.push('/get-wallet/guide');
            }, false);
        }
    }

    passwordCheck(password = '') {
        getPrivateKeyAndMnemonic(password || this.state.password).then(result => {
            this.deleteWallet();
        }).catch(error => {
            Toast.fail('Password Error', 1, () => {}, false);
        });
    }

    render() {

        let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
        let walletAddressShow = addressPrefixSuffix(JSON.parse(localStorage.getItem('lastuse')).address);
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletName = walletInfoList[walletAddress].walletName;

        if (!whetherBackupCheck()) {
            walletAddress = 'Please backup your wallet';
        }

        let containerStyle = getPageContainerStyle();
        containerStyle.height = containerStyle.height - 61;
        let html
            = <div className={'aelf-personal-pages aelf-solid' + ' ' + style.container} style={containerStyle}>
                <div className={style.top}>
                    <NoticePanel
                        mainTitle={walletName}
                        subTitle={[
                            walletAddressShow
                        ]}
                        subTitleStyle={{
                            opacity: 0.5
                        }}
                        iconHidden={true}
                    />

                    {/*<List>*/}
                    {/*<Item>*/}
                    {/*<div>{walletName}</div>*/}
                    {/*<div style={{fontSize: '12px'}}>{walletAddress}</div>*/}
                    {/*</Item>*/}
                    {/*</List>*/}
                    {/*// Todo: 将这种promt用Modal重写，保证 maskClosable*/}
                    <List className={'aelf-list'}>
                        {/*arrow="horizontal"*/}
                        <Item
                            onClick={
                                () => prompt('', 'New Name', [{
                                    text: 'Cancel'
                                }, {
                                    text: 'Submit',
                                    onPress: name => this.changeName(name)
                                }], 'default', '')
                            }>
                            <ListContent
                                text={
                                    <FormattedMessage
                                        id='aelf.Wallet Name'
                                        defaultMessage='Wallet Name'
                                    />
                                }
                            />
                        </Item>
                    </List>

                    <List className={'aelf-list'}>
                        <Item onClick={() => hashHistory.push('/get-wallet/backup')}>
                            <ListContent
                                text={
                                    <FormattedMessage
                                        id='aelf.Backup'
                                        defaultMessage='Backup'
                                    />
                                }
                            />
                        </Item>
                    </List>
                    <List className={'aelf-list'}>
                        <Item onClick={() => hashHistory.push('/personalcenter/passwordchange')}>
                            <ListContent
                                text={
                                    <FormattedMessage
                                        id='aelf.Change Password'
                                        defaultMessage='Change Password'
                                    />
                                }
                            />
                        </Item>
                    </List>
                </div>

                <div className={style.bottom}>
                    <AelfButton
                        text="Delete Wallet"
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
                                              this.passwordCheck(password);
                                          }
                                      }
                                  ],
                                  'secure-text',
                                );
                            }
                        }
                    />
                </div>
            </div>;

        return (
            <div>
                <NavWithDrawer
                    showLeftClick={true}
                    hiddenBottom={true}
                    onLeftClick={() => hashHistory.push('/personalcenter/home')}
                    children={html} />
            </div>
        );
    }
};
