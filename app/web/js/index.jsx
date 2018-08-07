import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mapDispatchToProps } from './actions'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import aelf from 'aelf-sdk'
import store from './store'

import About from './components/About/About'

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

import QRCode from './components/QRCode/QRCode'

import style from '../style/index.scss'

// bind to window, fetch polyfill.
import 'whatwg-fetch';

// TODO: localStorage file, asyncStorage统一成一个方法。
let walletInfoList = localStorage.getItem('walletInfoList');

if (!walletInfoList) {
  hashHistory.replace('/agreement');
} else if (hashHistory.getCurrentLocation().pathname == '/') {
  hashHistory.replace('/assets');
}

// remove welcome-page
let welcomePage = document.getElementById('welcome-page');
welcomePage.style.display = 'none';

// setTimeout(function () {
//   let welcomePage = document.getElementById('welcome-page');
//   welcomePage.style.display = 'none';
// }, 1000);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={HomePage}>
        <Route path="/about" component={About}></Route>
        <Route path="/assets" component={Assets}></Route>
        <Route path="/assethome" component={AssetHome}></Route>
        <Route path="/assettransfer" component={AssetTransfer}></Route>
        <Route path="/transactiondetail" component={AssetTransactionDetail}></Route>
        <Route path="/qrcode" component={QRCode}></Route>
        <Route path="/personalcenter/home" component={personalCenterHome}></Route>
      </Route>
      
      <Route path="/agreement" component={getWalletAgreement}/>
      <Route path="/get-wallet/backup" component={getWalletBackup}/>
      <Route path="/get-wallet/nav" component={getWalletNav}>
        <Route path="/get-wallet/guide" component={getWalletGuide}/>
        <Route path="/get-wallet/create" component={getWalletCreate}/>
        <Route path="/get-wallet/import" component={getWalletImport}/>
      </Route>
      
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