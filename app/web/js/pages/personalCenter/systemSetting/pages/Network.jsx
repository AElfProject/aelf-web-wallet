/*
 * huangzongzhe
 * 2018.11.15
 */
import React, {
    Component
} from 'react'

import { List, Modal } from 'antd-mobile'
import NavNormal from '../../../NavNormal/NavNormal'

import NoticePanel from '../../../../components/NoticePanel/NoticePanel'

import {
    serviceProvider
} from '../../../../utils/utils'

import { FormattedMessage } from 'react-intl'

import style from './Network.scss';

const prompt = Modal.prompt;
const Item = List.Item;

class SystemSetting extends Component {

    constructor() {
        super();
        this.state = {
            provider: serviceProvider.getProvider(),
            defaultProvider: serviceProvider.getDefaultProvider()
        }
    }

    setNewProvider(newProvider) {
        serviceProvider.setProvider(newProvider);
        this.setState({
            provider: serviceProvider.getProvider()
        });
    }

    render() {

        return (
            <div className='aelf-personal-pages aelf-solid'>
                <NavNormal></NavNormal>
                <div className='aelf-blank40'></div>
                <NoticePanel
                    mainTitle={<FormattedMessage id = 'aelf.Network' defaultMessage = 'Network' />}
                    iconHidden={true}
                ></NoticePanel>
                <div className='aelf-blank16'></div>
                <div className={style.container}>
                    <h2><FormattedMessage  id = 'aelf.NetworkCon01' defaultMessage = 'Current Wallet Service URL'/></h2>
                    <List className={'aelf-list'}>
                        <Item>
                            <div
                                onClick={
                                    () => prompt('', 'aelf.New Provider' , [{
                                        text: 'Cancel'
                                    }, {
                                        text: 'Submit',
                                        onPress: newProvider => this.setNewProvider(newProvider)
                                    }, ], 'default', '')
                                }>
                                { this.state.provider }
                            </div>
                        </Item>
                    </List>
                    <h3><FormattedMessage id = 'aelf.NetworkCon02' defaultMessage = 'What did the service provider do?' /></h3>
                    <p><FormattedMessage id = 'aelf.NetworkCon03' defaultMessage ='1.Broadcast your transaction when you transfer tokens to others.' /></p>
                    <p><FormattedMessage id = 'aelf.NetworkCon04' defaultMessage = '2.Provide information when you open the page which shows transaction detail.' /></p>
                    <h3><FormattedMessage id = 'aelf.NetworkCon05' defaultMessage = 'How to change the service provider?' /></h3>
                    <p><FormattedMessage id = 'aelf.NetworkCon06' defaultMessage = '1.Click the URL.' /></p>
                    <p><FormattedMessage id = 'aelf.NetworkCon07' defaultMessage = '2.Then, you can change it.' /></p>
                    <h3><FormattedMessage id = 'aelf.NetworkCon08' defaultMessage = 'Default provider is' /> </h3>
                    <h3>{ this.state.defaultProvider }</h3>
                </div>
            </div>
        );
    }
}

export default SystemSetting