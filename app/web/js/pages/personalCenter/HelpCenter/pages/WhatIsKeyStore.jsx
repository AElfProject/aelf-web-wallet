/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import NavNormal from '../../../NavNormal/NavNormal'
import NoticePanel from '../../../../components/NoticePanel/NoticePanel'

import getPageContainerStyle from '../../../../utils/getPageContainerStyle'

import { FormattedMessage } from 'react-intl'

import style from './pages.scss'
// React component
class WhatIsKeyStore extends Component {
	render() {

        let containerStyle = getPageContainerStyle();

		return (
			<div>
                <NavNormal></NavNormal>
                <div className={style.container} style={containerStyle}>
                    {/*<div className='aelf-blank40'> </div>*/}
                    {/*<NoticePanel*/}
                        {/*mainTitle='什么是keystore?'*/}
                        {/*iconHidden={true}*/}
                    {/*></NoticePanel>*/}

                    {/*<div className={style.textContainer}>*/}
                        {/*<h2>什么是公钥私钥？</h2>*/}
                        {/*<p>Keystore 文件是存储私钥的一种文件格式（JSON）。它使用用户自定义密码加密，以起到一定程度的保护作用，而保护的程度取决于用户加密该钱包的密码强度，如果类似于123456这样的密码，是极为不安全的。</p>*/}
                        {/*<p>所以用户在备份助记词时一定要注意三点：</p>*/}
                        {/*<p>1、使用不常用，并且尽可能复杂的密码加密Keystore文件。</p>*/}
                        {/*<p>2、一定要记住加密Keystore的密码，一旦忘记密码，那么你就失去了Keystore的使用权，并且aelf无法帮你找回密码。所以请妥善保管。</p>*/}
                        {/*<p>Keystore密码样式：</p>*/}
                        {/*<div className={style.dangerouslySetInnerHTML} dangerouslySetInnerHTML={{__html: `{'version':3,'id':'b7467fcb-3c8b-41be-bccf-73d43a08c1b7','address':'540f18196da5a533fa36577a81de55f0a2f4e751','Crypto':{'ciphertext':'78ed11b8b6bf29b00f52b42b8542df0e4a6ac078e626af7edcf885c3b68154a4','cipherparams':{'iv':'4516579601d96695fe30ace985a9066f'},'cipher':'aes-128-ctr','kdf':'scrypt','kdfparams':{'dklen':32,'salt':'6276cfda7d40872352c801db5871e5a3368a8d0994cea39ed936760db78d1cdc','n':1024,'r':8,'p':1},'mac':'d889a5dc609c3f312a41394cc47640676d2612501a6f8c837ed55598158336db'}}`}}></div>*/}
                    {/*</div>*/}
                    <div className={style.textContainer}>
                        <h2>
                            <FormattedMessage id = 'aelf.HelpTitle02' />
                        </h2>
                        <p><FormattedMessage id = 'aelf.keystoreCon01' /></p>
                        <p><FormattedMessage id = 'aelf.keystoreCon02' /></p>
                        <p><FormattedMessage id = 'aelf.keystoreCon03' /></p>
                        <p><FormattedMessage id = 'aelf.keystoreCon04' /></p>
                        <p><FormattedMessage id = 'aelf.keystoreCon05' /></p>
                        <div className={style.dangerouslySetInnerHTML} dangerouslySetInnerHTML={{__html: `{'version':3,'id':'b7467fcb-3c8b-41be-bccf-73d43a08c1b7','address':'540f18196da5a533fa36577a81de55f0a2f4e751','Crypto':{'ciphertext':'78ed11b8b6bf29b00f52b42b8542df0e4a6ac078e626af7edcf885c3b68154a4','cipherparams':{'iv':'4516579601d96695fe30ace985a9066f'},'cipher':'aes-128-ctr','kdf':'scrypt','kdfparams':{'dklen':32,'salt':'6276cfda7d40872352c801db5871e5a3368a8d0994cea39ed936760db78d1cdc','n':1024,'r':8,'p':1},'mac':'d889a5dc609c3f312a41394cc47640676d2612501a6f8c837ed55598158336db'}}`}}></div>
                    </div>
                </div>
			</div>

		);
	}
}

export default WhatIsKeyStore;