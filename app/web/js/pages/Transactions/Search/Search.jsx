import React, {Component} from 'react'

import ReactDOM from 'react-dom'

import { Toast, WhiteSpace, List, InputItem } from 'antd-mobile'

import { hashHistory } from 'react-router'

import Svg from '../../../components/Svg/Svg'


require("./Search.css")


class Search extends React.Component{    
    constructor(props){
        super(props);
        this.state = {
            key:""
        }
    }

    handleClick(e){
        //判断字符串是否为数字和字母组合     
        //判断正整数 /^[1-9]+[0-9]*]*$/  
        let re =  /^[0-9a-zA-Z]*$/g;
        if (e.which === 13) {
            if (re.test(this.state.key) && this.state.key.size === 64){
                hashHistory.push(`/transactiondetail?txid=` + this.state.key )
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
                    onClick={() => this.onOpenChange()}
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
                {/* <List>
                    <InputItem 
                        placeholder = "Please enter the full transaction ID"
                        ref = { el =>this.Search = el }
                        onVirtualKeyboardConfirm = {this.handleClick.bind(this)}
                    >
                    </InputItem>
                </List> */}
            </div>
        )
    }
}

export default Search