/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import style from './pages.scss'
import NavNormal from '../../../NavNormal/NavNormal'
import ServiceText from '../../../getWallet/Agreement/Service'
// React component
class Service extends Component {
	render() {
		return (
			<div>
				<NavNormal navTitle="使用协议"></NavNormal>
				<div className={style.textContainer}>
					<ServiceText></ServiceText>
				</div>
			</div>
		);
	}
}

export default Service;