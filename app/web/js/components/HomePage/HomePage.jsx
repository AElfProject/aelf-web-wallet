import React, { Component } from 'react'
import { Drawer, List, NavBar, Icon, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router'

import BottomTabBar from '../BottomTabBar/BottomTabBar'
// import SideBar from './SideBar/SideBar'

// scss 用了css module, 不好覆盖ant的样式。用css部分覆盖ant的样式。
import style from './HomePage.scss'
// pure css without css module.
require('./HomePage.css');

// TODO, 用store来处理交互？ 感觉这样各个组件之间的关系会越来越复杂。
// 回头认真想想这个
// import { connect } from 'react-redux'
// // Action
// const increaseAction = { type: 'increase' }

// // Map Redux state to component props
// function mapStateToProps(state) {
//   return {
//     value: state.count
//   }
// }

// // Map Redux actions to component props
// function mapDispatchToProps(dispatch) {
//   return {
//     onIncreaseClick: () => dispatch(increaseAction)
//   }
// }

// // Connected Component
// const BottomTabBarConnected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(BottomTabBar)



class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      walletInUseName: ''
    };
  }

  onOpenChange(args) {
    console.log(args);
    this.setState({ open: !this.state.open });
  }

  siderbarClick(walletInfo) {
    let lastuse = {
        address: walletInfo.address,
        walletName: walletInfo.walletName
    };
    localStorage.setItem('lastuse', JSON.stringify(lastuse));
    this.setState({
      lastuse: lastuse,
      open: !this.state.open
    });

    // 艹，这代码好恶心。
    let targetPath = `/assets?address=${walletInfo.address}`;
    let notSameWallet = !hashHistory.getCurrentLocation().pathname.match(targetPath);
    if (notSameWallet) {
      console.log('notSameWallet: ', notSameWallet);
      hashHistory.push(targetPath);
    }
    console.log(walletInfo);
  }

  // 回头研究一下...放到SideBar.jsx里面去
  getSideBar() {
    // (e) => this.siderbarClick(index, e) react的事件机制
    // https://doc.react-china.org/docs/handling-events.html
    // TODO, 从storage获取数据并拼接。
    let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
    let listItems = [];
    for (let address in walletInfoList) {
      listItems.push(
        (
          <List.Item key={address}
              multipleLine
              onClick={(e) => this.siderbarClick(walletInfoList[address], e)}
            >{walletInfoList[address].walletName}</List.Item>
        )
      );
    }
    listItems.push(
      (
        <List.Item key='getWallet'
            multipleLine
            className='get-wallet'
            onClick={() => hashHistory.push('/get-wallet/guide')}
          > + </List.Item>
      )
    );
    return (
      <List>
        {listItems}
      </List>
    );
  }

  render() {
    // fix in codepen
    const sidebar = this.getSideBar();

    const lastuse = localStorage.getItem('lastuse');
    const walletInUseName = lastuse ? JSON.parse(localStorage.getItem('lastuse')).walletName : '请选择钱包';

    return (
      <div>
        <NavBar icon={<Icon type="left" />} onLeftClick={() => hashHistory.goBack()}
          rightContent={[
            <Icon key="1" type="ellipsis" onClick={() => this.onOpenChange()} />,
          ]}
        >{walletInUseName}</NavBar>
        <Drawer
          position="right"
          className='my-drawer'
          style={{ height: document.documentElement.clientHeight - 45 - 22 }}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' , padding: '11px 0px 50px 0px', overflowX: 'hidden'}}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={() => this.onOpenChange()}
        >
          {this.props.children}
          
        </Drawer>

        <div className={style.bottomTabBar}>
          <BottomTabBar>111</BottomTabBar>
        </div>
        
        
      </div>
      
    );
  }
}

export default HomePage;