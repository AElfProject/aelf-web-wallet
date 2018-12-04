/*
  2018.11.21
  zhouminghui
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Toast,  List, InputItem } from 'antd-mobile';

import NavNormal from '../.././NavNormal/NavNormal';

import newcontact from '../../.././utils/newcontact';

import { historyReplace } from '../../../utils/historyChange';

import { FormattedMessage } from 'react-intl'

require('./NewContactAddressPage.css');


class Newcontactaddress extends React.Component{
    
    constructor(props){
        super(props)
    }
    
    
    handleClick(){
        let re =  /^[0-9a-zA-Z]*$/g;
        if(this.refs.name.state.value!="" && this.refs.address.state.value!=""){
            if(re.test(this.refs.address.state.value) && this.refs.address.state.value.length === 36){
                let name = this.refs.name.state.value;
                let address = this.refs.address.state.value;
                let newcont = newcontact(name,address);
                historyReplace('/contactaddress');
            }else{
                Toast.fail('Address format error', 3);
            }
        }else{
            Toast.fail('Can not be empty', 3);
        }
    }
    
    render(){
        return(
            <div className = "newcontact" >
                <NavNormal rightContent = {<div onClick={this.handleClick.bind(this)}>
                    <FormattedMessage 
                        id = 'aelf.Commit'
                        defaultMessage = 'Commit'
                    />
                </div>} /> 
                <div className = "content" >
                    <div className = "new-con-title" >
                        <FormattedMessage 
                            id = 'aelf.New contacts'
                            defaultMessage = 'New contacts'
                        />
                    </div>
                    <div>
                        <div className = 'new-con-input-title'>
                            <FormattedMessage 
                                id = 'aelf.Name'
                                defaultMessage = 'Name'
                            />
                        </div>
                        <List>
                            <InputItem
                                clear
                                placeholder=""
                                ref = "name"
                            ></InputItem>
                        </List>
                        <div className = 'new-con-input-title'>
                            <FormattedMessage 
                                id = 'aelf.Payee wallet address'
                                defaultMessage = 'Payee wallet address'
                            />
                        </div>
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
