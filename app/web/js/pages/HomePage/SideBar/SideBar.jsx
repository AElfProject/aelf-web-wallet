/*
 * huangzongzhe
 * SideBar for HomePage
 * 暂时废弃使用，待调研。
 * 2018.07.26
 */
import React, { Component } from 'react'
import { List } from 'antd-mobile';
import WalletUtil from "../../../utils/Wallet/wallet";

class SideBar extends Component {
	render() {
    const walletUtilInstance = new WalletUtil();
    let walletInfoList = walletUtilInstance.getWalletInfoListSync();

    let listItems = [];
    for (let address in walletInfoList) {
      listItems.push(
        (
          <List.Item key={address}
              multipleLine
              onClick={(e) => this.siderbarClick(address, e)}
            >{address}</List.Item>
        )
      );
    }
    return (
      <List>
        {listItems}
      </List>
    );
	}
}

export default SideBar
