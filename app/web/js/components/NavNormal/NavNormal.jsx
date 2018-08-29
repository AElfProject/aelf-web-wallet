/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { hashHistory } from 'react-router'

require('./NavNormal.css');

class NavNormal extends Component {
	constructor(props) {
		super(props);
	}

	goBack() {
		hashHistory.goBack();
	}
	render() {
		return (
			<div>
				<NavBar 
					icon={<Icon type="left" />} 
					onLeftClick={() => this.goBack()}
					style={{position: 'fixed', top: '0px', left: '0px', width: '100%'}}>
					{this.props.navTitle}
				</NavBar>
				<div className="nav-normal-whitespace"></div>
			</div>
		);
	}
}

export default NavNormal