/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import style from './pages.scss'
import NavNormal from '../../../NavNormal/NavNormal'
import PrivacyText from '../../../getWallet/Agreement/Privacy'

import getPageContainerStyle from '../../../../utils/getPageContainerStyle'

// React component
class Privacy extends Component {
	render() {

        let containerStyle = getPageContainerStyle();

		return (
			<div>
				<NavNormal navTitle="隐私条款"></NavNormal>
				<div className={style.textContainer} style={containerStyle}>
					<PrivacyText></PrivacyText>
				</div>
			</div>
		);
	}
}

export default Privacy;