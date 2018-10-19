/*
 * huangzongzhe
 * 2018.07.25
 */

import React, { Component } from 'react'
import { WhiteSpace, List, InputItem } from 'antd-mobile'
import style from './Password.scss'
import passwordCheck from '../../utils/passwordCheck'
import moneyKeyboardWrapProps from '../../utils/moneyKeyboardWrapProps'

// 用于覆盖antd的样式
require('./Password.css');

// class AelfInputItem extends Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         let titleHtml = '';
//         if (this.props.title) {
//             titleHtml = <div className={style.title}>{this.props.title}</div>;
//         }
//
//         return (
//             <div>
//                 {titleHtml}
//                 <InputItem
//                     value={this.props.value}
//                     type={this.props.type}
//                     placeholder="至少9位混合大小写和数字"
//                     onChange={value => {
//                         let fn = this.props.onChange();
//                         console.log(value, fn);
//                         fn(value);
//                         // this.props.onChange(value)
//                     }}
//                     moneyKeyboardWrapProps={moneyKeyboardWrapProps}
//                 ></InputItem>
//             </div>
//         )
//     }
// }

/*
<List>
    <AelfInputItem
        value={this.state.password}
        title='你好呀'
        type='password'
        onChange={() => this.inputPassword}
    ></AelfInputItem>
</List>
*/

function getPasswordLevelInfo (passwordInfo) {
    let level = {
        level1: {
            opacity: 0.5
        },
        level2: {
            opacity: 0.5
        },
        level3: {
            opacity: 0.5
        },
        text: '至少9位'
    };

    if (passwordInfo && passwordInfo.type) {
        switch (passwordInfo.level) {
            case 0:
                break;
            case 1:
                level.level1.opacity = 1;
                break;
            case 2:
                level.level1.opacity = 1;
                level.level2.opacity = 1;
                break;
            default:
                level.level1.opacity = 1;
                level.level2.opacity = 1;
                level.level3.opacity = 1;
        }

        if (passwordInfo.level > 2) {
            level.text = '强';
        } else {
            level.text = '强度不够';
        }
    }
    return level;
}

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
        console.log('password: ', password);
        let passwordReplay = this.state.passwordReplay;
        if (passwordReplay) {
            this.state.password = password;
            this.comfirmPassword(passwordReplay);
        } else {
            this.passwordReplayHasError = false;
        }

        this.setState({password: password});

        let checkResult = passwordCheck(password);
        this.passwordInfo = checkResult;
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

        let passwordReplayErrorText = '';
        if (this.passwordReplayHasError) {
            passwordReplayErrorText = <div className={style.error}>两次输入不一致</div>
        }

        let levelInfo = getPasswordLevelInfo(this.passwordInfo);

        return (
            <div className="aelf-input-container aelf-dash">
                <List>
                    <div className="aelf-input-title">
                        <div>设置密码</div>
                        <div className={style.passwordLevel}>
                            <div className={`${style.level1}  ${style.list}`} style={levelInfo.level1}></div>
                            <div className={`${style.level2}  ${style.list}`} style={levelInfo.level2}></div>
                            <div className={`${style.level3}  ${style.list}`} style={levelInfo.level3}></div>
                            <div className={style.levelText}>{levelInfo.text}</div>
                        </div>
                    </div>
                    <InputItem
                        value={this.state.password}
                        type="password"
                        placeholder=""
                        onChange={password => this.inputPassword(password)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    ></InputItem>
                </List>

                <List>
                    <div className="aelf-input-title">
                        <div>再次输入密码</div>
                        {passwordReplayErrorText}
                    </div>
                    <InputItem
                        value={this.state.passwordReplay}
                        type="password"
                        placeholder=""
                        onChange={password => this.comfirmPassword(password)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    ></InputItem>
                </List>

                <WhiteSpace />
            </div>
        );
    }
}

export default Password