import React, { Component } from 'react'
import { WhiteSpace } from 'antd-mobile'
import style from './Guide.scss'
import { hashHistory } from 'react-router'
import AelfButton from '../../../components/Button/Button'
import Svg from '../../../components/Svg/Svg'

import getPageContainerStyle from '../../../utils/getPageContainerStyle'

import { FormattedMessage } from 'react-intl'

// React component
class Guide extends Component {
    render() {

        let containerStyle = getPageContainerStyle();

        return (
            <div className={style.container} style={containerStyle}>
                <div className={style.top}>
                    <div className={style.blank}></div>
                    <Svg icon={'logo'} style={{height: 32, width: 104}}></Svg>
                    <p className={style.welcome}>Welcome</p>
                    <p className={style.wallet}>aelf.Wallet</p>
                    <p className={style.description}>offcial</p>
                </div>

                <div className={style.bottom}>
                    <AelfButton 
                        text='CreateWallets'
                        aelficon='add_purple20' 
                        onClick={() => hashHistory.push('/get-wallet/create')}>
                    </AelfButton>
                    <div className='aelf-blank12'></div>
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

export default Guide