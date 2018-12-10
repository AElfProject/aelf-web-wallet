/**
 *  @file AElfModal
 *  @author zhouminghui
 *  2018.11.20
 *  Code formatting completed
 * <Aelfpassword tip='钱包密码' aelficon = 'notice32' />
*/

import React from 'react';
import Svg from '../Svg/Svg';

import PursTip from './tips/PursTip';
import AelfButton from '../Button/Button';
import {List, InputItem} from 'antd-mobile';

import style from './AElfModal.scss';
import {FormattedMessage} from 'react-intl';

export default class AElfModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            key: '1234',
            passwordTryTimes: null,
            checkCompletion: false
        };
    }

    comfirmPassword(password) {
        this.setState({
            password
        });
    }

    checkPassword(password) {
        if (this.state.passwordTryTimes !== 0) {
            if (this.state.key === this.state.password) {
                this.setState({
                    checkCompletion: false
                });
                localStorage.setItem('passwordTryTimes', 5);
            }
            else {
                this.setState({
                    checkCompletion: true
                });
                this.state.passwordTryTimes--;
                localStorage.setItem('passwordTryTimes', this.state.passwordTryTimes);
            }
        }
    }

    componentDidMount() {
        if (localStorage.passwordTryTimes === undefined) {
            localStorage.setItem('passwordTryTimes', 5);
            this.setState({
                passwordTryTimes: 5
            });
        }
        else {
            this.setState({
                passwordTryTimes: localStorage.passwordTryTimes
            });
        }
    }

    render() {
        let CheckState = {
            SHOW: {
                opacity: 1
            },
            HIDE: {
                opacity: 0
            }
        };

        let nextButton = <AelfButton
                text='Next'
                type='blue'
                style={{
                    opacity: 0.5
                }}
            ></AelfButton>;

        if (this.state.password) {
            nextButton
                = <AelfButton
                    text='Next'
                    type='blue'
                    onClick={() => this.checkPassword()}
                ></AelfButton>;
        }

        return (
            <div className={style.TranderPassword} >
                <PursTip tip={this.props.tip} />
                <div className={style.passwordbox}>
                    <List>
                        <InputItem
                            type='password'
                            placeholder='Please enter your password'
                            onChange={password => this.comfirmPassword(password)}
                        >
                        </InputItem>
                    </List>
                </div>
                <div
                    className={style.passwordtip}
                    style={(this.state.checkCompletion) ? CheckState.SHOW : CheckState.HIDE}
                >
                    <Svg icon={this.props.aelficon}
                        style={{display: 'inline-block', height: 16, width: 16}}>
                    </Svg>
                    <span>
                        <FormattedMessage id='aelf.Modaltips' />
                        {this.state.passwordTryTimes}
                        <FormattedMessage id='aelf.ModalpasswordTryTimes' />
                    </span>
                </div>
                <div className={style.nextButton}>
                    {nextButton}
                </div>
            </div>
        );
    }
}
