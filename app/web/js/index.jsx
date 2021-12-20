/**
 *  @file
 *  @author huangzongzhe
 */


import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux'
import {LocaleProvider} from 'antd-mobile';
// import { Provider } from 'react-redux'
// import { mapDispatchToProps } from './actions'

import {Router, Route, hashHistory} from 'react-router';
// import store from './store'

import getWalletNav from './pages/getWallet/Nav/Nav';
import getWalletGuide from './pages/getWallet/Guide/Guide';
import getTypeSelect from './pages/TypeSelect/TypeSelect';
import getWalletAgreement from './pages/getWallet/Agreement/Agreement';
import getWalletCreate from './pages/getWallet/Create/Create';
import getWalletBackup from './pages/getWallet/Backup/Backup';
import getWalletImport from './pages/getWallet/Import/Import';

import HomePage from './pages/HomePage/HomePage';
import Assets from './pages/Assets/Assets';
import AssetHome from './pages/Asset/Home/Home';
import AssetTransfer from './pages/Asset/Transfer/Transfer';
import AssetTransactionDetail from './pages/Asset/TransactionDetail/TransactionDetail';

import personalCenterHome from './pages/personalCenter/Home/Home';
import personalCenterAbout from './pages/personalCenter/About/About';

import PasswordChange from './pages/personalCenter/WalletList/PasswordChange/PasswordChange';
import WalletList from './pages/personalCenter/WalletList/WalletList';
import WalletManage from './pages/personalCenter/WalletList/WalletManage/WalletManage';

// 关于我们
import Privacy from './pages/personalCenter/About/pages/Privacy';
import Service from './pages/personalCenter/About/pages/Service';

// 帮助中心
import personalCenterHelpCenter from './pages/personalCenter/HelpCenter/HelpCenter';
import WhatIsMnemonic from './pages/personalCenter/HelpCenter/pages/WhatIsMnemonic';
import WhatIsKeyStore from './pages/personalCenter/HelpCenter/pages/WhatIsKeyStore';
import WhatIsPrivatePublicKey from './pages/personalCenter/HelpCenter/pages/WhatIsPrivatePublicKey';
import WhatIsAElfWallet from './pages/personalCenter/HelpCenter/pages/WhatIsAElfWallet';
import HowToChangePassword from './pages/personalCenter/HelpCenter/pages/HowToChangePassword';
import ForgetPassword from './pages/personalCenter/HelpCenter/pages/ForgetPassword';
import NotesOnCrossChainTransfer from './pages/personalCenter/HelpCenter/pages/NotesOnCrossChainTransfer';
// 系统设置
import personalCenterSystemSetting from './pages/personalCenter/systemSetting/SystemSetting';
import systemSettingNetwork from './pages/personalCenter/systemSetting/pages/Network';

// Cross Chain
import UnconfirmedTransactions from './pages/personalCenter/CrossChainTransfer/UnconfirmedTransactions';

// 联系人列表
import ContactAddressPage from './pages/ContactAddressPage/ContactAddressPage';
import NewContactAddressPage from './pages/ContactAddressPage/NewContactAddressPage/NewContactAddressPage';

// 交易列表
import Transactions from './pages/Transactions/Transactions';


import QRCode from './pages/QRCode/QRCode';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import DevDemo from './pages/DevDemo/DevDemo';

// bind to window, fetch polyfill.
import 'whatwg-fetch';

import AddToken from './pages/AddToken/AddToken';
import Cookies from 'js-cookie';
import {
    get
} from './utils/apisauce';

// react-intl 国际化
// 有可能是当时书写有问题
// 导入 i18n 配置文件,需要手动创建并填入语言转换信息
import {antdChooseLocale, chooseLocale} from './utils/utils';
import {IntlProvider, addLocaleData} from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import WalletUtil from "./utils/Wallet/wallet";
// import enUS from 'antd-mobile/lib/locale-provider/en_US';
/* eslint-disable fecs-camelcase */

addLocaleData([...zh, ...en]);

// import style from '../style/index.scss'
require('./../style/ant-mobile-aelf.css');

