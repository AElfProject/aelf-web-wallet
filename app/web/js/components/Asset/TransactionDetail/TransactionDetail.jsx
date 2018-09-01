/*
 * huangzongzhe
 * 2018.07.27
 */
import React, { Component } from 'react'
import { WhiteSpace, List, InputItem, Button, Toast } from 'antd-mobile'
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

    getTxInfo() {
        let txid = getParam('txid',
            hashHistory.getCurrentLocation().search || window.location.href);

        let txInfo = {
            txState: false,
            txResult: null,
            txid: txid
        };
        try {
            if (txid) {
                let result = this.aelf.aelf.chain.getTxResult(txid);
                
                if (result.error) {
                    txInfo.txResult = result.error;
                } else {
                    txInfo.txResult = result;
                    txInfo.txState = true;
                }
            } else {
                txInfo.txResult = '没有交易id';
            }
        } catch (e) {
            txInfo.txResult = e;
        }
        return txInfo;
    }

    copyUrl () {
        let id = document.getElementById('copyUrl');
        id.select();
        document.execCommand("Copy");
        Toast.info('已复制', 1, () => {}, false);
    }
  
    render() {
        // 这个交易能拿到所有交易，非transfer交易也需要处理。
        let txInfo = this.getTxInfo();

        let { txResult, txid, txState}  = txInfo;

        if (!txState) {
            return (
                <div>
                    <h2>{JSON.stringify(txResult)}</h2>
                </div>
            );
        }

        let { tx_info, tx_status } = txResult.result;
        let method = tx_info.Method;
        let to = tx_info.params.split(',')[0];
        // console.log('result: ', tx_info, tx_status);

        let html = 
                <div>
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

        // 这里有点针对业务定制了。。。233
        let pathname = window.location.pathname;
        let NavHtml = pathname.match(/^\/transactiondetail/) ? '' : <NavNormal navTitle="转账详情"/>;

        let urlForCopy = window.location.host + '/transactiondetail?txid=' + txid;

        return (
            <div>
                {NavHtml}
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

                    <textarea id="copyUrl"
                        className={style.textarea}
                        defaultValue={urlForCopy}>
                    </textarea>
                    <Button onClick={() => this.copyUrl()}>复制Url</Button>
                </div>
            </div>
        );
    }
}

export default TransactionDetail