/**
* @file
* @author huangzongzhe
* 增加了国际化
*/



import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {FormattedMessage} from 'react-intl';

import AelfButton from '../../components/Button/Button';

import style from './ErrorPage.scss';

// TODO: 错误页通用化
export default class ErrorPage extends Component {
    render() {
        return (
            <div className={style.contaienr}>
                <div className={style.error}>
                    <h1>
                        <FormattedMessage
                            id='aelf.error page'
                        />
                    </h1>
                    <p>
                        <FormattedMessage
                            id='aelf.cannot connect chain'
                        /> </p>
                </div>

                <AelfButton
                    style={{
                        margin: '0 24px 50px 24px'
                    }}
                    onClick={() => hashHistory.push('/assets')}
                    text='Back Home'
                ></AelfButton>
            </div>
        );
    }
}
