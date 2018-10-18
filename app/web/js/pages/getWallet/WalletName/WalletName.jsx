/*
 * huangzongzhe
 * 2018.07.25
 */

import React, { Component } from 'react'
import { WhiteSpace, List, InputItem } from 'antd-mobile'
import style from './WalletName.scss'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'

// 目前重写antd-mobile inputItem的样式在Password.css里面

class WalletName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletName: ''
        };
    }

    inputWalletName(walletName) {
        this.props.setWalletName(walletName);
        this.setState({walletName: walletName});
    }

    render() {
        return (
            <div className="aelf-input-container">
                <List>
                    <div className="aelf-input-title">钱包名称</div>
                    <InputItem
                        value={this.state.walletName}
                        type="text"
                        placeholder="不超过12个字符"
                        onChange={walletName => this.inputWalletName(walletName)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    ></InputItem>
                </List>
            </div>
        );
    }
}

export default WalletName