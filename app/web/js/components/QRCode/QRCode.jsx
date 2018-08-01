/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'
import QRCode from 'qrcode.react'
import { Button, Toast } from 'antd-mobile'
import style from './QRCode.scss'

class QRCodeTemplate extends Component {
	copy() {
		let id = document.getElementById('qrcodetext');
		id.select();
		document.execCommand("Copy");
		Toast.info('已复制');
	}

	render() {

		let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;

		return (
			<div>
				<p>qrcode</p>
				<QRCode value={walletAddress} />
				<textarea id="qrcodetext"
					className={style.textarea}
					defaultValue={walletAddress}>
				</textarea>
				<p id="qrcodetext">{walletAddress}</p>
				<Button
                	onClick={() => this.copy()}
                >复制地址</Button>
	    	</div>
		);
	}
}

export default QRCodeTemplate