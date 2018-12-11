/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import NavNormal from '../../../NavNormal/NavNormal'
import style from './pages.scss'
import { FormattedMessage } from 'react-intl';
// React component
class WhatIsPrivatePublicKey extends Component {
	render() {
		return (
			<div>
				<NavNormal></NavNormal>
				<div className={style.textContainer}>
					{/*<h2>什么是公钥私钥？</h2>*/}
					{/*<p>钱包中资金的控制取决于相应私钥的所有权和控制权。</p>*/}
					{/*<p>在区块链交易中，私钥用于生成支付货币所必须的签名，以证明资金的所有权。私钥必须始终保持机密，因为一旦泄露给第三方，相当于该私钥保护下的资产也拱手相让了。</p>*/}
					{/*<p>它不同于keystore，keystore是加密过后的私钥文件，只要密码强度足够强，即使黑客攻击，破译难度也很高。私钥实际上并不是存储在网络中，而是由用户生成并储存在一个文件或者简单的数据库中，称为钱包。用户的钱包地址就是由私钥通过椭圆曲线加密生成公钥，进而生成以0x开头的42位地址。</p>*/}
					{/*<p>私钥的样式为64位16进制哈希值字符串。</p>*/}
                    <h2><FormattedMessage id = 'aelf.HelpTitle03' /></h2>
                    <p><FormattedMessage id = 'aelf.publickeyCon01' /></p>
                    <p><FormattedMessage id = 'aelf.publickeyCon02' /></p>
					<p><FormattedMessage id = 'aelf.publickeyCon03' /></p>
					<p><FormattedMessage id = 'aelf.publickeyCon04' /></p>
					</div>
			</div>
		);
	}
}

export default WhatIsPrivatePublicKey;