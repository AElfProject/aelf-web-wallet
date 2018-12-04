/*
* 2018.11.23
* zhouminghui
*/

import React, {Component} from "react";
import ReactDOM from 'react-dom';

import { Drawer, NavBar, Icon, Toast, WhiteSpace, ListView } from 'antd-mobile';

import { hashHistory } from 'react-router';
import { historyReplace } from '../../../utils/historyChange';

import getPageContainerStyle from '../../../utils/getPageContainerStyle';

import TransactionsContent from '../TransactionsContent/TransactionsContent'
import SearchContent from '../SearchContent/SearchContent'

import Svg from '../../../components/Svg/Svg';
import Search from "../Search/Search"

import { FormattedMessage } from 'react-intl'

import style from "../Transactions.scss";

require("./TransactionsNav.css")


class TransactionsNav extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open:false,
            walletaddress:JSON.parse(localStorage.lastuse).address,
            SearchValue:null,
            SearchShow:false,
        }
    }

    setValue(val){
        this.setState({
            SearchValue:val
        })
    }

    SearchOnShow(){
        this.setState({
            SearchShow:true,
        })
    }

    SearchOnHide(){
        this.setState({
            SearchShow:false,
        })
    }

    onOpenChange() {
        this.setState({
            open: !this.state.open
        });
    }
    
    goBack() {
		if (history.length === 1) {
            window.location.href = window.location.protocol + '//'+ window.location.host;
			return;
		}
		hashHistory.goBack();
	}
    
    siderbarClick(walletInfo) {
        let lastuse = {
            address: walletInfo.address,
            walletName: walletInfo.walletName
        };
        localStorage.setItem('lastuse', JSON.stringify(lastuse));
        this.setState({
            // lastuse: lastuse,
            open: !this.state.open,
            walletaddress: walletInfo.address
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

        this.SearchOnHide();
    }
    
    getSideBar(){
        // (e) => this.siderbarClick(index, e) react的事件机制
        // https://doc.react-china.org/docs/handling-events.html
        // TODO, 从storage获取数据并拼接。
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let listItems = [];
        let walletInUse = JSON.parse(localStorage.getItem('lastuse')).walletName;
        for (let address in walletInfoList) {
            let walletName = walletInfoList[address].walletName;
            let isSelected = walletName === walletInUse;
            listItems.push(
                (
                    <div
                        className={style.list + ' ' + (isSelected ? style.selected : '')}
                        key={address}
                        onClick={(e) => this.siderbarClick(walletInfoList[address], e)}
                    >
                        <div className={style.icon}></div>
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
                            id = 'aelf.Create'
                            defaultMessage = 'Create'
                        />
                    </div>
                </div>
            </div>
        );
    
    }

    render(){
        const sidebar = this.getSideBar();

        return(
            <div className = "TransactionsNav" >
                <NavBar
                  mode="dark"
                  icon={<Icon type="left" />}
                  onLeftClick={() => {this.goBack();this.SearchOnShow}}
                  rightContent = {[
                      <Svg key="1"
                      	icon={'menu22'}
                      	onClick={() => this.onOpenChange()}
                      	style={{width: 22, height: 22}}
                      ></Svg>
                  ]}
                >
                    <FormattedMessage 
                        id = 'aelf.Transaction List'
                        defaultMessage = 'Transaction List'
                    />
                </NavBar>
                <Search 
                        address = {this.state.walletaddress} 
                        setValue = {this.setValue.bind(this)} 
                        SearchOnShow = {this.SearchOnShow.bind(this)}
                        SearchOnHide = {this.SearchOnHide.bind(this)}
                /> 
                <Drawer
                    position="right"
                    className='my-drawer'
                    style={{ height: document.documentElement.clientHeight - 45 - 22 - 32 }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center' , padding: '11px 0px 50px 0px', overflowX: 'hidden'}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={() => this.onOpenChange()}
                >
                    <WhiteSpace />
                    <TransactionsContent address = {this.state.walletaddress} ShowSearch = {this.state.SearchShow}  />
                    <SearchContent  SearchValue = {this.state.SearchValue} ShowSearch = {this.state.SearchShow} address={this.state.walletaddress} />
                </Drawer>
            </div>
        )
    }
}

export default TransactionsNav