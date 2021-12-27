/**
 * @file Transfer.jsx
 * @author huangzongzhe
 *
 * 2018.07.27
 */
// TODO: 重点关注Int64的处理！！！！！！！！
import React, {Component} from 'react';
import {List, InputItem, Toast} from 'antd-mobile';
import cmp from 'semver-compare';
import style from './Transfer.scss';
import {hashHistory} from 'react-router';
import { BigNumber } from 'bignumber.js';

import AelfButton from './../../../components/Button/Button';

import NavNormal from '../../NavNormal/NavNormal';
import BackupNotice from '../../BackupNotice/BackupNotice';
import {
    addressCheck,
    moneyKeyboardWrapProps,
    initAelf,
    getPageContainerStyle,
    getParam,
    getBalanceAndTokenName
} from '../../../utils/utils';

import {getWallet} from '../../../utils/initAelf';
import {CrossChainMethods, getCrossInfo} from '../../../utils/crossChain';

import {FormattedMessage} from 'react-intl';
import WalletUtil from "../../../utils/Wallet/wallet";
import {getViewResult, NightElfCheck} from "../../../utils/NightElf/NightElf";
import {CrossChainMethodsExtension} from "../../../utils/crossChainForExtension";
import {LOADING_TIME_LONG} from "../../../constant/config";

export default class Transfer extends Component {
    constructor(props) {
        super(props);
        const walletUtilInstance = new WalletUtil();
        this.state = {
            decimals: 0,
            balance: new BigNumber(0),
            memo: '',
            amountError: null,
            memoError: null,
            addressError: null,
            isCrossChain: false,
            walletType: walletUtilInstance.getWalletType()
        };

        this.refreshBalance = this.refreshBalance.bind(this);
        this.inputAmount = this.inputAmount.bind(this);
        this.contractAddress = getParam('contract_address', window.location.href);
        this.tokenName = getParam('token', window.location.href);
    }

    inputAmount(amount, callback = () => {}) {
        let amountBig = new BigNumber(amount);

        if (amountBig.isNaN() || !amountBig.isFinite() || !amountBig.gt(0)) {
            this.setState({
                amount,
                amountError: 'Invalid Number'
            }, callback);
            return;
        }

        if (amountBig.gt(this.state.balance)) {
            this.setState({
                amount,
                amountError: 'insufficient'
            }, callback);
            return;
        }

        this.setState({
            amount,
            amountError: null
        }, callback);
    }

    inputMemo(memo, callback = () => {}) {
        if (memo.replace(/[^\u0000-\u00ff]/g, 'aa').length > 64) {
            const memoError = 'Too long memo';
            this.setState({
                memo,
                memoError
            }, callback);
            return;
        }

        this.setState({
            memo,
            memoError: null
        }, callback);
    }

    inputAddress(address, callback = () => {}) {
        // checkAddress
        let addressCheckResult = addressCheck(address);
        if (!addressCheckResult.ready) {
            this.setState({
                address,
                addressError: addressCheckResult.message
            }, callback);
            return;
        }
        this.setState({
            address: address,
            isCrossChain: addressCheckResult.isCrossChain || false,
            addressError: null
        }, callback);
    }

    inputPassword(password) {
        this.setState({
            password: password,
            passwordError: false
        });
    }

    componentDidMount() {
        this.refreshBalance();
    }

    componentWillUnmount() {
        this.setState = () => {};
    }

    refreshBalance(callback = () => {}) {
        const walletUtilInstance = new WalletUtil();
        let address = walletUtilInstance.getLastUse().address;

        getBalanceAndTokenName(address, this.contractAddress, this.tokenName, output => {
            const tokenInfo = output[0] || {};

            const {
                balance,
                decimals,
                token_name
            } = tokenInfo;
            // const balanceObj = tokenInfo.balance;
            let balanceBig = (new BigNumber(balance)).div(Math.pow(10, decimals));

            this.setState({
                decimals,
                balance: balanceBig,
                tokenName: this.tokenName || token_name,
                contract_address: this.contractAddress
            }, callback);
        });
    }

    async crossTransferExtension(options) {
        const {address, tokenName, amountBig, amount, memo, contractAddress, decimals} = options;

        const CROSS_INFO = getCrossInfo({
            symbol: tokenName,
            to: address
        }, window.defaultConfig.chainId);

        // console.log('crossTransferExtension CROSS_INFO', CROSS_INFO);

        const walletUtilInstance = new WalletUtil();
        const walletAddress = walletUtilInstance.getLastUse().address;
        const wallet = {
            address: walletAddress
        };
        const crossInstance = new window.NightElf.CrossChain({
            wallet,
            CROSS_INFO
        });

        try {
            const crossParams = {
                to: address,
                symbol: tokenName,
                amount: amountBig.multipliedBy(Math.pow(10, decimals)).toNumber(),
                memo
            };

            Toast.loading('Cross chain transfer', LOADING_TIME_LONG);
            const result = await crossInstance.send(crossParams);
            if (result.error) {
                Toast.hide();
                Toast.fail(result.error, 3, () => { }, false);
                return;
            }
            const crossTxId = JSON.parse(result.detail).crossTransferTxId;

            // 绑定跨链关系
            const crossInstanceLocal = new CrossChainMethods({});
            await crossInstanceLocal.bindSent({
                txId: crossTxId,
                transferParams: {
                    transfer: crossParams
                },
                sendInfo: {
                    sendNode: CROSS_INFO.from.url,
                    receiveNode: CROSS_INFO.to.url,
                    mainChainId: CROSS_INFO.mainChainId,
                    issueChainId: CROSS_INFO.issueChainId
                },
                amountShow: amount
            });

            Toast.hide();

            hashHistory.push(`/transactiondetail?txid=${crossTxId}&is_cross_chain=1`
              + `&token=${tokenName}&contract_address=${contractAddress}&decimals=${decimals}`);
        } catch(e) {
            Toast.fail(e.message || 'Something Error', 3, () => { }, false);
        }
    }

