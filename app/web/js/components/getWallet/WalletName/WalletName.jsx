/*
 * huangzongzhe
 * 2018.07.25
 */

import React, { Component } from 'react'
import { WhiteSpace, List, InputItem } from 'antd-mobile'
import style from './WalletName.scss'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'

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
        // let walletNameErrorText = '';
        // if (!this.state.walletName) {
        //     walletNameErrorText = <div className={style.error}></div>;
        // }
        // {walletNameErrorText}
        return (
            <div>
                <List renderHeader={() => 'Wallet Name'}>
                    <InputItem
                        value={this.state.walletName}
                        type="text"
                        placeholder="wallet name"
                        onChange={walletName => this.inputWalletName(walletName)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >name</InputItem>
                </List>
                    
            </div>
        );
    }
}

export default WalletName