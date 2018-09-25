/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'
import QRCode from 'qrcode.react'
import { Button } from 'antd-mobile'
import style from './QRCode.scss'

import BackupNotice from '../BackupNotice/BackupNotice'
import clipboard from '../../utils/clipboard'

class QRCodeTemplate extends Component {
	constructor () {
		super();
		clipboard('.clipboard-qrcode');
	}

	render() {

		let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;

		return (
			<div>
				<BackupNotice />
				<p>qrcode</p>
				<QRCode value={walletAddress} />

				<input id="qrcodetext" 
					type="text" 
					className={style.textarea} 
					value={walletAddress}
					readOnly/>

				<p id="qrcodetext">{walletAddress}</p>
				<Button data-clipboard-target="#qrcodetext"
                	id="clipboard-qrcode"
                	className="clipboard-qrcode"
                >复制地址</Button>
	    	</div>
		);
	}
}

export default QRCodeTemplate