function initPage() {
    // TODO: localStorage file, asyncStorage统一成一个方法。
    const walletUtilInstance = new WalletUtil();
    let walletInfoList = walletUtilInstance.getWalletInfoListSync();
    let walletType = walletUtilInstance.getWalletType();

    // TODO: 通过localStorage 判断所选语言
    if (!walletType) {
        hashHistory.replace('/connect');
    }
    if (!walletInfoList) {
        if (!walletType) {} else if (walletType === 'local') {
            hashHistory.replace('/get-wallet/guide');
        }
    }
    else if (hashHistory.getCurrentLocation().pathname === '/') {
        hashHistory.replace('/connect');
    }

    // remove welcome-page
    let welcomePage = document.getElementById('welcome-page');

    welcomePage.style.opacity = 0;
    setTimeout(() => {
        welcomePage.style.display = 'none';
    }, 600);

    setTimeout(() => {
        ReactDOM.render(
            <IntlProvider locale={localStorage.language || 'en-US'} messages={chooseLocale()} >
                <LocaleProvider locale={antdChooseLocale()} >
                    {/*<Provider store={store}>*/}
                    <Router history={hashHistory}>
                        <Route path="/" component={HomePage}>
                            <Route path="/assets" component={Assets}/>
                            {/*<Route path="/qrcode" component={QRCode}/></Route>*/}
                            <Route path="/personalcenter/home" component={personalCenterHome}/>
                            <Route path="/personalcenter/walletlist" component={WalletList}/>
                        </Route>

                        <Route path="/qrcode" component={QRCode}/>

                        <Route path="/transactiondetail" component={AssetTransactionDetail}/>
                        <Route path="/personalcenter/walletmanage" component={WalletManage}/>

                        <Route path="/assethome" component={AssetHome}/>
                        <Route path="/assettransfer" component={AssetTransfer}/>
                        <Route path="/personalcenter/passwordchange" component={PasswordChange}/>

                        <Route path="/personalcenter/about" component={personalCenterAbout}/>
                        <Route path="/personalcenter/about/privacy" component={Privacy}/>
                        <Route path="/personalcenter/about/service" component={Service}/>

                        <Route path="/personalcenter/unconfirmedtransactions" component={UnconfirmedTransactions}/>

                        <Route path="/personalcenter/help" component={personalCenterHelpCenter}/>
                        <Route path="/personalcenter/whatismnemonic" component={WhatIsMnemonic}/>
                        <Route path="/personalcenter/whatiskeystore" component={WhatIsKeyStore}/>
                        <Route path="/personalcenter/whatisprivatepublickey" component={WhatIsPrivatePublicKey}/>
                        <Route path="/personalcenter/whatisaelfwallet" component={WhatIsAElfWallet}/>
                        <Route path="/personalcenter/howtochangepassword" component={HowToChangePassword}/>
                        <Route path="/personalcenter/forget" component={ForgetPassword} />
                        <Route path="/personalcenter/notesoncrosschaintransfer" component={NotesOnCrossChainTransfer} />
                        <Route path="/personalcenter/systemsetting" component={personalCenterSystemSetting}/>
                        <Route path="/personalcenter/systemsetting/network" component={systemSettingNetwork}/>

                        <Route path="/get-wallet/backup" component={getWalletBackup} />

                        <Route path="/connect" component={getTypeSelect} />

                        <Route path="/agreement" component={getWalletAgreement} />
                        <Route path="/get-wallet/nav" component={getWalletNav}>
                            <Route path="/get-wallet/guide" component={getWalletGuide} />
                            <Route path="/get-wallet/create" component={getWalletCreate} />
                            <Route path="/get-wallet/import" component={getWalletImport} />
                        </Route>

                        <Route path="/error" component={ErrorPage}/>
                        <Route path="/dev-demo" component={DevDemo}/>

                        <Route path='/contactaddress' component={ContactAddressPage}/>
                        <Route path='/contactaddress/newcontactaddress' component={NewContactAddressPage}/>

                        <Route path='/transactions' component={Transactions} />

                        <Route path='/addtoken' component={AddToken} />

                    </Router>
                    {/*</Provider>*/}
                </LocaleProvider>
            </IntlProvider>,
            document.getElementById('root')
        );
    }, 0);
}

async function getNodesInfo() {

    let currentChain = JSON.parse(localStorage.getItem('currentChain'));

    if (currentChain) {
        const {
            contract_address,
            chain_id
        } = currentChain;
        Cookies.set('aelf_ca_ci', contract_address + chain_id);
        initPage();
    }

    const nodesInfoProvider = 'api/nodes/info';
    const nodesInfo = await get(nodesInfoProvider);

    if (nodesInfo.error === 0 && nodesInfo.result && nodesInfo.result.list) {
        const nodesInfoList = nodesInfo.result.list;
        localStorage.setItem('nodesInfo', JSON.stringify(nodesInfoList));
        if (currentChain) {
            return;
        }

        const nodeInfo = nodesInfoList.find(item => {
            if (item.chain_id === 'AELF') {
                return item;
            }
        });
        const {
            contract_address,
            chain_id
        } = nodeInfo;
        localStorage.setItem('currentChain', JSON.stringify(nodeInfo));
        Cookies.set('aelf_ca_ci', contract_address + chain_id);
        initPage();
    }
    // TODO: turn to 404 page.
}

// getNodesInfo();
initPage();