    async crossTransfer(options) {
        const walletUtilInstance = new WalletUtil();
        const walletType = walletUtilInstance.getWalletType();
        if (walletType !== 'local') {
            const aelf = new window.NightElf.AElf({});
            const version = aelf.getVersion();
            if (!aelf || !version) {
                Toast.fail('Can not find NightElf. Please download and install NightElf browser extension. ', 3, () => { }, false);
                return;
            }
            if (cmp(version.replace('v', ''), '1.2.2') === -1) {
                Toast.fail('Please update NightElf to v1.2.2 or laster.', 3, () => { }, false);
                return;
            }

            await this.crossTransferExtension(options);
            return;
        }
        await this.crossTransferLocal(options);
    }

    async crossTransferLocal(options) {
        const {password, address, tokenName, amountBig, amount, memo, contractAddress, decimals} = options;
        let wallet;
        try {
            wallet = getWallet(password);
        } catch(e) {
            this.setState({passwordError: e.message});
            Toast.hide();
            Toast.fail(e.message, 3, () => {}, false);
            return;
        }

        try {
            const crossInstance = new CrossChainMethods({
                wallet,
                WEB_API_INFO: window.defaultConfig.WEB_API_INFO,
                TOKEN_CROSS_SUPPORT: window.defaultConfig.TOKEN_CROSS_SUPPORT
            });

            const crossParams = {
                transfer: {
                    to: address,
                    symbol: tokenName,
                    amount: amountBig.multipliedBy(Math.pow(10, decimals)).toNumber(),
                    memo
                },
                amountShow: amount,
                fromChain: window.defaultConfig.chainId
            };
            Toast.loading('Cross chain transfer', LOADING_TIME_LONG);
            const result =await crossInstance.send(crossParams);
            if (result.isNotReady) {
                Toast.hide();
                Toast.fail(result.message, 3, () => { }, false);
                return;
            }
            Toast.hide();

            hashHistory.push(`/transactiondetail?txid=${result}&is_cross_chain=1`
              + `&token=${tokenName}&contract_address=${contractAddress}&decimals=${decimals}`);
        } catch(e) {
            Toast.fail(e.message || 'Something Error', 3, () => { }, false);
        }
    }

    async normalTransferExtension(options) {
        const {contractAddress, tokenName, address, amountBig, memo, decimals} = options;
        const tokenContract = await NightElfCheck.initContractInstance({
            contractAddress,
        });

        const result = await tokenContract.Transfer({
            symbol: tokenName,
            to: address,
            amount: amountBig.multipliedBy(Math.pow(10, decimals)).toNumber(),
            memo
        });

        if (result.errorMessage) {
            Toast.fail(result.errorMessage.message, 3, () => { }, false);
            return;
        }

        Toast.hide();
        hashHistory.push(`/transactiondetail?txid=${getViewResult('TransactionId', result)}`
          + `&token=${tokenName}&contract_address=${contractAddress}&decimals=${decimals}`);
    }

    async normalTransfer(options) {
        const walletUtilInstance = new WalletUtil();
        const walletType = walletUtilInstance.getWalletType();
        if (walletType !== 'local') {
            await this.normalTransferExtension(options);
            return;
        }
        await this.normalTransferLocal(options);
    }

    async normalTransferLocal(options) {
        const {password, contractAddress, tokenName, address, amountBig, memo, decimals} = options;

        try {
            getWallet(password);
        } catch(e) {
            this.setState({passwordError: e.message});
            Toast.fail(e.message, 3, () => {}, false);
            return;
        }

        try {
            // Normal transfer
            let aelf = initAelf({
                password,
                contractAddress
            });
            const result = await aelf.contractMethods.Transfer({
                symbol: tokenName,
                to: address,
                amount: amountBig.multipliedBy(Math.pow(10, decimals)).toNumber(),
                memo
            });
            Toast.hide();
            hashHistory.push(`/transactiondetail?txid=${result.TransactionId}`
              + `&token=${tokenName}&contract_address=${contractAddress}&decimals=${decimals}`);
        } catch(e) {
            const errorMessage = e.message || 'Send failed';
            Toast.fail(errorMessage, 3, () => { }, false);
            if (errorMessage === 'Invalid address') {
                this.setState({addressError: errorMessage});
            }
        }
    }

