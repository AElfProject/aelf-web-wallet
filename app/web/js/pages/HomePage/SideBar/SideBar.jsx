/*
 * huangzongzhe
 * SideBar for HomePage
 * 暂时废弃使用，待调研。
 * 2018.07.26
 */
import React, { Component } from 'react'
import { List } from 'antd-mobile';

class SideBar extends Component {
	render() {
		let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
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
