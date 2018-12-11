/*
 * huangzongzhe
 * 2018.07.25
 */

import React, { Component } from 'react'
import { WhiteSpace, List, InputItem } from 'antd-mobile'
import style from './WalletName.scss'
import {
    moneyKeyboardWrapProps
} from '../../../utils/utils'

import { FormattedMessage } from 'react-intl'

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
            <div className="aelf-input-container aelf-dash">
                <List>
                    <div className="aelf-input-title">
                        <FormattedMessage 
                            id = 'aelf.WalletName'
                            defaultMessage = 'Wallet Name'
                        />
                    </div>
                    <InputItem
                        value={this.state.walletName}
                        type="text"
                        placeholder=""
                        onChange={walletName => this.inputWalletName(walletName)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    ></InputItem>
                </List>
            </div>
        );
    }
}

export default WalletName