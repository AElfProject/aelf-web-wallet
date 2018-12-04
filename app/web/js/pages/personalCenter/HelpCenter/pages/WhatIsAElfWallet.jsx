/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import NavNormal from '../../../NavNormal/NavNormal'
import style from './pages.scss'
import { FormattedMessage } from 'react-intl';
// React component
class WhatIsAElfWallet extends Component {
	render() {
		return (
			<div>
				<NavNormal></NavNormal>
				<div className={style.textContainer}>
					{/*<h2>AElf钱包是什么？</h2>*/}
					{/*<p>AElf钱包是一款全新的数字货币钱包，为用户提供更安全、高效、便捷的服务。</p>*/}
					{/*<p>AElf钱包支持AElf智能合约数字货币。/!*后续将支持更多主流数字货币。*!/</p>*/}
					{/*<p>目前暂不支持BTC和ETH，但是符合AElf标准的代币我们都支持。</p>*/}
                    <h2><FormattedMessage id = 'aelf.HelpTitle04' /></h2>
					<p><FormattedMessage id = 'aelf.walletCon01' /></p>
					<p><FormattedMessage id = 'aelf.walletCon02' /></p>
					<p><FormattedMessage id = 'aelf.walletCon03' /></p>
				</div>
			</div>
		);
	}
}

export default WhatIsAElfWallet;