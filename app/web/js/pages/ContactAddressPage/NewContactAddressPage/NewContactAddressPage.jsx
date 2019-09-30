/**
 *  @file
 *  @author zhouminghui
 *  2018.11.20
 *  Code formatting completed
 */

import React from 'react';
import {Toast, List, InputItem} from 'antd-mobile';

import NavNormal from '../.././NavNormal/NavNormal';

import {FormattedMessage} from 'react-intl';

import {
    newContact,
    historyReplace,
    addressCheck
} from '../../../utils/utils';

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
        if (this.state.name !== '' && this.state.address !== '') {
            if (addressCheck(this.state.address, { compareToUse: false }).ready) {
                newContact(this.state.name, this.state.address);
                historyReplace('/contactaddress');
            }
            else {
                Toast.fail('Address format error', 3, () => { }, false);
            }
        }
        else {
            Toast.fail('Can not be empty', 3, () => { }, false);
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
