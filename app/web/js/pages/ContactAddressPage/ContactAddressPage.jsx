/** @file
 *  @author zhouminghui
 *  2018.12.5
 *  多拆分出了一个可复用组件，减少了一个无用的组件层级，感觉不错！
 */

import React from 'react';
import {FormattedMessage} from 'react-intl';

import NavNormal from '.././NavNormal/NavNormal';
import AddressList from './AddressList/AddressList';
import Svg from '../../components/Svg/Svg';
import {historyPush} from '../../utils/historyChange';

require('./ContactAddressPage.css');

export default class Contactaddress extends React.Component {
    constructor(props) {
        super(props);

        if (localStorage.content === undefined) {
            let Content = {
                CONTENT: []
            };
            localStorage.setItem('content', JSON.stringify(Content));
        }

        this.state = {
            height: 0
        };
    }

    handleClick() {
        historyPush('/contactaddress/newcontactaddress', false);
    }

    componentDidMount() {
        let screenH = window.innerHeight - 45;
        this.setState({
            height: screenH
        });
    }

    render() {
        return (
            <div className='navbar'>
                <NavNormal
                    navTitle={
                        <FormattedMessage
                            id='aelf.Contact'
                            defaultMessage='Contact'
                        />
                    }
                    rightContent={
                        <Svg icon={'add_purple20'}
                            style={{display: 'inline-block', height: 22, width: 22}}
                            onClick={this.handleClick.bind(this)}
                        >
                        </Svg>
                    }
                />
                <div className='List' style={{height: this.state.height}} >
                    <AddressList />
                </div>
            </div>
        );
    }
}
