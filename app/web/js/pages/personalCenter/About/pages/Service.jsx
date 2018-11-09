/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import style from './pages.scss'
import NavNormal from '../../../NavNormal/NavNormal'
import ServiceText from '../../../getWallet/Agreement/Service'

import getPageContainerStyle from '../../../../utils/getPageContainerStyle'

// React component
class Service extends Component {

	render() {

        let containerStyle = getPageContainerStyle();

		return (
			<div>
				<NavNormal navTitle="Terms of Service"></NavNormal>
				<div className={style.textContainer} style={containerStyle}>
					<ServiceText></ServiceText>
				</div>
			</div>
		);
	}
}

export default Service;