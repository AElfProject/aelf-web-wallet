/**
 * @file
 * @author huangzongzhe
 * 2018.07.26
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {ListView, PullToRefresh, Toast} from 'antd-mobile';
import {historyPush, historyReplace} from '../../utils/historyChange';
import addressOmit from '../../utils/addressOmit';
import addressPrefixSuffix from '../../utils/addressPrefixSuffix';
import {
    // checkStatus,
    getPageContainerStyle,
    clipboard,
    whetherBackupCheck
} from '../../utils/utils';
import {
    get
} from '../../utils/apisauce';

import {
    // SCROLLLIST,
    SCROLLFOOTER
} from '../../constants';
import style from './Assets.scss';

import BigNumber from 'bignumber.js';
import WalletUtil from "../../utils/Wallet/wallet";
// window.BigNumber = BigNumber;

require('./Assets.css');

const NUM_ROWS = 20;
let pageIndex = 0;

function getTokens(callback, pIndex = 0) {
    const walletUtilInstance = new WalletUtil();

    get('/address/api/tokens', {
        limit: NUM_ROWS, // 13
        page: pIndex, // 0
        order: 'desc', // asc
        address: walletUtilInstance.getLastUse().address
    }).then(result => {
        callback(result);
    }).catch(error => {
        Toast.fail(error.message, 6, () => { }, false);
    });
}

// React component
// TODO, 这里以后考虑使用ListView
// https://mobile.ant.design/components/list-view-cn/#components-list-view-demo-basic
export default class Assets extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            ELFValue: '-',
            tenderValue: '-'
        };

        this.renderRow = (rowData, sectionID, rowID) => {
            let item = this.rData[rowID];
            // let dir = `/assethome?contract_address=${item.contract_address}&token=${item.symbol}`;
            let dir = `/assethome?contract_address=${item.contract_address}&token=${item.token_name}`;

            // const balance = item.balance;
            let balance = (new BigNumber(item.balance)).div(Math.pow(10, item.decimals)).toFixed(2);

            // const balance = item.balance ? item.balance.toLocaleString() : 0;
            return (
                <div key={rowID}
                    className={style.txList}

                    onClick={() => historyPush(dir)}
                >
                    <div className={style.txListMask}/>
                    <div className={style.listLeft}>
                        {/*<div className={style.logoContainer}>*/}
                        {/*<img src="https://pbs.twimg.com/profile_images/933992260680552448/tkxR4vpn_400x400.jpg" alt=""/>*/}
                        {/*</div>*/}
                        <div>
                            <div className={style.name}>{item.token_name}</div>
                            {/*<div className={style.description}>subTitle</div>*/}
                        </div>
                    </div>
                    <div className={style.listRight}>
                        <div className={style.balance}>{balance}</div>
                        {/*<div className={style.tenderValuation}>≈法币价值</div>*/}
                    </div>

                    {/*<div className={style.tailContainer}>*/}
                    {/*<div className={style.tailLeft}></div>*/}
                    {/*<div className={style.tailRight}></div>*/}
                    {/*</div>*/}
                </div>
            );
        };
    }

    // PullToRefresh start
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        }
        else {
            document.body.style.overflow = 'hidden';
        }
    }

    getELFValue(result) {
        let ELFValue = new BigNumber(0);
        result.map(item => {
            // if (item.symbol === 'ELF') {
            if (item.token_name === 'ELF') {

                const balanceBigNumber = new BigNumber(item.balance);
                // ELFValue = ELFValue.plus(balanceBigNumber);
                ELFValue = ELFValue.plus(balanceBigNumber).div(Math.pow(10, item.decimals));
            }
            else {
                // TODO 首先得有对标的价值
            }
        });

        // get('https://min-api.cryptocompare.com/data/price?fsym=ELF&tsyms=USD').then(result => {
        get('/api/token/price?fsym=ELF&tsyms=USD').then(result => {
            const {USD} = result;

            const balanceBigNumber = new BigNumber(ELFValue.toString());
            const priceBigNumber = new BigNumber(USD);
            const tenderValue = balanceBigNumber.multipliedBy(priceBigNumber).toFixed(2)//.toString();

            // const tenderValue = (parseFloat(USD) * ELFValue).toLocaleString();
            this.setState({
                tenderValue
            });
        }).catch(error => {
            Toast.fail(error.message, 6, () => { }, false);
        });

        // return ELFValue.toLocaleString();
        return ELFValue.toFixed(2);
    }

    componentDidMount() {
        clipboard('#clipboard-assets');

        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

        getTokens(result => {
            this.rData = result;

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
                ELFValue: this.getELFValue(result)
            });
        });

        // 比如微信就会弹个底窗上来，就resize了
        window.onresize = () => {
          this.setState({
            assetsRandom: Math.random()
          });
        };
    }

    onRefresh(isSetState = true) {
        if (isSetState) {
            this.setState({
                refreshing: true,
                isLoading: true
            });
        } else {
            this.state.refreshing = true;
            this.state.isLoading = true;
        }

        getTokens(result => {
            this.rData = result;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
                ELFValue: this.getELFValue(result)
            });
        });
        pageIndex = 0;
    }

    onEndReached(event) {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        // console.log('onEndReached: ', this.state.isLoading, this.state.hasMore);
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        // console.log('reach end', event);
        this.setState({
            isLoading: true
        });

        getTokens(result => {
            this.rData = [...this.rData, ...result];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
                ELFValue: this.getELFValue(result)
            });
        }, ++pageIndex);
    }
    // PullToRefresh end

    componentWillUnmount() {
        this.WillUnmount = true;
        this.setState = () => { };
    }

    renderAddress() {
        if (whetherBackupCheck()) {
            const walletUtilInstance = new WalletUtil();
            const address = walletUtilInstance.getLastUse().address;

            let walletAddressShow = addressPrefixSuffix(addressOmit(address));
            let walletAddress = addressPrefixSuffix(address);
            return (
                <div className={style.addressContainer}>
                    <div className={style.addressSubTitle}>{walletAddressShow}</div>
                    <div
                        className={style.copyBtn}
                        onClick={() => {
                            let btn = document.getElementById('clipboard-assets');
                            btn.click();
                        }}
                    />

                    <button id="clipboard-assets"
                            data-clipboard-target="#assets-address-text"
                            className={style.textarea}>copy
                    </button>
                    <input id="assets-address-text"
                           type="text"
                           className={style.textarea}
                           value={walletAddress}
                           readOnly/>
                </div>
            );
        }
        else {
            return (
                <div className={style.addressContainer}>
                    <Link to={'/get-wallet/backup'}>Click to backup your wallet.</Link>
                </div>
            );
        }
    }

    // TODO: 刷新该页面，下拉，快去点击资产进入到交易列表页，会报错，有内存泄漏的可能。暂无思路。
    render() {
        // check
        const walletUtilInstance = new WalletUtil();
        let walletAddress = walletUtilInstance.getLastUse().address;
        if (this.walletAddressTemp && walletAddress !== this.walletAddressTemp) {
            this.onRefresh(false);
        }
        this.walletAddressTemp = walletAddress;
        // checked

        let pageContainerStyle = getPageContainerStyle(true);
        pageContainerStyle.height -= 90;

        let backgroundStyle = Object.assign({}, pageContainerStyle);
        backgroundStyle.height -= 14; // remove padding 7px * 2

        let containerStyle = Object.assign({}, backgroundStyle);
        containerStyle.height -= 2; // remove border 2px

        return (
            <div style={pageContainerStyle} className='asstes-container'>
                <div className={style.background} style={backgroundStyle}>
                    <div className={style.backgroundMask}/>
                    <div className={style.container} style={containerStyle}>
                        <div className={style.walletInfo}>
                            <div className={style.balance}>
                                <div className={style.aelfValuation}>{this.state.ELFValue}</div>
                                <div className={style.tenderValuation}>
                                    ≈{this.state.tenderValue}
                                    <span className={style.tenderUnit}> USD</span>
                                    <div
                                        className={style.addBtn}
                                        onClick={() => historyReplace('/addtoken')}
                                    />
                                </div>
                            </div>

                            {this.renderAddress()}

                        </div>

                        <div className={style.transactionList}>
                            <ListView
                                initialListSize={NUM_ROWS}
                                key={this.state.useBodyScroll ? '0' : '1'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}

                                renderFooter={() => SCROLLFOOTER(this.state.isLoading, this.state.hasMore)}

                                renderRow={this.renderRow}

                                useBodyScroll={this.state.useBodyScroll}
                                style={this.state.useBodyScroll ? {} : {
                                    // height: this.state.height - 100,
                                    height: '100%'
                                }}

                                pullToRefresh={<PullToRefresh
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.onRefresh()}
                                />}
                                onEndReached={() => this.onEndReached()}
                                pageSize={10}
                            />
                        </div>

                        {/*<div className={style.addBtnContainer}>*/}
                        {/*<div className={style.addBtn}></div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}
