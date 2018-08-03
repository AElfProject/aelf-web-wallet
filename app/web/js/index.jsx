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

console.log("aelf: ", aelf);

import style from '../style/index.scss'

// TODO: localStorage file, asyncStorage统一成一个方法。
let walletInfoList = localStorage.getItem('walletInfoList');

if (!walletInfoList) {
  hashHistory.replace('/agreement');
}
// else {
//   hashHistory.replace('/assets');
// }

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