/**
 *  @file
 *  @author zhouminghui
 *  token 搜索组件
 */

import React from 'react';
import Svg from '../../../components/Svg/Svg';
import style from './Navtoken.scss';

export default class NavToken extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange() {
        this.setState({
            value: this.refs.search.value
        });
    }

    handleClick() {

    }

    render() {
        return (
            <div className={style.Navtoken}>
                <div className={style.goBackBtn} >
                    <Svg icon={'back22'}
                        style={{display: 'inline-block', height: 36, width: 16}}
                    >
                    </Svg>
                </div>
                <div className={style.search}>
                    <Svg key='1'
                        icon={'search16'}
                        onClick={() => this.onOpenChange()}
                        style={{width: 16, height: 16, display: 'inline-block', marginLeft: '4px'}}
                    ></Svg>
                    <input
                        className={style.searchinput}
                        placeholder='Please input token name.'
                        type='text'
                        onKeyPress = {this.handleClick.bind(this)}
                        onChange = {value => this.handleChange(value)}
                        ref='search'
                    />
                </div>
            </div>
        );
    }
}
