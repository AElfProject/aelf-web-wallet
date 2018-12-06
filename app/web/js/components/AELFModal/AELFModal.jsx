/** @file
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

import style from './AELFModal.scss';
import {FormattedMessage} from 'react-intl';

export default class AELFModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            key: '1234',
            times: null,
            passwordopacity: false,
            CheckCompletion: false
        };
    }

    comfirmPassword(password) {
        this.setState({
            password
        });
    }

    checkPassword(password) {
        if (this.state.times !== 0) {
            if (this.state.key === this.state.password) {
                this.setState({
                    CheckCompletion: false
                });
            }
            else {
                this.setState({
                    CheckCompletion: true
                });
                this.state.times--;
                localStorage.setItem('times', this.state.times);
            }
        }
    }

    componentDidMount() {
        if (localStorage.times === undefined) {
            localStorage.setItem('times', 5);
            this.setState({
                times: 5
            });
        }
        else {
            this.setState({
                times: localStorage.times
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
                    style={(this.state.CheckCompletion) ? CheckState.SHOW : CheckState.HIDE}
                >
                    <Svg icon={this.props.aelficon}
                        style={{display: 'inline-block', height: 16, width: 16}}>
                    </Svg>
                    <span>
                        <FormattedMessage id='aelf.Modaltips' />
                        {this.state.times}
                        <FormattedMessage id='aelf.Modaltimes' />
                    </span>
                </div>
                <div className={style.nextButton}>
                    {nextButton}
                </div>
            </div>
        );
    }
}
