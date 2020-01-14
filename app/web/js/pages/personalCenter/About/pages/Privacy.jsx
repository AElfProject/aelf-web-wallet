/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import style from './pages.scss'
import NavNormal from '../../../NavNormal/NavNormal'
import PrivacyText from '../../../getWallet/Agreement/Privacy'
import PrivacyTextZh from '../../../getWallet/Agreement/Privacy_zh'

import getPageContainerStyle from '../../../../utils/getPageContainerStyle'

// React component
class Privacy extends Component {
	render() {

        let containerStyle = getPageContainerStyle();

		return (
			<div>
				<NavNormal navTitle="Privacy Policy"></NavNormal>
				<div className={style.textContainer} style={containerStyle}>
					{localStorage.language === 'zh-CN' ? <PrivacyTextZh/> : <PrivacyText/>}
				</div>
			</div>
		);
	}
}

export default Privacy;
