/*
    zhouminghui 
    2018.11.28
    找时间把search做成一个component使用
*/


import React, {Component} from 'react'

import ReactDOM from 'react-dom'

import { Toast, WhiteSpace, List, InputItem } from 'antd-mobile'

import { hashHistory } from 'react-router'

import Svg from '../../../components/Svg/Svg'

import initAelf from '../../../utils/initAelf'

require("./Search.css")


class Search extends React.Component{    
    constructor(props){
        super(props);
        this.state = {
            key:""
        }

        this.aelf = initAelf({
            chainOnly: true
        });

    }

    handleClick(e){
        //判断字符串是否为数字和字母组合     
        //判断正整数 /^[1-9]+[0-9]*]*$/  
        let re =  /^[0-9a-zA-Z]*$/g;
        if (e.which === 13) {
            if (re.test(this.state.key) && this.state.key.length === 64){
                let result = this.aelf.aelf.chain.getTxResult(this.state.key);
                if(result.tx_trc !== null){
                    this.props.setValue(result);
                    this.props.SearchOnShow();
                }else{
                    Toast.fail('No deal !!!', 3);
                }
            }else{
                Toast.fail('Format error !!!', 3);
            }
        }
    }

    handleChange(){
        this.setState({
            key:this.refs.search.value
        })
    }

    render(){
        return(
            <div className = "TransactionsSearch" >
                <Svg key="1"
                    icon={'search16'}
                    style={{width: 16, height: 16}}
                ></Svg>
                <input 
                    className = "searchinput"
                    placeholder = "Please enter the full transaction ID"
                    type = "text"
                    onKeyPress = {this.handleClick.bind(this)}
                    onChange = {this.handleChange.bind(this)}
                    ref = "search"
                />
                <Svg key="2"
                    icon={'up12'}
                    onClick={() => {
                        this.refs.search.value = '';
                        this.setState({
                            key:''
                        });
                        this.props.SearchOnHide();
                    }}
                    style={{width: 16, height: 16}}
                ></Svg>
            </div>
        )
    }
}

export default Search