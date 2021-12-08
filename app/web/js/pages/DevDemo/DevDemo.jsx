/**
* @file
* @author hzz780
*/

import React, {Component} from 'react';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import style from './DevDemo.scss';
import {NightElfCheck} from '../../utils/NightElf/NightElf';
import {getParam} from "../../utils/utils";
import WalletUtil from "../../utils/Wallet/wallet";

const {CURRENT_CHAIN_ID} = window.defaultConfig.ADDRESS_INFO;
const LOGIN_INFO = {
  chainId: CURRENT_CHAIN_ID,
  payload: {
    method: 'LOGIN'
  }
};
const TOKEN_ADDRESS = window.defaultConfig.WEB_API_INFO[window.defaultConfig.chainId].mainTokenContract;

// 使用demo
export default class DevDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadPlugins: false,
      addressInUse: null,
      walletInstance: new WalletUtil()
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.resetAccount = this.resetAccount.bind(this);
    this.transfer = this.transfer.bind(this);
    this.getSignedAddress = this.getSignedAddress.bind(this);
    this.getWalletInfo = this.getWalletInfo.bind(this);
  }

  componentDidMount() {
    NightElfCheck.getInstance().check.then(checkResult => {
      console.log('checkResult: ', checkResult);
    }).catch(error => {
      this.setState({
        showDownloadPlugins: true
      });
    });
  }

  async login() {
    const checkResult = await NightElfCheck.getInstance().check;
    console.log('checkResult: ', checkResult);
    const aelf = NightElfCheck.initAelfInstanceByExtension();
    // const accountInfo = await aelf.login();
    const accountInfo = await aelf.login(LOGIN_INFO);
    console.log('accountInfo: ', accountInfo);
    if (accountInfo.error) {
      Toast.info(result.errorMessage.message || result.errorMessage, 1);
      return;
    }
    const detail = JSON.parse(accountInfo.detail);
    console.log('detail: ', detail);
    this.setState({
      addressInUse: detail.address
    });
  }

  async logout() {
    const {addressInUse} = this.state;
    const aelf = NightElfCheck.initAelfInstanceByExtension();
    const logoutResult = await aelf.logout({
      chainId: CURRENT_CHAIN_ID,
      address: addressInUse
    });
    if (logoutResult) {
      Toast.info(logoutResult.errorMessage.message || logoutResult.errorMessage || logoutResult.message);
    }
    console.log('logout: ', logoutResult, CURRENT_CHAIN_ID, addressInUse);
  }

  async resetAccount() {
    await this.logout();
    await this.login();
  }

  async getSignedAddress() {
    const {addressInUse} = this.state;
    const aelf = NightElfCheck.initAelfInstanceByExtension();
    const signature = await aelf.getSignature({
      appName: 'Web Wallet',
      address: addressInUse,
      hexToBeSign: addressInUse
    });
    console.log('signature: ', signature);
  }

  async transfer() {
    const { addressInUse } = this.state;
    console.log('addressInUse: ', addressInUse);
    // const lotteryContract = await NightElfCheck.initContractInstance({
    const tokenContract = await NightElfCheck.initContractInstance({
      loginInfo: LOGIN_INFO,
      contractAddress: TOKEN_ADDRESS,
    });
    const balance = await tokenContract.GetBalance.call({
      symbol: 'ELF',
      // owner: addressInUse
      owner: 'gfo7u3XLrSbQt6rpjkcGHDUH7YP6udkTVfbTGY4uQCuiUGtg2'
    });

    console.log('balance: ', balance);

    const transactionId = await tokenContract.Transfer({
      symbol: 'ELF',
      to: 'ELF_2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX_AELF',
      amount: 1,
      memo: 'have fun'
    });
    console.log('transactionId: ', transactionId);
  }

  async getWalletInfo(type = 'local') {
    const { walletInstance } = this.state;
    const wallet = await walletInstance.getWalletInfoList(type);
    console.log('wallet: ', wallet);
  }

  render() {
    const {
      showDownloadPlugins
    } = this.state;

    return (
      <div className={style.contaienr}>
        {showDownloadPlugins && <div>SBZZ，找不到插件，请安装插件</div>}
        test demo
        <div>
          <div>
            <button onClick={this.login}>登录</button>
            <button onClick={this.logout}>登出</button>
            <button onClick={this.resetAccount}>重新设置账号</button>
          </div>

          <div>
            <button onClick={this.transfer}>转账</button>
          </div>

          <div>
            <button onClick={this.getSignedAddress}>获取地址签名</button>
          </div>
        </div>
        <div>
          <div>综合使用</div>
          <button onClick={() => this.getWalletInfo()}>getWalletInfoList Local</button>
          <button onClick={() => this.getWalletInfo('extension')}>getWalletInfoList Extension</button>
        </div>
        <div>1</div>
      </div>
    );
  }
}
