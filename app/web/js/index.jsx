import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mapDispatchToProps } from './actions'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

// import aelf from 'aelf-sdk'
import store from './store'

import getWalletNav from './components/getWallet/Nav/Nav'
import getWalletGuide from './components/getWallet/Guide/Guide'
import getWalletAgreement from './components/getWallet/Agreement/Agreement'
import getWalletCreate from './components/getWallet/Create/Create'
import getWalletBackup from './components/getWallet/Backup/Backup'
import getWalletImport from './components/getWallet/Import/Import'

import HomePage from './components/HomePage/HomePage'
import Assets from './components/Assets/Assets'
import AssetHome from './components/Asset/Home/Home'
import AssetTransfer from './components/Asset/Transfer/Transfer'
import AssetTransactionDetail from './components/Asset/TransactionDetail/TransactionDetail'

import personalCenterHome from './components/personalCenter/Home/Home'
import personalCenterAbout from './components/personalCenter/About/About'
import PasswordChange from './components/personalCenter/WalletList/PasswordChange/PasswordChange'
import WalletList from './components/personalCenter/WalletList/WalletList'
import WalletManage from './components/personalCenter/WalletList/WalletManage/WalletManage'

// 关于我们
import Privacy from './components/personalCenter/About/pages/Privacy'
import Service from './components/personalCenter/About/pages/Service'

// 帮助中心
import personalCenterHelpCenter from './components/personalCenter/HelpCenter/HelpCenter'
import WhatIsMnemonic from './components/personalCenter/HelpCenter/pages/WhatIsMnemonic'
import WhatIsKeyStore from './components/personalCenter/HelpCenter/pages/WhatIsKeyStore'
import WhatIsPrivatePublicKey from './components/personalCenter/HelpCenter/pages/WhatIsPrivatePublicKey'
import WhatIsAElfWallet from './components/personalCenter/HelpCenter/pages/WhatIsAElfWallet'
import HowToChangePassword from './components/personalCenter/HelpCenter/pages/HowToChangePassword'

import QRCode from './components/QRCode/QRCode'
import ErrorPage from './components/ErrorPage/ErrorPage'

import style from '../style/index.scss'

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
// welcomePage.style.display = 'none';
welcomePage.style.opacity = 0;
setTimeout(() => {
    welcomePage.style.display = 'none';
}, 300)

// setTimeout(function () {
//   let welcomePage = document.getElementById('welcome-page');
//   welcomePage.style.display = 'none';
// }, 1000);


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={HomePage}>
                <Route path="/assets" component={Assets}></Route>
                <Route path="/qrcode" component={QRCode}></Route>
                <Route path="/personalcenter/home" component={personalCenterHome}></Route>
                <Route path="/personalcenter/walletlist" component={WalletList}></Route>
            </Route>

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

            <Route path="/get-wallet/backup" component={getWalletBackup}/>

            <Route path="/agreement" component={getWalletAgreement}/>
            <Route path="/get-wallet/nav" component={getWalletNav}>
                <Route path="/get-wallet/guide" component={getWalletGuide}/>
                <Route path="/get-wallet/create" component={getWalletCreate}/>
                <Route path="/get-wallet/import" component={getWalletImport}/>
            </Route>



            <Route path="/error" component={ErrorPage}></Route>



        </Router>
    </Provider>,
    document.getElementById('root')
)

// fetch demo
// https://www.npmjs.com/package/whatwg-fetch#sending-cookies
// use demo
// 需要自己配置错误处理
// function checkStatus(response) {
//     if (response.status >= 200 && response.status < 300) {
//         return response
//     } else {
//         var error = new Error(response.statusText)
//         error.response = response
//         console.log('error response: ', response);
//         throw error
//     }
// }
//
// fetch('/api/transactions', {
//     credentials: 'include',
//     method: 'POST',
//     headers: {
//         // 使用post的时候，egg需要配套加上这个，从cookie中获取,
//         // csrf token方案
//         // csrf: https://github.com/pillarjs/understanding-csrf/blob/master/README_zh.md
//         // csrf: https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/index.html
//         // let csrf = document.cookie.match(/^csrfToken=[^;]*/)[0].replace('csrfToken=', '')
//         'x-csrf-token': 'mLIWWXSe1YFH0awM31IkL6X5',
//         'Content-Type': 'application/json'
//     },
//
//     body: JSON.stringify({
//         address: 'hzz233',
//         limit: 'aaa1',
//         page: '0'
//     })
// }).then(checkStatus).then(result => {
//     console.log(result);
// }).catch(error => {console.log('error:', error)});