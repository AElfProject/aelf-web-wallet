/*
 * huangzongzhe
 * 2018.10.20
 */
import React, { Component } from 'react'

import { hashHistory } from 'react-router'

import Svg from '../../components/Svg/Svg'

import { historyPush } from '../../utils/historyChange'

import style from './BottomTabBar.scss'

class BottomTabBar extends Component {
    constructor() {
        super();

        this.state = {
            selectedTab: this.getSelected()
        };
    }

    getSelected () {
        let pathname = hashHistory.getCurrentLocation().pathname;
        let selectedTab = '';
        if (pathname.match(/\/personalcenter\/home/)) {
            selectedTab = 'my';
        } else if (pathname.match(/\/qrcode/)) {
            selectedTab = 'qrcode';
        } else {
            selectedTab = 'asset';
        }
        return selectedTab;
    }

    onPress(selected, dir) {
        this.setState({
            selectedTab: selected
        });
        historyPush(dir);
    }

    componentWillUpdate() {
        this.state.selectedTab = this.getSelected();
    }

    renderTab() {
        let tabInfo = [
            {
                id: 'asset',
                url: '/assets',
                text: '资产'
            },
            // {
            //     id: 'qrcode',
            //     url: '/qrcode',
            //     text: '二维码'
            // },
            {
                id: 'my',
                url: '/personalcenter/home',
                text: '我的'
            }
        ];

        let tabHtml = tabInfo.map(item => {
            let containerClass = style.tabContainer;
            if (this.state.selectedTab === item.id) {
                containerClass += ' ' + style.tabShow;
            }
            return (
              <div
                  className={containerClass}
                  key={item.id}
                  onClick={() => this.onPress(item.id, item.url)}
              >
                  <div className={style.icon + ' ' + style[item.id]}>
                  </div>
                  <div className={style.name}>{item.text}</div>
              </div>
            )
        });
        return tabHtml;
    }

    render() {
        let tabHtml = this.renderTab();
        return (
            <div>
                <div className={style.container}>
                    {tabHtml}
                </div>
            </div>
        );
    }
}

export default BottomTabBar
