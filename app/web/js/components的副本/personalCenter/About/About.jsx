import React, { Component } from 'react'
import { List } from 'antd-mobile'
import { hashHistory } from 'react-router'
import NavNormal from '../../NavNormal/NavNormal'
import Service from '../../getWallet/Agreement/Service'
import Privacy from '../../getWallet/Agreement/Privacy'
import style from './About.scss'

const Item = List.Item;
// React component
class About extends Component {
	render() {
		return (
			<div>
				<NavNormal navTitle="关于我们"></NavNormal>
				<div className="aelf-white-space"></div>
				<List>
	                <Item onClick={() => hashHistory.push('/personalcenter/about/service')}>使用协议</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/about/privacy')}>隐私条款</Item>
	            </List>

	            {/*<List>
	                <Item onClick={() => hashHistory.push('/')}>版本日志</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/')}>查看版本</Item>
	            </List>*/}
			</div>
		);
	}
}

export default About