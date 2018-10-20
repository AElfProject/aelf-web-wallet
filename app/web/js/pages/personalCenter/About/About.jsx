import React, { Component } from 'react'
import { List } from 'antd-mobile'
import { hashHistory } from 'react-router'
import NavNormal from '../../NavNormal/NavNormal'

import AelfList from '../../../components/List/List'
import NoticePanel from '../../../components/NoticePanel/NoticePanel'

import Service from '../../getWallet/Agreement/Service'
import Privacy from '../../getWallet/Agreement/Privacy'
import style from './About.scss'

const Item = List.Item;
// React component
class About extends Component {

    renderList () {
        let type = 'small';
        let lists = [
            {
                url: '/personalcenter/about/service',
                text: '使用协议',
                type: type
            },
            {
                url: '/personalcenter/about/privacy',
                text: '隐私条款',
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
                    mainTitle='关于我们'
                    iconHidden={true}
                ></NoticePanel>
                <div className='aelf-blank16'></div>
                {listHtml}
            </div>
        );
	}
}

export default About