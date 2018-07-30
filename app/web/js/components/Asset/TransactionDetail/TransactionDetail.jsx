/*
 * huangzongzhe
 * 2018.07.27
 */
import React, { Component } from 'react'
import { WhiteSpace, List, InputItem, Button } from 'antd-mobile'
import style from './TransactionDetail.scss'
import { hashHistory } from 'react-router'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import getParam from '../../../utils/getParam' // 还有类似方法的话，合并一下。

import aelfSDK from 'aelf-sdk'
// React component
// TODO
// 1.function addressCheck() {}
// 2.insufficient funds
class TransactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getTxResult() {
        // 封装好aelf初始化组件，每个要使用的页面都自己重新连接, provider是网络选择。
        let aelf = new aelfSDK(new aelfSDK.providers.HttpProvider("http://localhost:7001/aelf/api"));
        aelf.chain.connectChain();

        let txid = getParam('txid', hashHistory.getCurrentLocation().search);
        if (txid) {
            let txResult = aelf.chain.getTxResult(txid);
            return txResult;
        }
        return 'nothing'
    }
  
    render() {
        let result = JSON.stringify(this.getTxResult());
        return (
            <div style={{ wordWrap: 'break-word' }}>
                <h3>Transaction Result</h3>
                <p>{result}</p>
            </div>
        );
    }
}

export default TransactionDetail