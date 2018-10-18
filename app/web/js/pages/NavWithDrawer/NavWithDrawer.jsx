/*
 * huangzongzhe
 * 2018.08.30
 */
import React, {
    Component
} from 'react'
import { Drawer, List, NavBar, Icon, WhiteSpace, Toast } from 'antd-mobile';
import { hashHistory } from 'react-router'

import Svg from '../../components/Svg/Svg'

import { historyGoBack, historyReplace } from '../../utils/historyChange'

// require('./NavWithDrawer.css'); // 样式调整在HomePage/HomePage.css中

class NavWithDrawer extends Component {
    constructor(props) {
        super(props);
        if (typeof this.props.onLeftClick === 'function') {
            this.onLeftClick = this.props.onLeftClick;
        }
        this.state = {
            open: false,
            walletInUseName: '',
            hidden: true
        };
    }

    onOpenChange() {
        this.setState({
            open: !this.state.open
        });
    }

    siderbarClick(walletInfo) {
        let lastuse = {
            address: walletInfo.address,
            walletName: walletInfo.walletName
        };
        localStorage.setItem('lastuse', JSON.stringify(lastuse));
        this.setState({
            // lastuse: lastuse,
            open: !this.state.open
        });

        // 艹，这代码好恶心。
        let targetPath = `/assets?address=${walletInfo.address}`;
        let notSameWallet = !hashHistory.getCurrentLocation().pathname.match(targetPath);
        if (notSameWallet) {
            // historyReplace(targetPath);
            // setTimeout(() => {
            hashHistory.replace(window.location.hash.replace('#', ''));
            // }, 300);
        }
    }

    getSideBar() {
        // (e) => this.siderbarClick(index, e) react的事件机制
        // https://doc.react-china.org/docs/handling-events.html
        // TODO, 从storage获取数据并拼接。
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let listItems = [];
        for (let address in walletInfoList) {
            listItems.push(
                (
                    <List.Item key={address}
                               multipleLine
                               onClick={(e) => this.siderbarClick(walletInfoList[address], e)}
                    >{walletInfoList[address].walletName}</List.Item>
                )
            );
        }
        listItems.push(
            (
                <List.Item key='getWallet'
                           multipleLine
                           className='get-wallet'
                           onClick={() => hashHistory.push('/get-wallet/guide')}
                > + </List.Item>
            )
        );
        return (
            <List>
                {listItems}
            </List>
        );
    }

    componentDidUpdate() {
        Toast.hide();
    }

    onLeftClick() {
        historyGoBack();
    }

    render() {
        // fix in codepen
        const sidebar = this.getSideBar();

        const lastuse = localStorage.getItem('lastuse');
        const walletInUseName = lastuse ? JSON.parse(localStorage.getItem('lastuse')).walletName : '请选择钱包';

        let showLeftClick = this.props.showLeftClick;

        // let showQrcode = this.props.showQrcode;
        //
		// let qrcodeIcon =
		// 	<Svg
		// 		icon={'qrcode22'}
		// 		onClick={() => {
		// 			hashHistory.push('/qrcode');
		// 		}}
		// 	></Svg>

        return (
            <div style={{ height: '100%' }}>
                <NavBar icon={showLeftClick ? <Icon type="left" /> : ''}
                        onLeftClick={showLeftClick ? () => this.onLeftClick() : () => {}}
                        rightContent={[
                            <Svg key="1"
								 icon={'menu22'}
								 onClick={() => this.onOpenChange()}
								 style={{width: 22, height: 22}}
							></Svg>
							// <div key="2">Test</div>,

                        ]}
                >{walletInUseName}</NavBar>
                <Drawer
                    position="right"
                    className='my-drawer'
                    style={{ height: document.documentElement.clientHeight - 45 - 22 }}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center' , padding: '11px 0px 50px 0px', overflowX: 'hidden'}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={() => this.onOpenChange()}
                >
                    {this.props.children}
                </Drawer>
            </div>
        );
    }
}

export default NavWithDrawer