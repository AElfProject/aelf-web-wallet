import React, { Component } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import style from './Guide.scss'
import { hashHistory } from 'react-router'

// React component
class Guide extends Component {
  render() {
    return (
    	<div className={style.center}>
	        <Button onClick={() => hashHistory.push('/get-wallet/create')}>创建钱包</Button>
	        <WhiteSpace/>
	        <Button onClick={() => hashHistory.push('/get-wallet/import')}>导入钱包</Button>
    	</div>
    );
  }
}

export default Guide