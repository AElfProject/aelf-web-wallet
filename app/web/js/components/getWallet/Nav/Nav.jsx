/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { hashHistory } from 'react-router'
// import style from './QRCode.scss'

class GetWalletsNav extends Component {
	render() {
		return (
			<div>
			<NavBar icon={<Icon type="left" />} onLeftClick={() => hashHistory.goBack()}
	        >Welcome To AELF</NavBar>
	        	{this.props.children}
			</div>
		);
	}
}

export default GetWalletsNav