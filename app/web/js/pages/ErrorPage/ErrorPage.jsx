import React, { Component } from 'react'
import { hashHistory } from 'react-router'

import AelfButton from '../../components/Button/Button'


import style from './ErrorPage.scss'

// TODO: 错误页通用化
class ErrorPage extends Component {
	render() {
		return (
			<div className={style.contaienr}>
                <div className={style.error}>
                    <h1>
                        error page
                    </h1>
                    <p> cannot connect chain </p>
                </div>

                <AelfButton
                    style={{
                        margin: '0 24px 50px 24px'
                    }}
                    onClick={() => hashHistory.push('/assets')}
                >Back Home</AelfButton>
			</div>
		);
	}
}

export default ErrorPage 