/*
 * huangzongzhe
 * 2018.08.20
 */
import React, {
	Component
} from 'react'

import { List } from 'antd-mobile'
import { hashHistory } from 'react-router'
import NavNormal from '../../NavNormal/NavNormal'

import AelfList from '../../../components/List/List'
import NoticePanel from '../../../components/NoticePanel/NoticePanel'

const Item = List.Item;
class HelpCenter extends Component {
	renderList () {
		let type = 'small';
		let lists = [
            {
                url: '/personalcenter/whatismnemonic',
                text: 'What is a mnemonic?',
                // text: '什么是助记词',
                type: type
            },
            {
                url: '/personalcenter/whatiskeystore',
                text: 'What is a keystore?',
                //     text: '什么是keyStore',
                type: type
            },
            {
                url: '/personalcenter/whatisprivatepublickey',
                text: 'What are public key and private key?',
                //     text: '什么是公钥私钥',
                type: type
            },
            {
                url: '/personalcenter/whatisaelfwallet',
                text: 'What is the AElf Wallet?',
                //     text: 'AElf钱包介绍',
                type: type
            },
            {
                url: '/personalcenter/howtochangepassword',
                text: 'How to change the password? ',
                //     text: '如何修改密码？忘记密码怎么办？',
                type: type
            },
            {
                url: '/personalcenter/forget',
                text: 'What if I forget my password?',
                type: type
            }
		];

		let listHtml = lists.map(item => {
			return <AelfList
				key={item.text}
                onClick={() => hashHistory.push(item.url)}
                text={item.text}
                type={item.type}
            ></AelfList>
		});

		return listHtml;
	}

	render() {
		let listHtml = this.renderList();
		return (
			<div className='aelf-personal-pages aelf-solid'>
				<NavNormal></NavNormal>
				<div className='aelf-blank40'></div>
                <NoticePanel
                    mainTitle='Help Center'
                    iconHidden={true}
                ></NoticePanel>
                <div className='aelf-blank16'></div>
				{listHtml}
			</div>
		);
	}
}

export default HelpCenter