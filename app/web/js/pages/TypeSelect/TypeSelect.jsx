import React, { Component } from 'react'
import style from './TypeSelect.scss'
import { hashHistory } from 'react-router'
import WalletUtil from '../../utils/Wallet/wallet';
import Svg from '../../components/Svg/Svg'

import getPageContainerStyle from '../../utils/getPageContainerStyle'

const walletUtil = new WalletUtil();
// React component
export default class TypeSelect extends Component {
  render() {

    let containerStyle = getPageContainerStyle();

    return (
      <div className='aelf-bg-light-2'>
        <div className={style.container} style={containerStyle}>
          <div className={style.top}>
            <div className={style.blank}/>
            <Svg icon={'logo'} style={{height: 32, width: 104}}/>
            <p className={style.wallet}>Connect</p>
            <p className={style.description}>
              Please select a method to access your wallet.
              Current chain id: {window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID}
            </p>
          </div>

          <div className={style.bottom}>
            <div className={style.typeCard} onClick={async () => {
              const wallet = await walletUtil.getWalletInfoListFromExtension();
              if (wallet) {
                walletUtil.setWalletType('extension');
                hashHistory.push('/assets');
              }
            }}>
              <div className={style.typeContainer}>
                <div className={style.typeLeft}>
                  <div className={style.typeTitle}>Browser Extension</div>
                  <div className={style.typeText}>Use your NightElf with with web wallet</div>
                </div>

                <div className={style.typeLogo}>
                  <Svg icon={'wallet_type_extension'} style={{height: 48, width: 48}}/>
                </div>
              </div>
            </div>
            <div className={style.typeCard} onClick={() => {
              const walletInfoList = walletUtil.getWalletInfoListSync('local');
              walletUtil.setWalletType('local');
              if (!walletInfoList) {
                hashHistory.replace('/get-wallet/guide');
              } else {
                hashHistory.push('/assets');
              }
            }}>
              <div className={style.typeContainer}>
                <div className={style.typeLeft}>
                  <div className={style.typeTitle}>Local Storage</div>
                  <div className={style.typeText}>Storage encrypted keypair in browser localstorage</div>
                </div>
                <div className={style.typeLogo}>
                  <Svg icon={'wallet_type_local'} style={{height: 48, width: 48}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
