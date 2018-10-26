/*
 * huangzongzhe
 * 2018.09.01
 * 非导入的钱包，如果没有备份，将强制提示备份。(一个包含回退按钮的弹窗)
 */
import React, { Component } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import { hashHistory } from 'react-router'
import style from './BackupNotice.scss'

import NavNormal from './../NavNormal/NavNormal'

import AelfButton from './../../components/Button/Button'

class BackupNotice extends Component {
	needBackup () {
		let walletId = JSON.parse(localStorage.getItem('lastuse')).address;
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletInfo = walletInfoList[walletId];

        return walletInfo.hasBackup === undefined
        	? false : !walletInfo.hasBackup;
	}

	render() {
		let needBackup = this.needBackup();

		let html = '';
		if (needBackup) {
			// html =
			// 	<div className={style.container}>
			// 		<div className={style.notice}>
			// 			<h3>注意!请立即备份钱包</h3>
			// 			<div>
			// 				<p>aelf在此提示您，区块链钱包不同于传统网站账户，它是基于密码学的去中心化账户系统。</p>
			// 				<p>你必须保存好钱包和私钥和交易密码，任何意外发生将导致资产丢失。</p>
			// 				<p>aelf提示您做好备份，在进行小额交易测试后，再开启使用之旅。</p>
			// 			</div>
			// 			<div>备份助记词在您丢失钱包或忘记密码时，能帮助您恢复钱包。</div>
            //
			// 			<WhiteSpace />
			// 			<Button onClick={() => hashHistory.push('/get-wallet/backup')}>立即备份助记词</Button>
			// 			<WhiteSpace />
			// 			<Button onClick={() => hashHistory.push('/assets')}>返回首页</Button>
			// 		</div>
			// 	</div>;


            html =
                <div className={style.container}>
                    <NavNormal></NavNormal>
					<div className={style.panel}>
                        <div className={style.titleContaienr}>
                            <div className={style.title}></div>
                            <div className={style.subTitle}>注意!请立即备份钱包</div>
                        </div>
                        <div className={style.content}>
                            <div className={style.normal}>
                                <p>aelf在此提示您，区块链钱包不同于传统网站账户，它是基于密码学的去中心化账户系统。</p>
                                <p>你必须保存好钱包和私钥和交易密码，任何意外发生将导致资产丢失。</p>
                                <p>aelf提示您做好备份，在进行小额交易测试后，再开启使用之旅。</p>
                            </div>
                            <div className={style.important}>备份助记词在您丢失钱包或忘记密码时，能帮助您恢复钱包。</div>
                        </div>

                        <AelfButton
							type='blue'
							className={style.button}
                            onClick={() => hashHistory.push('/get-wallet/backup')}
                        >立即备份助记词</AelfButton>
                        <WhiteSpace />

					</div>
                </div>
        }

		return (
			<div>
			    {html}
			</div>
		);
	}
}

export default BackupNotice