/**
 * @file Transfer.jsx
 * @author huangzongzhe
 *
 * 2018.07.27
 */
// TODO: 重点关注Int64的处理！！！！！！！！
import React, {Component} from 'react';
import {List, InputItem, Toast, Modal} from 'antd-mobile';
import style from './Transfer.scss';
import {hashHistory} from 'react-router';
import Long from 'long';
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

import {FormattedMessage} from 'react-intl';
import { from } from 'rxjs/observable/from';

export default class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decimals: 0,
            balance: new BigNumber(0),
        };
        this.walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
        this.contractAddress = getParam('contract_address', window.location.href);
        this.tokenName = getParam('token', window.location.href);
    }

    inputAmount(amount) {
        this.setState({
            amount,
            amountError: false
        });
    }

    inputAddress(address) {
        this.setState({
            address: address,
            addressError: false
        });
    }

    inputPassword(password) {
        this.setState({
            password: password,
            passwordError: false
        });
    }

    componentDidMount() {
        let address = this.walletAddress;

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
            });
        });
    }

    componentWillUnmount() {
        this.WillUnmount = true;
        this.setState = () => {};
    }

    // TODO: 使用string 转bigNumber操作.
    transfer() {
        // TODO:
        // check amount
        Toast.loading('Loading...', 30);
        // 为了能展示loading, 不惜牺牲用户50毫秒。sad
        setTimeout(() => {
            let password = this.state.password;

            // checkAddress
            let address = this.state.address;
            let addressCheckResult = addressCheck(address);
            if (!addressCheckResult.ready) {
                this.setState({addressError: addressCheckResult.message});
                Toast.hide();
                Toast.fail(addressCheckResult.message, 3, () => {}, false);
                return;
            }

            // check balance
            // let amount = parseInt(this.state.amount, 10);
            let amountBig = new BigNumber(this.state.amount);

            if (amountBig.isNaN() || !amountBig.isFinite() || !amountBig.gt(0)) {
                this.setState({
                    amountError: 'Invalid Number'
                });
                Toast.hide();
                Toast.fail('Invalid Number', 3, () => {}, false);
                return;
            }

            // const amountLong = new Long(amount);
            // if (amountLong.greaterThan(this.state.balance)) {
            if (amountBig.gt(this.state.balance)) {
                Toast.hide();
                Toast.fail('insufficient', 3, () => {}, false);
                return;
            }
            const tokenName = this.tokenName;
            const contractAddress = this.contractAddress;
            let aelf = initAelf({
                password,
                contractAddress
            });

            if (aelf.errormsg) {
                this.setState({passwordError: aelf.errormsg});
                Toast.hide();
                Toast.fail(aelf.errormsg, 3, () => {}, false);
                return;
            }

            // let transfer = aelf.contractMethods.Transfer(address, amount);
            // let transfer =
            aelf.contractMethods.Transfer({
                symbol: tokenName,
                to: address,
                amount: amountBig.multipliedBy(Math.pow(10, this.state.decimals)).toNumber(),
                memo: ''
            }).then(transfer => {
              Toast.hide();
              hashHistory.push(`/transactiondetail?txid=${transfer.TransactionId}&token=${tokenName}&contract_address=${contractAddress}&decimals=${this.state.decimals}`);
            }).catch(error => {
              Toast.hide();
              Toast.fail(error, 3, () => { }, false);
            });
        }, 50);
    }

    render() {
        let addressErrorText;
        if (this.state.addressError) {
            addressErrorText = <div className={style.error}>{this.state.addressError}</div>;
        }

        let amountErrorText;
        if (this.state.amountError) {
            amountErrorText = <span className={style.error}>{this.state.amountError} &nbsp;</span>;
        }

        let passwordErrorText;
        if (this.state.passwordError) {
            passwordErrorText = <div className={style.error}>{this.state.passwordError}</div>;
        }

        let createButton
            = <AelfButton
                text="Send"
                style={{
                    opacity: 0.5
                }}
            />;
        if (this.state.address && this.state.amount && this.state.password) {
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
                        <div className={style.title}>{this.state.tokenName} <FormattedMessage id = 'aelf.Transaction' /></div>
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
                        </List>

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
