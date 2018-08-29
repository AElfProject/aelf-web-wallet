/*
 * huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react'
import { WhiteSpace, List, Toast } from 'antd-mobile'
import style from './Assets.scss'
import { hashHistory } from 'react-router'

import config from '../../config/config.js'

import initAelf from '../../utils/initAelf'
import hexToString from '../../utils/hexToString'
import { historyPush } from '../../utils/historyChange'

const Item = List.Item;
// const aelf = initAelf();
// React component
// TODO, 这里以后考虑使用ListView
// https://mobile.ant.design/components/list-view-cn/#components-list-view-demo-basic
class Assets extends Component {
    constructor() {
        super();
        this.state = {
        };
        this.aelf = initAelf();
    }

    getAssets() {
        //1. get Assets From address
        //2. getBalanceOf Assets
    }

    getBalance() {
        let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
        return this.aelf.contractMethods.BalanceOf(walletAddress);
    }

    getTokenName() {
        return this.aelf.contractMethods.TokenName();
    }
  
    render() {
        let contractAddress = config.mainContract;
        let dir = `/assethome?contract=${contractAddress}`

        // TODO；需要有批量获取TokenName的接口
        let balance = parseInt(this.getBalance().return, 16);
        let tokenName = hexToString(this.getTokenName().return);

        return (
            <div>
                <List>
                    <Item extra={balance}
                    onClick={() => historyPush(dir)}
                    >{tokenName}</Item>
                </List>
                {/*<List>
                    <Item extra={'233'}>Click the first list</Item>
                </List>
                <List>
                    <Item extra={'666'}>other token</Item>
                </List>
                <List>
                    <Item extra={'666'}>skr</Item>
                </List>*/}
            </div>
        );
    }
}

export default Assets