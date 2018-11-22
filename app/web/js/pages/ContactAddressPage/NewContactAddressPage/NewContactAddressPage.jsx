/*
  2018.11.21
  zhouminghui
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { List, InputItem } from 'antd-mobile';

import NavNormal from '../.././NavNormal/NavNormal';

import newcontact from '../../.././utils/newcontact';

import { historyReplace } from '../../../utils/historyChange';


require('./NewContactAddressPage.css');


class Newcontactaddress extends React.Component{
    
    constructor(props){
        super(props)
    }
    
    
    handleClick(){
        if(this.refs.name.state.value!="" && this.refs.address.state.value!=""){
            let name = this.refs.name.state.value;
            let address = this.refs.address.state.value;
            let newcont = newcontact(name,address);
            historyReplace('/contactaddress');
            /*跳转回联系人页 TODO*/
            
        }else{
            /*TODO*/
        }
    }
    render(){
        return(
            <div className = "newcontact" >
                <NavNormal rightContent = {<div onClick={this.handleClick.bind(this)}>Commit</div>} /> 
                <div className = "content" >
                    <div className = "new-con-title" >New contacts</div>
                    <div>
                        <div className = 'new-con-input-title'>Name</div>
                        <List>
                        	<InputItem
                        		clear
                        		placeholder=""
                            ref = "name"
                        	></InputItem>
                        </List>
                        <div className = 'new-con-input-title'>Payee wallet address</div>
                        <List>
                        	<InputItem
                        		clear
                        		placeholder=""
                                ref = "address" 
                        	></InputItem>
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newcontactaddress
