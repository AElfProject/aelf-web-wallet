import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { List, InputItem } from 'antd-mobile';

import NavNormal from '.././NavNormal/NavNormal';

import { historyPush } from '../../utils/historyChange';

import Addressclass from './Addressclass/Addressclass';

import Svg from '../../components/Svg/Svg';

require('./ContactAddressPage.css');

class Contactaddress extends React.Component{
    constructor(props){
        super(props);
        
        if(localStorage.content == undefined){
            let Content = {
            	"content":[]
            }
            localStorage.setItem("content",JSON.stringify(Content));
        }
        
        this.state = {
            height:0
        }
    }
    
    handleClick(){
        historyPush('/contactaddress/newcontactaddress',false);
    }
    
    componentDidMount () {
        let screenH = window.innerHeight - 45;
        this.setState({
            height:screenH
        })
    }
    
    render(){
        return(
            <div className = "navbar">
                <NavNormal  navTitle = "Contact" rightContent = { 
                    <Svg icon={"add_purple20"}  
                         style={{ display: 'inline-block', height: 22, width: 22}}
                         onClick = {this.handleClick.bind(this)}
                    >
                    </Svg> 
                } 
                ref = "Nav"
                />
                <div className = "List" style={{height:this.state.height}} >
                    <Addressclass />
                </div>
            </div>
        )
    }
}

export default Contactaddress