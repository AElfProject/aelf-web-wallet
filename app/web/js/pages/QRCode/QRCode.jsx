/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'
import QRCode from 'qrcode.react'
import { Button } from 'antd-mobile'
import AelfButton from '../../components/Button/Button'
import NavNormal from '../NavNormal/NavNormal'

import style from './QRCode.scss'


import BackupNotice from '../BackupNotice/BackupNotice'
import clipboard from '../../utils/clipboard'
import getPageContainerStyle from '../../utils/getPageContainerStyle'

class QRCodeTemplate extends Component {

	componentDidMount() {
		clipboard('#clipboard-qrcode');
	}

	render() {

		let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
        let containerStyle = getPageContainerStyle();
        containerStyle.height -= 100;
		return (
			<div style={containerStyle} className={style.container}>
				<NavNormal></NavNormal>
				<BackupNotice />
				<div className={style.qrcodePanel}>
					<div className={style.titleContaienr}>
						<div className={style.title}>钱包收账</div>
                        <p className={style.subTitle}>{walletAddress}</p>
					</div>
                    {/*<p>qrcode</p>*/}
                    <QRCode value={walletAddress} className={style.qrcode}/>

                    <input id="qrcodetext"
                           type="text"
                           className={style.textarea}
                           value={walletAddress}
                           readOnly/>

                    {/*<p id="qrcodetext">{walletAddress}</p>*/}
					<AelfButton
                        onClick={() => {
                            let btn = document.getElementById('clipboard-qrcode');
                            btn.click();
                        }}
						text='点击复制地址'
					></AelfButton>

                    <button id="clipboard-qrcode" data-clipboard-target="#qrcodetext" style={{display: 'none'}}>copy</button>
				</div>
	    	</div>
		);
	}
}

export default QRCodeTemplate