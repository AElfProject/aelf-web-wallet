import React, { Component } from 'react'
import { List } from 'antd-mobile'
import { hashHistory } from 'react-router'
import NavNormal from '../../NavNormal/NavNormal'

import AelfList from '../../../components/List/List'
import NoticePanel from '../../../components/NoticePanel/NoticePanel'

import Service from '../../getWallet/Agreement/Service'
import Privacy from '../../getWallet/Agreement/Privacy'
import style from './About.scss'

import { FormattedMessage } from 'react-intl'

const Item = List.Item;
// React component
class About extends Component {

    renderList () {
        let type = 'small';
        let lists = [
            {
                url: '/personalcenter/about/service',
                text: 'Use Agreement',
                type: type
            },
            {
                url: '/personalcenter/about/privacy',
                text: 'Privacy Policy',
                type: type
            }
        ];

        let listHtml = lists.map(item => {
            return <AelfList
                key={item.text}
                onClick={() => hashHistory.push(item.url)}
                text={<FormattedMessage id = {'aelf.' + item.text} />}
                type={item.type}
            />
        });

        return listHtml;
    }

	render() {
        let listHtml = this.renderList();
        return (
            <div className='aelf-personal-pages aelf-solid'>
                <NavNormal/>
                <div className='aelf-blank40'/>
                <NoticePanel
                    mainTitle={<FormattedMessage id = 'aelf.About AElf Official Wallet' />}
                    iconHidden={true}
                />
                <div className='aelf-blank16'/>
                {listHtml}
            </div>
        );
	}
}

export default About
