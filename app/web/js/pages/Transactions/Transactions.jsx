/**
 *  @file
 *  @author zhouminghui
 *  2018.12.5
 *  updata
 *  2018.12.07 抽屉菜单高亮 从name修改为address控制
 */

import React from 'react';
import {hashHistory} from 'react-router';
import {FormattedMessage} from 'react-intl';

import {Drawer, NavBar, Icon, WhiteSpace} from 'antd-mobile';

import getPageContainerStyle from '../../utils/getPageContainerStyle';
import TransactionsContent from './TransactionsContent/TransactionsContent';
import SearchContent from './SearchContent/SearchContent';
import Search from './Search/Search';

import Svg from '../../components/Svg/Svg';

import style from './Transactions.scss';
import WalletUtil from "../../utils/Wallet/wallet";

require('./Transactions.css');


export default class Transactions extends React.Component {

    constructor(props) {
        super(props);
        const walletUtilInstance = new WalletUtil();
        let address = walletUtilInstance.getLastUse().address;
        this.state = {
            walletUtilInstance,
            open: false,
            walletAddress: address,
            searchValue: null,
            searchShow: false
        };
    }

    setValue(val) {
        this.setState({
            searchValue: val
        });
    }

    searchShow() {
        this.setState({
            searchShow: true
        });
    }

    searchHide() {
        this.setState({
            searchShow: false
        });
    }

    onOpenChange() {
        this.setState({
            open: !this.state.open
        });
    }

    goBack() {
        if (history.length === 1) {
            window.location.href = window.location.protocol + '//' + window.location.host;
            return;
        }
        hashHistory.goBack();
    }

    siderBarClick(walletInfo) {
        // local only, will not change extension/app
        const walletUtilInstance = new WalletUtil();
        walletUtilInstance.setLastUse(walletInfo.address, walletInfo.walletName);
        this.setState({
            // lastuse: lastuse,
            open: !this.state.open,
            walletAddress: walletInfo.address
        });

        // 艹，这代码好恶心。
        let targetPath = `/transactionslist?address=${walletInfo.address}`;
        let notSameWallet = !hashHistory.getCurrentLocation().pathname.match(targetPath);
        if (notSameWallet) {
            // historyReplace(targetPath);
            // setTimeout(() => {
            hashHistory.replace(window.location.hash.replace('#', ''));
            // }, 300);
        }

        this.searchHide();
    }

    getSideBar() {
        // (e) => this.siderbarClick(index, e) react的事件机制
        // https://doc.react-china.org/docs/handling-events.html
        // TODO, 从storage获取数据并拼接。
        const walletUtilInstance = new WalletUtil();
        let walletInfoList = walletUtilInstance.getWalletInfoListSync();
        let listItems = [];
        let walletInUse = walletUtilInstance.getLastUse().address;
        for (let address in walletInfoList) {
            let walletId = walletInfoList[address].walletId;
            let walletName = walletInfoList[address].walletName;
            let isSelected = walletId === walletInUse;
            listItems.push(
                (
                    <div
                        className={style.list + ' ' + (isSelected ? style.selected : '')}
                        key={address}
                        onClick={e => this.siderBarClick(walletInfoList[address], e)}
                    >
                        <div className={style.icon}/>
                        <div>{walletName}</div>
                    </div>
                )
            );
        }

        let listContainerStyle = getPageContainerStyle();
        listContainerStyle.height -= 112;

        return (
            <div className={style.sideContainer}>
                <div style={listContainerStyle}>
                    {listItems}
                </div>
                <div className={style.addWallet}
                    onClick={() => hashHistory.push('/get-wallet/guide')}
                >
                    {/*<div>扫一扫</div>*/}
                    <div className={style.addWalletIcon}></div>
                    <div
                    >
                        <FormattedMessage
                            id='aelf.Create'
                            defaultMessage='Create'
                        />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const sidebar = this.getSideBar();
        return (
            <div className='TransactionsNav' >
                <NavBar
                    mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={() => {
                        this.goBack();
                        this.SearchOnShow;
                    }
                    }
                    rightContent={[
                        <Svg key='1'
                            icon={'menu22'}
                            onClick={() => this.onOpenChange()}
                            style={{width: 22, height: 22}}
                        ></Svg>
                    ]}
                >
                    <FormattedMessage
                        id='aelf.Transaction List'
                        defaultMessage='Transaction List'
                    />
                </NavBar>
                <Search
                    address={this.state.walletAddress}
                    setValue={this.setValue.bind(this)}
                    searchShow={this.searchShow.bind(this)}
                    searchHide={this.searchHide.bind(this)}
                />
                <Drawer
                    position='right'
                    className='my-drawer'
                    style={{height: document.documentElement.clientHeight - 45 - 22 - 32}}
                    enableDragHandle
                    contentStyle={
                        {
                            color: '#A6A6A6',
                            textAlign: 'center',
                            padding: '11px 0px 50px 0px',
                            overflowX: 'hidden'
                        }
                    }
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={() => this.onOpenChange()}
                >
                    <WhiteSpace />
                    <TransactionsContent
                        address={this.state.walletAddress}
                        searchShow={this.state.searchShow}
                    />
                    <SearchContent
                        searchValue={this.state.searchValue}
                        searchShow={this.state.searchShow}
                        address={this.state.walletAddress}
                    />
                </Drawer>
            </div>
        );
    }
}
