/*
 * huangzongzhe
 * 2018.07.25
 */

import React, { Component } from 'react'
import { WhiteSpace, List, InputItem } from 'antd-mobile'
import style from './Password.scss'
import passwordCheck from '../../../utils/passwordCheck'
import moneyKeyboardWrapProps from '../../../utils/moneyKeyboardWrapProps'

// 父组件能从password获得 密码。
class Password extends Component {
    constructor(props) {
        super(props);
        // console.log('this.props: ', this.props);
        this.passwordReplayHasError = false;
        this.state = {
            password: '',
            passwordReplay: ''
        };
    }

    inputPassword(password) {
        this.setState({password: password});
        let checkResult = passwordCheck(password);
        this.passwordInfo = checkResult;

        let passwordReplay = this.state.passwordReplay;
        if (passwordReplay) {
            this.state.password = password;
            this.comfirmPassword(passwordReplay);
        }
    }

    comfirmPassword(passwordReplay) {
        if (this.state.password != passwordReplay 
        	|| (this.passwordInfo && this.passwordInfo.level <= 2)) {
            this.passwordReplayHasError = true;
            this.props.setPassword(false);
        } else {
            this.passwordReplayHasError = false;
            this.props.setPassword(passwordReplay);
        }
        this.setState({passwordReplay: passwordReplay});
    }

    render() {
        let passwordInfo = this.passwordInfo;
        let passwordErrorText = '';
        if (passwordInfo && passwordInfo.type && passwordInfo.level <= 2) {
            passwordErrorText = <div className={style.error}>{passwordInfo.type}</div>
        }

        let passwordReplayErrorText = '';
        if (this.passwordReplayHasError) {
            passwordReplayErrorText = <div className={style.error}>The twice input are different</div>
        }

        return (
            <div>
                <List renderHeader={() => 'Your password, at least 9 digits of mixed number and letter.'}>
                    <InputItem
                        value={this.state.password}
                        type="password"
                        placeholder="******"
                        onChange={password => this.inputPassword(password)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >password</InputItem>
                </List>
                    {passwordErrorText}
                <List renderHeader={() => 'Please Confirm your password.'}>
                    <InputItem
                        value={this.state.passwordReplay}
                        type="password"
                        placeholder="******"
                        onChange={password => this.comfirmPassword(password)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    >comfirm</InputItem>
                </List>
                    {passwordReplayErrorText}
                <WhiteSpace />
            </div>
        );
    }
}

export default Password