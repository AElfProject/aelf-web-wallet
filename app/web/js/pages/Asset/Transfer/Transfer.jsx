/*
 * huangzongzhe
 * 2018.07.27
 */
import React, {Component} from 'react';
import {WhiteSpace, List, InputItem, Button, Toast} from 'antd-mobile';
import style from './Transfer.scss';
import {hashHistory} from 'react-router';

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

export default class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
        this.contractAddress = getParam('contract_address', window.location.href);
        this.tokenName = getParam('token', window.location.href);
    }

    inputAmount(amount) {
        this.setState({amount});
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

        getBalanceAndTokenName(address, this.contractAddress, output => {
            this.setState({
                balance: output.balance,
                tokenName: this.tokenName || output.tokenDetail.name,
                contract_address: this.contractAddress
            });
        });
    }

    componentWillUnmount() {
        this.WillUnmount = true;
        this.setState = () => {};
    }

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
            let amount = parseInt(this.state.amount, 10);
            if (amount > this.state.balance) {
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

            let transfer = aelf.contractMethods.Transfer(address, amount);

            Toast.hide();

            hashHistory.push(`/transactiondetail?txid=${transfer.TransactionId}&token=${tokenName}&contract_address=${contractAddress}`);

        }, 50);
    }

    render() {
        let addressErrorText;
        if (this.state.addressError) {
            addressErrorText = <div className={style.error}>{this.state.addressError}</div>;
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
            ></AelfButton>;
        if (this.state.address && this.state.amount && this.state.password) {
            createButton
                = <AelfButton
                    text="Send"
                    onClick={() => this.transfer()}
                ></AelfButton>;
        }

        let containerStyle = getPageContainerStyle();

        return (
            <div>
                <BackupNotice/>
                <NavNormal></NavNormal>
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
                            ></InputItem>
                        </List>

                        <List>
                            <div className="aelf-input-title">
                                <div><FormattedMessage id = 'aelf.Amount to send' /></div>
                                <div>
                                    <FormattedMessage id = 'aelf.Balance' />：{this.state.balance}
                                </div>
                            </div>
                            <InputItem
                                value={this.state.amount}
                                placeholder=""
                                onChange={amount => this.inputAmount(amount)}
                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                            ></InputItem>
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
                            ></InputItem>
                        </List>

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
