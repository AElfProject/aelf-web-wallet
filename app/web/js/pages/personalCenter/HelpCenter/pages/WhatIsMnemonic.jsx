/**
 * @file WhatisMnemonic.jsx
 * @author huangzongzhe
 * 2018.08.27
 */
import React, {Component} from 'react';
import NavNormal from '../../../NavNormal/NavNormal';
// import NoticePanel from '../../../../components/NoticePanel/NoticePanel';

import {FormattedMessage} from 'react-intl';
import getPageContainerStyle from '../../../../utils/getPageContainerStyle';

import style from './pages.scss';
// React component
export default class WhatIsMnemonic extends Component {
    render() {

        let containerStyle = getPageContainerStyle();

        return (
            <div>
                <NavNormal></NavNormal>
                <div style={containerStyle}>
                    <div className={style.textContainer}>
                        <h2><FormattedMessage id='aelf.HelpTitle01' /></h2>
                        <p><FormattedMessage id='aelf.mnemonicCon01' /></p>
                        <p><FormattedMessage id='aelf.mnemonicCon02' /></p>
                        <p><FormattedMessage id='aelf.mnemonicCon03' /></p>
                        <p><FormattedMessage id='aelf.mnemonicCon04' /></p>
                        <p><FormattedMessage id='aelf.mnemonicCon05' /></p>
                    </div>
                </div>
            </div>
        );
    }
}
