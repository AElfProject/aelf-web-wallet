/*
 * huangzongzhe
 * 2018.07.27
 */
import React, { Component } from 'react'
import { WhiteSpace, List, InputItem, Button, Toast } from 'antd-mobile'
import style from './Transfer.scss'
import { hashHistory } from 'react-router'

import AelfButton from './../../../components/Button/Button'

import NavNormal from '../../NavNormal/NavNormal'
import BackupNotice from '../../BackupNotice/BackupNotice'

import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import initAelf from '../../../utils/initAelf'
import getPageContainerStyle from '../../../utils/getPageContainerStyle'

import getParam from '../../../utils/getParam' // 还有类似方法的话，合并一下。
import getBalanceAndTokenName from '../../../utils/getBalanceAndTokenName'

// React component
// TODO
// 1.function addressCheck() {}
// 2.insufficient funds

// 需要更加完善的机制
function addressCheck (address = '') {
    let output = {
        ready: true,
        message: ''
    };

    if (address.length === 38 && address.match(/^0x/)) {
        let addressUse = JSON.parse(localStorage.getItem('lastuse')).address;
        if (address === addressUse) {
            output.ready = false;
            output.message = '转账地址和当前钱包地址一样';
            return output;
        }
        output.ready = true;
        return output;
    }
    output.ready = false;
    output.message = '错误的地址';
    return output;
}
class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
    }

    inputAmount(amount) {
        this.setState({amount: amount});
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
        let contractAddress = getParam('contract_address', window.location.href);

        getBalanceAndTokenName(address, contractAddress, output => {
            this.setState({
                balance: output.balance,
                tokenName: output.tokenDetail.name,
                contract_address: contractAddress
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
        // 为了能展示loading, 不惜牺牲用户50毫秒，没看源码，但是这个应该和机器有关。。。sad
        setTimeout(() => {
            console.log('password: ', this.state.password);
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
            let amount = parseInt(this.state.amount);
            if (amount > this.state.balance) {
                Toast.hide();
                Toast.fail('insufficient', 3, () => {}, false);
                return;
            }

            let aelf = initAelf({
                password: password
            });

            if (aelf.errormsg) {
                this.setState({passwordError: aelf.errormsg});
                Toast.hide();
                Toast.fail(aelf.errormsg, 3, () => {}, false);
                return;
            }

            let transfer = aelf.contractMethods.Transfer(address, amount);

            Toast.hide();

            hashHistory.push(`/transactiondetail?txid=${transfer.hash}`);
            
        }, 50);
    }
  
    render() {
        let addressErrorText;
        if (this.state.addressError) {
            addressErrorText = <div className={style.error}>{this.state.addressError}</div>
        }

        let passwordErrorText;
        if (this.state.passwordError) {
            passwordErrorText = <div className={style.error}>{this.state.passwordError}</div>
        }

        let createButton =
            <AelfButton
                text="确认转账"
                style={{
                    opacity: 0.5
                }}
            ></AelfButton>;
        if (this.state.address && this.state.amount && this.state.password) {
            createButton =
                <AelfButton
                    text="确认转账"
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
                        <div className={style.title}>{this.state.tokenName} 转账</div>
                        <List>
                            <div className="aelf-input-title" style={{
                                marginTop: 28
                            }}>
                                <div>收款人钱包地址</div>
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
                                <div>转账额度</div>
                                <div>
                                    余额：{this.state.balance}
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
                                <div>钱包密码</div>
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

export default Transfer