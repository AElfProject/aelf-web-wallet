import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import TestContent from './components/TestContent'
import BoilingVerdict from './components/BoilingVerdict'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
// import { Route, Router, HashHistory, Link, BrowserRouter, Switch} from 'react-router-dom'

import aelf from 'aelf-sdk'
import store from './store'

import About from './components/About/About'

import getWalletGuide from './components/getWallet/Guide/Guide'
import getWalletAgreement from './components/getWallet/Agreement/Agreement'
import getWalletCreate from './components/getWallet/Create/Create'
import getWalletBackup from './components/getWallet/Backup/Backup'
import getWalletImport from './components/getWallet/Import/Import'

import HomePage from './components/HomePage/HomePage'

console.log("aelf: ", aelf);

import style from '../style/index.scss'

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        {this.props.children}
        <span className={style.redSpan}>{value}</span>
        <button onClick={hashHistory.goBack}>historyBack</button>
        <button onClick={onIncreaseClick}>Increase</button>

        <BoilingVerdict
          celsius={parseFloat(value)} />

      </div>
    )
  }
}

// Action
const increaseAction = { type: 'increase' }


// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

const App02 = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

// remove welcome-page
let welcomePage = document.getElementById('welcome-page');
welcomePage.style.display = 'none';
// setTimeout(function () {
//   let welcomePage = document.getElementById('welcome-page');
//   welcomePage.style.display = 'none';
// }, 1000);

// <Route path="/" component={App}>
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={HomePage}>
        <Route path="/about" component={About}></Route>
        <Route path="/app" component={App02}></Route>
      </Route>
      <Route path="/get-wallet/guide" component={getWalletGuide}/>
      <Route path="/get-wallet/agreement" component={getWalletAgreement}/>
      <Route path="/get-wallet/create" component={getWalletCreate}/>
      <Route path="/get-wallet/backup" component={getWalletBackup}/>
      <Route path="/get-wallet/import" component={getWalletImport}/>
      
    </Router>
  </Provider>,
  document.getElementById('root')
)