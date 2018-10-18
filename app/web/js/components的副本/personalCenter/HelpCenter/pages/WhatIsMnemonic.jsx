/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import NavNormal from '../../../NavNormal/NavNormal'
import style from './pages.scss'
// React component
class WhatIsMnemonic extends Component {
	render() {
		return (
			<div>
				<NavNormal navTitle="帮助中心"></NavNormal>
				<div className={style.textContainer}>
					<h2>什么是助记词？</h2>
					<p>助记词相当于传统金融机构的银行卡+密码，请您务必妥善保存。助记词是明文私钥的另外一种表现形式，其目的是帮助用户记忆复杂的私钥（64位哈希值）。助记词一般由12、15、18、21个单词构成，这些单词都取自一个固定词库，其生成顺序也是按照一定的算法而来，助记词是未经加密的的私钥，任何人得到了你的助记词，就可以不费吹灰之力夺走你的资产。</p>
					<p>所以用户在备份助记词时一定要注意三点：</p>
					<p>1、尽可能采用物理介质，例如把助记词写在纸上，尽可能不要采用截屏或者拍照之后放在联网设备上，以防被黑客窃取。</p>
					<p>2、多次验证备份的助记词是否正确，一旦抄错一个字母或单词，那么将对后续找回正确的助记词带来巨大苦难。</p>
					<p>3、将备份后的助记词妥善保管，做好防盗防丢措施。</p>
				</div>
			</div>
		);
	}
}

export default WhatIsMnemonic;