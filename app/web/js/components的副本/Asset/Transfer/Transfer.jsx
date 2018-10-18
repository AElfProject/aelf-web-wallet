/*
 * huangzongzhe
 * 2018.07.27
 */
import React, { Component } from 'react'
import { WhiteSpace, List, InputItem, Button, Toast } from 'antd-mobile'
import style from './Transfer.scss'
import { hashHistory } from 'react-router'

import NavNormal from '../../NavNormal/NavNormal'
import BackupNotice from '../../BackupNotice/BackupNotice'

import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'
import initAelf from '../../../utils/initAelf'

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
    }

    inputAmount(amount) {
        this.setState({amount: amount});
    }

    inputAddress(address) {
        this.setState({address: address});
    }

    inputPassword(password) {
        this.setState({
            password: password,
            passwordError: false
        });
    }

    transfer() {
        // TODO:
        // check amount
        // check address
        Toast.loading('Loading...', 30);
        // 为了能展示loading, 不惜牺牲用户50毫秒，没看源码，但是这个应该和机器有关。。。sad
        setTimeout(() => {
            let password = this.state.password;
            if (!password) {
                this.setState({passwordError: 'wrong password'});
                return Toast.hide();
            }

            let aelf = initAelf({
                password: password
            });

            if (aelf.errormsg) {
                this.setState({passwordError: aelf.errormsg});
                return Toast.hide();
            }

            let amount = parseInt(this.state.amount);
            let address = this.state.address;

            let addressCheckResult = addressCheck(address);
            if (!addressCheckResult.ready) {
                this.setState({passwordError: addressCheckResult.message});
                return Toast.hide();
            }

            let transfer = aelf.contractMethods.Transfer(address, amount);

            Toast.hide();

            hashHistory.push(`/transactiondetail?txid=${transfer.hash}`);
            
        }, 50);
    }
  
    render() {
        let passwordErrorText;
        if (this.state.passwordError) {
            passwordErrorText = <div className={style.error}>{this.state.passwordError}</div>
        }

        return (
            <div>
                <BackupNotice/>
                <NavNormal navTitle="转账"></NavNormal>
                <div className="aelf-content-container">
                
                    <WhiteSpace/>
                    <WhiteSpace/>

                    <List>
                        <InputItem
                            value={this.state.amount}

                            onChange={amount => this.inputAmount(amount)}
                            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        >amount</InputItem>
                    </List>

                    <WhiteSpace/>
                    <List>
                        <InputItem
                            value={this.state.address}

                            onChange={address => this.inputAddress(address)}
                            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        >address</InputItem>
                    </List>

                    <WhiteSpace/>
                    <List>
                        <InputItem
                            value={this.state.password}
                            type="password"
                            placeholder="******"
                            onChange={password => this.inputPassword(password)}
                            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        >password</InputItem>
                    </List>
                    {passwordErrorText}

                    <WhiteSpace/>
                    <WhiteSpace/>
                    <WhiteSpace/>

                    <h3>转账地址目前是没有校验的，随便输入都行，所以，请好好确认。测试币丢了也是丢了的。。。</h3>
                    <div className={style.transfer}>
                        <Button
                            onClick={() => this.transfer()}
                        >确认转账</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transfer