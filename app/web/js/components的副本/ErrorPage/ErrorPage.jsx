import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { hashHistory } from 'react-router'

// TODO: 错误页通用化
class ErrorPage extends Component {
	render() {
		return (
			<div>
			    <h1>
			        error page
			    </h1>
			    <p> cannot connect chain </p>
				<Button onClick={() => hashHistory.push('/assets')}>返回首页</Button>
			</div>
		);
	}
}

export default ErrorPage