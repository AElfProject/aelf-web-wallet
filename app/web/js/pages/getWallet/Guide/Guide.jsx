import React, { Component } from 'react'
import { WhiteSpace } from 'antd-mobile'
import style from './Guide.scss'
import { hashHistory } from 'react-router'
import AelfButton from '../../../components/Button/Button'
import Svg from '../../../components/Svg/Svg'

import getPageContainerStyle from '../../../utils/getPageContainerStyle'

import { FormattedMessage } from 'react-intl'

// React component
export default class Guide extends Component {
    render() {

        let containerStyle = getPageContainerStyle();

        return (
            <div className={style.container} style={containerStyle}>
                <div className={style.top}>
                    <div className={style.blank}/>
                    <Svg icon={'logo'} style={{height: 32, width: 104}}/>
                    <p className={style.welcome}>Welcome</p>
                    <p className={style.wallet}>aelf.Wallet</p>
                    <p className={style.description}>
                      <FormattedMessage id='aelf.Chain ID' />: {window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID}
                    </p>
                </div>

                <div className={style.bottom}>
                    <AelfButton
                        text='CreateWallets'
                        aelficon='add_purple20'
                        onClick={() => hashHistory.push('/get-wallet/create')}>
                    </AelfButton>
                    <div className='aelf-blank12'/>
                    <AelfButton
                        text='ImprotWallets'
                        aelficon='in_white20' onClick={() => hashHistory.push('/get-wallet/import')}
                        style={{ border: '1px dashed #fff', backgroundColor: 'rgba(255, 255, 255, 0)', color: '#FFF' }}>
                    </AelfButton>
                </div>
            </div>
        );
    }
}
