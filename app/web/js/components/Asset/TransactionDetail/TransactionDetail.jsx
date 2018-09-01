/*
 * huangzongzhe
 * 2018.07.27
 */
import React, { Component } from 'react'
import { WhiteSpace, List, InputItem, Button } from 'antd-mobile'
import style from './TransactionDetail.scss'
import { hashHistory } from 'react-router'

import NavNormal from '../../NavNormal/NavNormal'

import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import getParam from '../../../utils/getParam' // 还有类似方法的话，合并一下。

import initAelf from '../../../utils/initAelf'

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
        return '没有交易id!!!';
    }
  
    render() {
        // 这个交易能拿到所有交易，非transfer交易也需要处理。
        let txResult = this.getTxResult();
        let { tx_info, tx_status } = txResult.result;
        let method = tx_info.Method;
        let to = tx_info.params.split(',')[0];
        // console.log('result: ', tx_info, tx_status);

        let html = 
                <div>
                    {/*<div className={style.list}>
                        <div className={style.title}>状态</div>
                        <div className={style.text}>{tx_status}</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.title}>交易Id</div>
                        <div className={style.text}>{tx_info.TxId}</div>
                    </div>*/}
                    <div className={style.list}>
                        <div className={style.title}>发款方</div>
                        <div className={style.text}>{tx_info.From}</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.title}>收款方</div>
                        <div className={style.text}>{to}</div>
                    </div>
                </div>;
        if (method != 'Transfer') {
            html = 
                <div>
                    <div className={style.list}>
                        <div className={style.title}>交易类型</div>
                        <div className={style.text}>{method}</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.title}>非转账交易，暂无法解析，以下为交易原始数据</div>
                        <div className={style.text}>{JSON.stringify(txResult)}</div>
                    </div>
                    
                </div>;
        }
        return (
            <div>
                <NavNormal navTitle="转账详情"/>
                <div style={{ wordWrap: 'break-word', lineHeight: 1.5 }}>
                    <div className={style.list}>
                        <div className={style.title}>状态</div>
                        <div className={style.text}>{tx_status}</div>
                    </div>
                    <div className={style.list}>
                        <div className={style.title}>交易Id</div>
                        <div className={style.text}>{tx_info.TxId}</div>
                    </div>
                    {html}
                </div>
            </div>
        );
    }
}

export default TransactionDetail