/**
 * @file TransactionDetail.js
 * @author huangzongzhe
 * 2018.07.27
 */

/* eslint-disable fecs-camelcase */
import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import style from './TransactionDetail.scss';
import {hashHistory} from 'react-router';

import NavNormal from '../../NavNormal/NavNormal';

import AelfButton from './../../../components/Button/Button';

import {
    getParam,
    initAelf,
    clipboard,
    getPageContainerStyle
} from '../../../utils/utils';

import {FormattedMessage} from 'react-intl';

// React component
export default class TransactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        const stringTemp = hashHistory.getCurrentLocation().search || window.location.href;
        this.txid = getParam('txid', stringTemp);
        this.tokenName = getParam('token', stringTemp);
        this.contractAddress = getParam('contract_address', stringTemp);

        this.aelf = initAelf({
            chainOnly: true,
            tokenName: this.tokenName,
            contractAddress: this.contractAddress
        });

        clipboard('#clipboard-transactionDetail');
    }

    getTxInfo() {
        let txid = this.txid;
        let tokenName = this.tokenName;
        let contractAddress = this.contractAddress;

        let txInfo = {
            txState: false,
            txResult: null,
            txid,
            tokenName,
            contractAddress
        };
        try {
            if (txid && contractAddress) {
                let result = this.aelf.aelf.chain.getTxResult(txid);
                if (result.error) {
                    txInfo.txResult = result.error;
                }
                else {
                    txInfo.txResult = result;
                    txInfo.txState = true;
                }
            }
            else {
                const URL = window.location.href;
                txInfo.txResult = 'No (txid=xxx) or No (contract_address=xxx), Please check your URL： ' + URL;
            }
        }
        catch (e) {
            Toast.fail(e.message, 10);
            txInfo.txResult = e;
        }
        return txInfo;
    }

    // 如果有地址，则显示icon，如果只是分享，不显示icon
    renderAmount(from, to, amount) {
        let walletInfo = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletList = [];
        for (let each in walletInfo) {
            walletList.push(each);
        }
        let isIn = walletList.indexOf(to) >= 0;
        let isOut = walletList.indexOf(from) >= 0;
        if (isIn && isOut || (!isIn && !isOut)) {
            return <div className={style.list}>
                <div className={style.title}>amount</div>
                <div className={style.text}>{amount}</div>
            </div>;
        }
        return <div className={style.list + ' ' + style.banner}>
            <div className={style.icon + ' ' + (isIn ? style.in : style.out)}></div>
            <div>
                <div className={style.balance}>{amount}</div>
                {/*<div className={style.tenderValuation}>法币价值【暂无】</div>*/}
            </div>
        </div>;
    }

    // TODO: 解析proto数据
    renderTransfer(txResult) {
        let {Transaction} = txResult;
        let params = Transaction.Params || [];
        let to = Transaction.To;
        let amount = params.amount;

        let amounHtml = this.renderAmount(Transaction.From, to, amount);

        return <div>
            {amounHtml}

            <div className={style.list}>
                <div className={style.title}>From</div>
                <div className={style.text}>{Transaction.From}</div>
            </div>
            <div className={style.list}>
                <div className={style.title}>To</div>
                <div className={style.text}>{to}</div>
            </div>
        </div>;
    }

    renderNotTransfer(txResult) {
        let {Transaction} = txResult;
        let method = Transaction.MethodName;

        return <div>
            <div className={style.list}>
                <div className={style.title}>Transaction Type</div>
                <div className={style.text}>{method}</div>
            </div>
            <div className={style.list}>
                <div className={style.title}>Not assets transfer. Raw data FYI</div>
                <div className={style.text}>{JSON.stringify(txResult)}</div>
            </div>
        </div>;
    }

    renderNavHtml() {
        let hideLeft = window.location.pathname.match(/^\/transactiondetail/) ? true : false;
        let NavHtml = (
            <NavNormal
                navTitle={<FormattedMessage id = 'aelf.Transaction Details' />}
                hideLeft={hideLeft}
                rightContent={
                    <div
                        onClick={() => {
                            window.location.href = window.location.protocol + '//' + window.location.host;
                        }}
                    ><FormattedMessage id = 'aelf.Home' /></div>
                }
            />
        );

        return NavHtml;
    }

    render() {
        let NavHtml = this.renderNavHtml();
        // 这个交易能拿到所有交易，非transfer交易也需要处理。
        let txInfo = this.getTxInfo();
        let {txResult, txid, txState, tokenName, contractAddress} = txInfo;

        if (!txState) {
            if (typeof txResult !== 'string') {
                txResult = JSON.stringify(txResult);
            }
            return (
                <div>
                    {NavHtml}
                    <h2 className={style.stateError}>{txResult}</h2>
                </div>
            );
        }

        let {
            Transaction,
            Status,
            BlockNumber
        } = txResult;

        let html = this.renderTransfer(txResult);

        let notTransferHtml = '';
        let method = Transaction.MethodName;
        if (method !== 'Transfer') {
            html = '';
            notTransferHtml = this.renderNotTransfer(txResult);
        }

        let urlForCopy = window.location.host
            + '/transactiondetail?txid=' + txid
            + '&contract_address=' + contractAddress
            + '&token=' + tokenName;

        let containerStyle = getPageContainerStyle();

        let txInfoContainerStyle = Object.assign({}, containerStyle);
        txInfoContainerStyle.height -= 150;

        return (
            <div>
                {NavHtml}
                <div className={style.container} style={containerStyle}>
                    <div style={txInfoContainerStyle}>
                        <div style={{wordWrap: 'break-word', lineHeight: 1.5}}>
                            {html}
                            <div className={style.list}>
                                <div className={style.title}>Status</div>
                                <div className={style.text}>{Status}</div>
                            </div>
                            <div className={style.list}>
                                <div className={style.title}>Transaction ID</div>
                                <div className={style.text}>{txid}</div>
                            </div>
                            <div className={style.list}>
                                <div className={style.title}>Block Height</div>
                                <div className={style.text}>{BlockNumber}</div>
                            </div>
                            {notTransferHtml}
                        </div>

                    </div>
                    <div className={style.bottom}>
                         <textarea id="copyUrl"
                                   className={style.textarea}
                                   defaultValue={urlForCopy}>
                         </textarea>
                        <button
                            id="clipboard-transactionDetail"
                            data-clipboard-target="#copyUrl"
                            style={{display: 'none'}}>
                            copy
                        </button>

                        <AelfButton
                            onClick={() => {
                                let btn = document.getElementById('clipboard-transactionDetail');
                                btn.click();
                            }}
                            text = 'Copy URL'
                        ></AelfButton>
                    </div>
                </div>
            </div>
        );
    }
}
