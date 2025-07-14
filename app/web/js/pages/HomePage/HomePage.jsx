import React, { Component } from 'react'
import { hashHistory } from 'react-router'

import BottomTabBar from '../BottomTabBar/BottomTabBar'
import NavWithDrawer from '../NavWithDrawer/NavWithDrawer'
import { Modal } from 'antd-mobile';

// import SideBar from './SideBar/SideBar'

// scss 用了css module, 不好覆盖ant的样式。用css部分覆盖ant的样式。
import style from './HomePage.scss'
// pure css without css module.
require('./HomePage.css');

class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      modal1: true,
    };
  }

  onClose() {
    this.setState({
      modal1: false,
    });
  }

  render() {
    return (
      <div>
        <NavWithDrawer children={this.props.children}/>

        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={() => {}}
          title="Notice"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose() } }]}
        >
          <div style={{ fontSize: '14px', color: '#333', textAlign: 'left', wordBreak: 'break-word' }}>
            <div>
              The wallet has been shut down and is no longer usable. We recommend using the FairyVault mobile wallet to manage your assets.</div>
            <div style={{ marginTop: '16px' }}>
              <div>Download FairyVault:</div>
              <a href="https://fairyvault.com/">https://fairyvault.com</a>
            </div>
            <div style={{ marginTop: '8px' }}>
              <div>How to import your wallet:</div>
              <a href="https://fairyvault.gitbook.io/fairyvault-docs/wallet-creation-and-login/publish-your-docs">https://fairyvault.gitbook.io/fairyvault-docs/wallet-creation-and-login/publish-your-docs</a>
            </div>
          </div>
        </Modal>

        {/* 放到NavWithDrawer中去了，不然fixed定位有问题，抽屉面板无法完全覆盖 */}
        {/*<div className={style.bottomTabBar}>*/}
          {/*<BottomTabBar></BottomTabBar>*/}
        {/*</div>*/}

      </div>

    );
  }
}

export default HomePage;
