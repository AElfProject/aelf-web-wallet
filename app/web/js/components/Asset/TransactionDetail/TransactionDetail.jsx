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

import initAelf from '../../../utils/initAelf'
// const aelf = initAelf({
//     chainOnly: true
// });

// React component
class TransactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.aelf = initAelf({
            chainOnly: true
        });
    }

    getTxResult() {
        let txid = getParam('txid', hashHistory.getCurrentLocation().search);
        if (txid) {
            let txResult = this.aelf.aelf.chain.getTxResult(txid);
            return txResult;
        }
        return 'please check url, no txid!!!';
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