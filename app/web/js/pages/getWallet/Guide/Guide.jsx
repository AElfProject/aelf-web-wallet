import React, { Component } from 'react'
import { WhiteSpace } from 'antd-mobile'
import style from './Guide.scss'
import { hashHistory } from 'react-router'
import AelfButton from '../../../components/Button/Button'
import Svg from '../../../components/Svg/Svg'

import getPageContainerStyle from '../../../utils/getPageContainerStyle'

// React component
class Guide extends Component {
    render() {

        let containerStyle = getPageContainerStyle();

        return (
            <div className={style.container} style={containerStyle}>
                <div className={style.top}>
                    <div className={style.blank}></div>
                    <Svg icon={'logo'} style={{height: 32, width: 104}}></Svg>
                    <p className={style.welcome}>欢迎使用</p>
                    <p className={style.wallet}>aelf.钱包</p>
                    <p className={style.description}>高性能、资源隔离、治理&发展</p>
                </div>

                <div className={style.bottom}>
                    <AelfButton text={'创建钱包'} aelficon='add_purple20' onClick={() => hashHistory.push('/get-wallet/create')}></AelfButton>
                    <div className='aelf-blank12'></div>
                    <AelfButton text={'导入钱包'} aelficon='in_white20' onClick={() => hashHistory.push('/get-wallet/import')}
                            style={{ border: '1px dashed #fff', backgroundColor: 'rgba(255, 255, 255, 0)', color: '#FFF' }}>
                    </AelfButton>
                </div>
            </div>
        );
    }
}

export default Guide