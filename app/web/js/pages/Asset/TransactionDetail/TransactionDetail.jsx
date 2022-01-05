/**
 * @file TransactionDetail.js
 * @author huangzongzhe
 * 2018.07.27
 */

/* eslint-disable fecs-camelcase */
import React, {Component} from 'react';
import {Toast, Tag} from 'antd-mobile';
import style from './TransactionDetail.scss';
import {hashHistory} from 'react-router';

import { BigNumber } from 'bignumber.js';
import AElf from 'aelf-sdk';

import NavNormal from '../../NavNormal/NavNormal';

import AelfButton from './../../../components/Button/Button';
import addressPrefixSuffix from './../../../utils/addressPrefixSuffix';
import deserializeTokenContract from './../../../utils/deserializeTokenContract';

import {
    getParam,
    initAelf,
    getPageContainerStyle
} from '../../../utils/utils';
// import deserializeParams from '../../../utils/deserializeParams';

import {FormattedMessage} from 'react-intl';
import WalletUtil from "../../../utils/Wallet/wallet";

// React component
export default class TransactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chainStatus: {}
        };

        const stringTemp = hashHistory.getCurrentLocation().search || window.location.href;
        this.txid = getParam('txid', stringTemp);
        this.tokenName = getParam('token', stringTemp);
        this.decimals = getParam('decimals', stringTemp);
        this.contractAddress = getParam('contract_address', stringTemp);
        this.isCrossChain = getParam('is_cross_chain', stringTemp);
        this.from = getParam('from', stringTemp);
        this.to = getParam('to', stringTemp);
        this.type = getParam('type', stringTemp);

        this.aelf = new AElf(new AElf.providers.HttpProvider(
          window.defaultConfig.WEB_API_INFO[window.defaultConfig.chainId].url)
        );

        // cross transfer txid
        if (this.from && this.to) {
            const providerUrl =  window.defaultConfig.WEB_API_INFO[this.to].url;
            this.aelf.setProvider(new AElf.providers.HttpProvider(providerUrl));
        }
    }

    componentDidMount() {
        this.getChainStatus();
    }

    getChainStatus() {
        this.aelf.chain.getChainStatus().then(result => {
            this.setState({
                chainStatus: result
            });
        });
    }

    getTxInfo() {
        let txid = this.txid;
        let tokenName = this.tokenName;

        let txInfo = {
            txState: false,
            txResult: null,
            txid,
            tokenName
        };
        try {
            if (txid) {

                let result = this.aelf.chain.getTxResult(txid, {sync: true});
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
            // Toast.fail(e.message || e.Error, 10, ()=>{}, false);
            // Toast.fail(e.message || e.Error, 10, ()=>{}, false);
            txInfo.txResult = e;
        }
        return txInfo;
    }

    // 如果有地址，则显示icon，如果只是分享，不显示icon
    renderAmount(from, to, amount, isCrossReceive = false) {
        const walletUtilInstance = new WalletUtil();

        const walletInfo = walletUtilInstance.getLastUse() || {};
        const {address} = walletInfo;

        // const isIn = address === to;
        const isOut = isCrossReceive ? address !== to : address === from;

        const amountTemp = (new BigNumber(amount)).div(Math.pow(10, this.decimals)).toFixed(+this.decimals);
        const amountStr
          = (isNaN(amountTemp) ? '-' : amountTemp) + this.tokenName;

        return <div className={style.list + ' ' + style.banner}>
            <div className={style.icon + ' ' + (isOut ? style.out : style.in)}/>
            <div>
                <div className={style.balance}>{amountStr}</div>
                {/* <div className={style.tenderValuation}>法币价值【暂无】</div> */}
                {/* <div className={style.tenderValuation}>{amount}</div> */}
            </div>
        </div>;
    }

    renderTransfer(txResult) {
        let {Transaction, crossReceiveMemo, crossReceiveTo, crossReceiveAmount} = txResult;
        let params = Transaction.Params || [];
        const {MethodName} = Transaction;

        const paramsDeserialized = JSON.parse(params);
        const {
            amount,
            to,
            toChainId,
            fromChainId,
            memo
        } = paramsDeserialized;

        const amountShow = crossReceiveAmount || amount;
        const memoShow = crossReceiveMemo || memo;
        const toShow = crossReceiveTo || to;

        // console.log('Transaction.Meth', Transaction, params, deserializeTokenContract);

        let addressFromShow = Transaction.From;
        let addressToShow = toShow;
        let isCrossReceive = false;
        // cross chain
        if (this.from && this.to) {
            addressFromShow = addressPrefixSuffix(addressFromShow, null, this.from);
            addressToShow = addressPrefixSuffix(addressToShow, null, this.to);
        }
        else if (MethodName === 'CrossChainTransfer') {
            addressFromShow = addressPrefixSuffix(addressFromShow);
            addressToShow = addressPrefixSuffix(addressToShow, toChainId);
        }
        else if (MethodName === 'CrossChainReceiveToken') {
            const fromAddress = Transaction.From;
            addressFromShow = addressPrefixSuffix(fromAddress, fromChainId);
            addressToShow = addressPrefixSuffix(crossReceiveTo);
            isCrossReceive = true;
        }
        else {
            addressFromShow = addressPrefixSuffix(addressFromShow);
            addressToShow = addressPrefixSuffix(addressToShow);
        }

        const amounHtml = this.renderAmount(Transaction.From, toShow, amountShow, isCrossReceive);

        return <div>
            {amounHtml}

            <div className={style.list}>
                <div className={style.title}>From</div>
                <div className={style.text}>{addressFromShow}</div>
            </div>
            <div className={style.list}>
                <div className={style.title}>To</div>
                <div className={style.text}>{addressToShow}</div>
            </div>
            {memoShow && <div className={style.list}>
                <div className={style.title}>Memo</div>
                <div className={style.text}>{memoShow}</div>
            </div>}
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
                            if (hideLeft) {
                                window.location.href = window.location.protocol + '//' + window.location.host;
                            }
                            else {
                                hashHistory.push('/assets');
                            }
                        }}
                    ><FormattedMessage id = 'aelf.Home' /></div>
                }
            />
        );

        return NavHtml;
    }

    renderBlockHeightHTML(blockNumber, status) {
        if (!['FAILED', 'MINED'].includes(status)) {
            return 'Unconfirmed';
        }

        const {chainStatus} = this.state;
        const {LastIrreversibleBlockHeight} = chainStatus;

        let blockHeightHTML = blockNumber;
        if (LastIrreversibleBlockHeight) {
            const confirmedBlocks = LastIrreversibleBlockHeight - blockNumber;
            const isIB = confirmedBlocks >= 0;
            blockHeightHTML = (
              <div>
                  {blockNumber} {isIB
                ? <span className={style.blockHeightConfirmed}>({confirmedBlocks} Block Confirmations)</span>
                : (<Tag small>Unconfirmed</Tag>)}
              </div>);
        }
        return blockHeightHTML;
    }

    renderFeeHTML(Logs) {
        if (!Logs) {
            return null;
        }

        const feeFormatted = AElf.pbUtils.getTransactionFee(Logs);
        if (!feeFormatted.length) {
            return null;
        }

        const {symbol, amount} = feeFormatted[0];

        if (!amount || !symbol) {
            return null;
        }

        const feeTemp = (new BigNumber(amount)).div(Math.pow(10, this.decimals)).toFixed(+this.decimals);
        const feeStr
          = (isNaN(feeTemp) ? '-' : feeTemp) + symbol;

        return <div className={style.list}>
            <div className={style.title}>Fee</div>
            <div className={style.text}>{feeStr}</div>
        </div>;
    }

    renderTurnToCrossPendingHTML() {
        return (<div className={style.crossPendingBottom}>
            <AelfButton
              onClick={() => {
                  hashHistory.push('/personalcenter/unconfirmedtransactions');
              }}
              text = 'Cross chain transactions to be confirmed'
            />
        </div>);
    }

    renderTurnToExplorerHTML(txId) {
        let explorerURL = window.defaultConfig.explorerURL + '/tx/' + txId;
        if (this.to) {
            explorerURL = window.defaultConfig.WEB_API_INFO[this.to].explorer + '/tx/' + txId;
        }

        return (<div className={style.bottom}>
            <AelfButton
              onClick={() => {
                  window.location = explorerURL;
              }}
              text = 'To Explorer'
            />
        </div>);
    }

    render() {
        let NavHtml = this.renderNavHtml();
        // 这个交易能拿到所有交易，非transfer交易也需要处理。
        let txInfo = this.getTxInfo();
        let {txResult, txid} = txInfo;
        let {
            Transaction,
            Status,
            BlockNumber,
            Logs
        } = txResult;

        let html = '';
        let notTransferHtml = '';
        let method = Transaction && Transaction.MethodName || '';
        if (['pending', 'failed', 'mined'].includes(Status.toLowerCase())) {

            if (method === 'CrossChainReceiveToken') {
                try {
                    const crossReceive
                      = deserializeTokenContract(JSON.parse(Transaction.Params).transferTransactionBytes);
                    txResult.crossReceiveAmount = crossReceive.amount;
                    txResult.crossReceiveTo = crossReceive.to;
                    txResult.crossReceiveMemo = crossReceive.memo;
                }
                catch (e) {}
            }

            html = this.renderTransfer(txResult);
            if (method !== 'Transfer' && !method.includes('CrossChain')) {
                html = '';
                notTransferHtml = this.renderNotTransfer(txResult);
            }
        } else {
            html = <div className={style.list}>
                <div className={style.title}>Message</div>
                <div className={style.text}>{txResult.Error || '-'}</div>
            </div>;
        }

        const feeHTML = this.renderFeeHTML(Logs);
        const blockHeightHTML = this.renderBlockHeightHTML(BlockNumber, Status);
        const turnToExplorerHTML = this.renderTurnToExplorerHTML(txid);

        const turnToCrossPendingList = this.isCrossChain ? this.renderTurnToCrossPendingHTML() : null;

        const containerStyle = getPageContainerStyle();
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
                                <div className={style.text}>{blockHeightHTML}</div>
                            </div>
                            {feeHTML}
                            {notTransferHtml}
                        </div>
                    </div>
                    {turnToCrossPendingList}
                    {turnToExplorerHTML}
                </div>
            </div>
        );
    }
}
