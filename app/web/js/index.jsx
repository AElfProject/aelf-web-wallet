import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
import { LocaleProvider } from 'antd-mobile'
// import { Provider } from 'react-redux'
// import { mapDispatchToProps } from './actions'

import { Router, Route, hashHistory } from 'react-router'
import enUS from 'antd-mobile/lib/locale-provider/en_US';

// import store from './store'

import getWalletNav from './pages/getWallet/Nav/Nav'
import getWalletGuide from './pages/getWallet/Guide/Guide'
import getWalletAgreement from './pages/getWallet/Agreement/Agreement'
import getWalletCreate from './pages/getWallet/Create/Create'
import getWalletBackup from './pages/getWallet/Backup/Backup'
import getWalletImport from './pages/getWallet/Import/Import'

import HomePage from './pages/HomePage/HomePage'
import Assets from './pages/Assets/Assets'
import AssetHome from './pages/Asset/Home/Home'
import AssetTransfer from './pages/Asset/Transfer/Transfer'
import AssetTransactionDetail from './pages/Asset/TransactionDetail/TransactionDetail'

import personalCenterHome from './pages/personalCenter/Home/Home'
import personalCenterAbout from './pages/personalCenter/About/About'

import PasswordChange from './pages/personalCenter/WalletList/PasswordChange/PasswordChange'
import WalletList from './pages/personalCenter/WalletList/WalletList'
import WalletManage from './pages/personalCenter/WalletList/WalletManage/WalletManage'

// 关于我们
import Privacy from './pages/personalCenter/About/pages/Privacy'
import Service from './pages/personalCenter/About/pages/Service'

// 帮助中心
import personalCenterHelpCenter from './pages/personalCenter/HelpCenter/HelpCenter'
import WhatIsMnemonic from './pages/personalCenter/HelpCenter/pages/WhatIsMnemonic'
import WhatIsKeyStore from './pages/personalCenter/HelpCenter/pages/WhatIsKeyStore'
import WhatIsPrivatePublicKey from './pages/personalCenter/HelpCenter/pages/WhatIsPrivatePublicKey'
import WhatIsAElfWallet from './pages/personalCenter/HelpCenter/pages/WhatIsAElfWallet'
import HowToChangePassword from './pages/personalCenter/HelpCenter/pages/HowToChangePassword'

// 系统设置
import personalCenterSystemSetting from './pages/personalCenter/systemSetting/SystemSetting'
import systemSettingNetwork from './pages/personalCenter/systemSetting/pages/Network'


import QRCode from './pages/QRCode/QRCode'
import ErrorPage from './pages/ErrorPage/ErrorPage'

// 联系人
import ContactAddressPage from './pages/ContactAddressPage/ContactAddressPage'
import NewContactAddressPage from './pages/ContactAddressPage/NewContactAddressPage/NewContactAddressPage'

// 交易列表
import Transactions from './pages/Transactions/Transactions'


// import style from '../style/index.scss'
require('./../style/ant-mobile-aelf.css');

// bind to window, fetch polyfill.
import 'whatwg-fetch';

// TODO: localStorage file, asyncStorage统一成一个方法。
let walletInfoList = localStorage.getItem('walletInfoList');

if (!walletInfoList) {
    hashHistory.replace('/get-wallet/guide');
} else if (hashHistory.getCurrentLocation().pathname == '/') {
    hashHistory.replace('/assets');
}

// remove welcome-page
let welcomePage = document.getElementById('welcome-page');

welcomePage.style.opacity = 0;
setTimeout(() => {
    welcomePage.style.display = 'none';
}, 600);

setTimeout(() => {
    ReactDOM.render(
        <LocaleProvider locale={enUS}>
            {/*<Provider store={store}>*/}
            <Router history={hashHistory}>
                <Route path="/" component={HomePage}>
                    <Route path="/assets" component={Assets}></Route>
                    {/*<Route path="/qrcode" component={QRCode}></Route>*/}
                    <Route path="/personalcenter/home" component={personalCenterHome}></Route>
                    <Route path="/personalcenter/walletlist" component={WalletList}></Route>
                </Route>

                <Route path="/qrcode" component={QRCode}></Route>

                <Route path="/transactiondetail" component={AssetTransactionDetail}></Route>
                <Route path="/personalcenter/walletmanage" component={WalletManage}></Route>

                <Route path="/assethome" component={AssetHome}></Route>
                <Route path="/assettransfer" component={AssetTransfer}></Route>
                <Route path="/personalcenter/passwordchange" component={PasswordChange}></Route>

                <Route path="/personalcenter/about" component={personalCenterAbout}></Route>
                <Route path="/personalcenter/about/privacy" component={Privacy}></Route>
                <Route path="/personalcenter/about/service" component={Service}></Route>

                <Route path="/personalcenter/help" component={personalCenterHelpCenter}></Route>
                <Route path="/personalcenter/whatismnemonic" component={WhatIsMnemonic}></Route>
                <Route path="/personalcenter/whatiskeystore" component={WhatIsKeyStore}></Route>
                <Route path="/personalcenter/whatisprivatepublickey" component={WhatIsPrivatePublicKey}></Route>
                <Route path="/personalcenter/whatisaelfwallet" component={WhatIsAElfWallet}></Route>
                <Route path="/personalcenter/howtochangepassword" component={HowToChangePassword}></Route>

                <Route path="/personalcenter/systemsetting" component={personalCenterSystemSetting}></Route>
                <Route path="/personalcenter/systemsetting/network" component={systemSettingNetwork}></Route>

                <Route path="/get-wallet/backup" component={getWalletBackup}/>

                <Route path="/agreement" component={getWalletAgreement}/>
                <Route path="/get-wallet/nav" component={getWalletNav}>
                    <Route path="/get-wallet/guide" component={getWalletGuide}/>
                    <Route path="/get-wallet/create" component={getWalletCreate}/>
                    <Route path="/get-wallet/import" component={getWalletImport}/>
                </Route>

                <Route path="/error" component={ErrorPage}></Route>
                
                <Route path="/contactaddress" component={ContactAddressPage}></Route>
                <Route path="/contactaddress/newcontactaddress" component = {NewContactAddressPage}></Route>
                
                <Route path="/transactions" component = {Transactions} ></Route>
                
            </Router>
            {/*</Provider>*/}
        </LocaleProvider>,
        document.getElementById('root')
    );
}, 0);
