/*
 * huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { WhiteSpace, ListView, PullToRefresh, Toast } from 'antd-mobile'

import style from './Assets.scss'
require('./Assets.css')

import { hashHistory } from 'react-router'

import initAelf from '../../utils/initAelf'
import hexToString from '../../utils/hexToString'
import { historyPush } from '../../utils/historyChange'
import checkStatus from '../../utils/checkStatus'
import walletStatusCheck from '../../utils/walletStatusCheck'
import getPageContainerStyle from '../../utils/getPageContainerStyle'

const NUM_ROWS = 20;
let pageIndex = 0;

function getTokens(callback, pIndex = 0) {
    let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
    // http://localhost:7000/block/api/address/tokens?address=0x040a221885855c22714e764f5a3de674554e

    let params = {
        limit: NUM_ROWS, // 13
        page: pIndex, // 0
        order: 'desc', // asc
        address: walletAddress // 0x04263089a3fd878482d81d5f54f6865260d6
    };

    let query = '';
    for (let each in params) {
        query += `${each}=${params[each]}&`;
    }

    fetch(`/block/api/address/tokens?${query}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(checkStatus).then(result => {
        result.text().then(result => {
            let output = JSON.parse(result);
            callback(output);
        });
    }).catch(error => {
        console.log('error:', error)
    });

}

// React component
// TODO, 这里以后考虑使用ListView
// https://mobile.ant.design/components/list-view-cn/#components-list-view-demo-basic
class Assets extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };

        let setStateTemp = this.setState;
    }

    // PullToRefresh start
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        
        getTokens(result => {
            this.rData = result;

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
            });
        });
    }

    onRefresh(isSetState = true) {
        // this.props.getBalanceAndTokenName();
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
            });
        });
        pageIndex = 0;
    };



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
            });
        }, ++pageIndex);
    };
    // PullToRefresh end

    componentWillUnmount() {
        this.WillUnmount = true;
        this.setState = () => {};
    }

    // TODO: 刷新该页面，下拉，快去点击资产进入到交易列表页，会报错，有内存泄漏的可能。暂无思路。
    render() {
        // check
        let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
        if (this.walletAddressTemp && walletAddress !== this.walletAddressTemp) {
            this.onRefresh(false);
        }
        this.walletAddressTemp = walletAddress;
        // checked

        const row = (rowData, sectionID, rowID) => {
            let item = this.rData[rowID];
            let dir = `/assethome?contract_address=${item.contract_address}`;
            return (
                <div key={rowID}
                    className={style.txList}

                    onClick={() => historyPush(dir)}
                >
                        <div className={style.txListMask}></div>
                        <div className={style.listLeft}>
                            {/*<div className={style.logoContainer}>*/}
                                {/*<img src="https://pbs.twimg.com/profile_images/933992260680552448/tkxR4vpn_400x400.jpg" alt=""/>*/}
                            {/*</div>*/}
                            <div>
                                <div className={style.name}>{item.name}</div>
                                {/*<div className={style.description}>subTitle</div>*/}
                            </div>
                        </div>
                        <div className={style.listRight}>
                            <div className={style.balance}>{item.balance}</div>
                            {/*<div className={style.tenderValuation}>≈法币价值</div>*/}
                        </div>

                    {/*<div className={style.tailContainer}>*/}
                        {/*<div className={style.tailLeft}></div>*/}
                        {/*<div className={style.tailRight}></div>*/}
                    {/*</div>*/}
                </div>
            );
        };
        // pull-to-refresh end

        let pageContainerStyle = getPageContainerStyle();
        pageContainerStyle.height -= 90;

        let backgroundStyle = Object.assign({}, pageContainerStyle);
        backgroundStyle.height -= 14; // remove padding 7px * 2

        let containerStyle = Object.assign({}, backgroundStyle)
        containerStyle.height -= 2; // remove border 2px

        return (
            <div style={pageContainerStyle} className='asstes-container'>
                <div className={style.background} style={backgroundStyle}>
                    <div className={style.backgroundMask}></div>
                    <div className={style.container} style={containerStyle}>
                        <div className={style.walletInfo}>
                            <div className={style.balance}>
                                <div className={style.aelfValuation}>99,999,999.99</div>
                                <div className={style.tenderValuation}>
                                    ≈999,999,999【暂无】
                                    <span className={style.tenderUnit}> CNY</span>
                                </div>
                            </div>

                            <div className={style.addressContainer}>
                                <div className={style.address}>{walletAddress.slice(0, 18) + '...'}</div>
                                <div className={style.copyBtn}></div>
                            </div>
                        </div>

                        <div className={style.transactionList}>
                            <ListView
                                initialListSize={NUM_ROWS}
                                key={this.state.useBodyScroll ? '0' : '1'}
                                ref={el => this.lv = el}
                                dataSource={this.state.dataSource}

                                renderFooter={() => (<div style={{ padding: 6, textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
                                    {this.state.isLoading ? 'Loading...' : (this.state.hasMore ? 'Loaded' : '没有更多记录了o((⊙﹏⊙))o')}
                                </div>)}

                                renderRow={row}

                                useBodyScroll={this.state.useBodyScroll}
                                style={this.state.useBodyScroll ? {} : {
                                    // height: this.state.height - 100,
                                    height: '100%',
                                    // background: '#FFF'
                                    // top nav 45px, bottom bar 50px, margin-top 5px; 合计 100px
                                    // border: '1px solid #ddd',
                                    // margin: '5px 0',
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

export default Assets