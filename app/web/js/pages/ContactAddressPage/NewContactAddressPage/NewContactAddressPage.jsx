/**
 *  @file
 *  @author zhouminghui
 *  2018.11.20
 *  Code formatting completed
 */

import React from 'react';
import {Toast, List, InputItem} from 'antd-mobile';

import NavNormal from '../.././NavNormal/NavNormal';

import newContact from '../../../utils/newContact';
import {historyReplace} from '../../../utils/historyChange';
import {FormattedMessage} from 'react-intl';

require('./NewContactAddressPage.css');


export default class NewContactAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            name: ''
        };
    }

    handleClick() {
        let re = /^[0-9a-zA-Z]*$/g;
        if (this.state.name !== '' && this.state.address !== '') {
            if (re.test(this.state.address) && this.state.address.length === 36) {
                newContact(this.state.name, this.state.address);
                historyReplace('/contactaddress');
            }
            else {
                Toast.fail('Address format error', 3);
            }
        }
        else {
            Toast.fail('Can not be empty', 3);
        }
    }

    inputName(val) {
        this.setState({
            name: val
        });
    }

    inputAddress(val) {
        this.setState({
            address: val
        });
    }

    render() {
        return (
            <div className='newcontact' >
                <NavNormal rightContent={
                    <div onClick={this.handleClick.bind(this)}>
                        <FormattedMessage
                            id='aelf.Commit'
                            defaultMessage='Commit'
                        />
                    </div>
                } />
                <div className='content' >
                    <div className='new-con-title' >
                        <FormattedMessage
                            id='aelf.New contacts'
                            defaultMessage='New contacts'
                        />
                    </div>
                    <div>
                        <div className='new-con-input-title'>
                            <FormattedMessage
                                id='aelf.Name'
                                defaultMessage='Name'
                            />
                        </div>
                        <List>
                            <InputItem
                                clear
                                placeholder=''
                                onChange={name => this.inputName(name)}
                            ></InputItem>
                        </List>
                        <div className='new-con-input-title'>
                            <FormattedMessage
                                id='aelf.Payee wallet address'
                                defaultMessage='Payee wallet address'
                            />
                        </div>
                        <List>
                            <InputItem
                                clear
                                placeholder=''
                                onChange={address => this.inputAddress(address)}
                            ></InputItem>
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}
