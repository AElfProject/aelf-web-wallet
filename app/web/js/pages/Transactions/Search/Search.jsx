/**
 *  @file
 *  @author zhouminghui
 *  2018.12.5
 *  查询搜索框组件
 */

import React from 'react';

import {Toast} from 'antd-mobile';

import Svg from '../../../components/Svg/Svg';

import initAelf from '../../../utils/initAelf';

require('./Search.css');

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ''
        };

        this.aelf = initAelf({
            chainOnly: true
        });

    }

    handleClick(e) {
        // 判断字符串是否为数字和字母组合
        // 判断正整数 /^[1-9]+[0-9]*]*$/
        let re = /^[0-9a-zA-Z]*$/g;
        if (e.which === 13) {
            if (re.test(this.state.key) && this.state.key.length === 64) {
                let result = this.aelf.aelf.chain.getTxResult(this.state.key, {sync: true});
                if (result.tx_trc !== null) {
                    this.props.setValue(result);
                    this.props.searchShow();
                }
                else {
                    Toast.fail('No deal !!!', 1);
                }
            }
            else {
                Toast.fail('Format error !!!', 1);
            }
        }
    }

    handleChange() {
        this.setState({
            key: this.refs.search.value
        });
    }

    render() {
        return (
            <div className='TransactionsSearch' >
                <Svg key='1'
                    icon={'search16'}
                    style={{width: 16, height: 16}}
                ></Svg>
                <input
                    className='searchinput'
                    placeholder='Please enter the full transaction ID'
                    type='text'
                    onKeyPress={this.handleClick.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    ref='search'
                />
                <span className='clearBtn'
                    onClick={() => {
                        this.refs.search.value = '';
                        this.setState({
                            key: ''
                        });
                        this.props.searchHide();
                    }}
                >&Chi;</span>
            </div>
        );
    }
}
