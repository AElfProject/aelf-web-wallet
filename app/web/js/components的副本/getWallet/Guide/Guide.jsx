import React, { Component } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import style from './Guide.scss'
import { hashHistory } from 'react-router'
import Svg from '../../Svg/Svg'

// React component
class Guide extends Component {
  render() {
    return (
    	<div className={style.container}>
			<div className={style.top}>
                <div className={style.blank}></div>
                <Svg icon={'logo'} style={{height: 32, width: 104}}></Svg>
                <p className={style.welcome}>欢迎使用</p>
                <p className={style.wallet}>aelf.钱包</p>
                <p className={style.description}>高性能、资源隔离、治理&发展</p>
			</div>


			<div className={style.bottom}>
                <Button className={style.btn} onClick={() => hashHistory.push('/get-wallet/create')}>创建钱包 / Create</Button>
                <WhiteSpace/>
				<Button className={style.btn} onClick={() => hashHistory.push('/get-wallet/import')}>导入钱包 / Import</Button>
			</div>
    	</div>
    );
  }
}

export default Guide