    // TODO: 使用string 转bigNumber操作.
    async transfer() {
        let {
            password, address, memo, amount, addressError, memoError, amountError, isCrossChain, decimals, walletType
        } = this.state;

        if (walletType !== 'local') {
            const result = await NightElfCheck.checkAccount();
            if (!result) {
                const walletUtil = new WalletUtil();
                await walletUtil.getWalletInfoList();
                this.inputAddress(address);
                this.refreshBalance(() => {
                    this.inputAmount(amount, () => {
                        this.transfer();
                    });
                });
                return;
            }
        }

        const errorMessage = addressError || memoError || amountError;
        if (errorMessage) {
            Toast.fail(errorMessage, 3, () => {}, false);
            return;
        }

        const loadingMessage = isCrossChain ? 'Cross chain transfer...' : 'Loading...';
        Toast.loading(loadingMessage, LOADING_TIME_LONG);
        // 为了能展示loading, 不惜牺牲用户50毫秒。sad
        setTimeout(() => {
            // check balance
            // let amount = parseInt(this.state.amount, 10);
            let amountBig = new BigNumber(amount);

            const {tokenName, contractAddress}  = this;
            const options = {
                password, contractAddress, address, tokenName, amountBig, amount, memo, decimals
            };
            isCrossChain ? this.crossTransfer(options) :  this.normalTransfer(options);

        }, 50);
    }

    render() {
        const {addressError, amountError, memoError, passwordError, walletType} = this.state;
        let addressErrorText;
        if (addressError) {
            addressErrorText = <div className={style.error}>{addressError}</div>;
        }

        let amountErrorText;
        if (amountError) {
            amountErrorText = <span className={style.error}>{amountError} &nbsp;</span>;
        }

        let memoErrorText;
        if (memoError) {
            memoErrorText = <span className={style.error}>{memoError}</span>;
        }

        let passwordErrorText;
        if (passwordError) {
            passwordErrorText = <div className={style.error}>{passwordError}</div>;
        }

        let createButton
            = <AelfButton
                text="Send"
                style={{
                    opacity: 0.5
                }}
            />;
        if (this.state.address && this.state.amount && (this.state.password || walletType !== 'local')) {
            createButton
                = <AelfButton
                    text="Send"
                    onClick={() => this.transfer()}
                />;
        }

        let containerStyle = getPageContainerStyle();

        return (
            <div>
                <BackupNotice/>
                <NavNormal/>
                <div className={style.container} style={containerStyle}>
                    <div className="aelf-input-container aelf-dash-light">
                        <div className={style.title}>
                            {this.state.tokenName} <FormattedMessage id = 'aelf.Transaction' />
                        </div>
                        <List>
                            <div className="aelf-input-title" style={{
                                marginTop: 28
                            }}>
                                <div><FormattedMessage id = 'aelf.To Address' /></div>
                                {addressErrorText}
                            </div>
                            <InputItem
                                value={this.state.address}
                                placeholder=""
                                style={{
                                    fontSize: 14
                                }}
                                onChange={address => this.inputAddress(address)}
                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                            />
                        </List>

                        <List>
                            <div className="aelf-input-title">
                                <div><FormattedMessage id = 'aelf.Amount to send' /></div>
                                <div>
                                    {amountErrorText}
                                    <FormattedMessage id = 'aelf.Balance' />：{this.state.balance.toFixed(2)}
                                </div>
                            </div>
                            <InputItem
                                value={this.state.amount}
                                placeholder=""
                                onChange={amount => this.inputAmount(amount)}
                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                            />
                        </List>

                        <List>
                            <div className="aelf-input-title">
                                <div><FormattedMessage id = 'aelf.Memo to send' /></div>
                                <div>
                                    {memoErrorText}
                                </div>
                            </div>
                            <InputItem
                              value={this.state.memo}
                              placeholder=""
                              onChange={memo => this.inputMemo(memo)}
                              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                            />
                        </List>

                        {walletType === 'local' && <List>
                            <div className="aelf-input-title">
                                <div><FormattedMessage id = 'aelf.Password' /></div>
                                {passwordErrorText}
                            </div>
                            <InputItem
                                value={this.state.password}
                                type="password"
                                placeholder=""
                                onChange={password => this.inputPassword(password)}
                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                            />
                        </List>}

                        <div className={style.crossChain} onClick={() => hashHistory.push('/personalcenter/notesoncrosschaintransfer')}>
                            <FormattedMessage id = 'aelf.Notes on cross chain transfer' />
                        </div>

                        {/*<List>*/}
                            {/*<div className="aelf-input-title">*/}
                                {/*<div>备注</div>*/}
                            {/*</div>*/}
                            {/*<InputItem*/}
                                {/*value={this.state.password}*/}
                                {/*onChange={password => this.inputPassword(password)}*/}
                                {/*moneyKeyboardWrapProps={moneyKeyboardWrapProps}*/}
                            {/*></InputItem>*/}
                        {/*</List>*/}

                        {/*<div>TODO: 矿工费组件</div>*/}
                    </div>

                    <div className={style.bottom}>
                        {createButton}
                    </div>
                </div>
            </div>
        );
    }
}
