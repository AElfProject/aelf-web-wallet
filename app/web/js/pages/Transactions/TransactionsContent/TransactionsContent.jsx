/**
 *  @file
 *  @author zhouminghui
 *  2018.12.5
 *  整理页面可读性
 *  NUM_ROWS 显示行数
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {PullToRefresh, ListView} from 'antd-mobile';

import checkStatus from '../../../utils/checkStatus';
import addressOmit from '../../../utils/addressOmit';
import {hashHistory} from 'react-router';

import style from './TransactionsContent.scss';

// 交易失败 失败的交易不会上链
// 偶发  列表下拉后数据无法切换  刷新即可切换  待查看原因 【已修复】

let pageIndex = 0;
const NUM_ROWS = 20;

function getTxs(callback, walletAddress, pageIndex) {
    let params = {
        limit: NUM_ROWS, // 13
        page: pageIndex, // 0
        order: 'desc', // asc
        address: walletAddress
    };

    let query = '';
    for (let each in params) {
        query += `${each}=${params[each]}&`;
    }

    fetch(`/block/api/address/transactions?${query}`, {
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
        console.log('error:', error);
    });
}

export default class TransactionsContent extends React.Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.hide = {
            display: 'none'
        };

        this.show = {
            display: 'block'
        };

        this.state = {
            open: false,
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            SearchShow: null,
            walletAddress: this.props.address,
            walletData: null
        };
    }

    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        }
        else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.address !== this.props.address) {
            this.setState({
                walletAddress: nextProps.address
            });
            const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
            getTxs(result => {
                this.rData = result.transactions;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    height: hei,
                    refreshing: false,
                    isLoading: false,
                    walletData: result.transactions
                });
            }, nextProps.address, pageIndex);
        }

        if (nextProps.searchShow !== this.props.searchShow) {
            this.setState({
                SearchShow: nextProps.searchShow
            });
        }
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        pageIndex = 0;
        getTxs(result => {
            this.rData = result.transactions;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
                walletData: result.transactions
            });
        }, this.state.walletAddress, pageIndex);

    }

    componentWillUnmount() {
        this.setState = function () {};
    }

    onRefresh() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            refreshing: true,
            isLoading: true
        });

        getTxs(result => {
            this.rData = result.transactions;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
                walletData: result.transactions
            });
        }, this.state.walletAddress, pageIndex);
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

        getTxs(result => {
            // 测试上千条数据
            // this.rData = [...this.rData, ...this.rData];
            this.rData = [...this.state.walletData, ...result.transactions];

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
                walletData: this.rData
            });
        }, this.state.walletAddress, ++pageIndex);
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            let item = this.state.walletData[rowID];
            let isIncome = item.params_to === this.state.walletAddress ? true : false;
            let quantity = item.quantity;
            let iconClass = style.icon + ' ' + (isIncome ? style.iconIn : '');
            let address = isIncome ? item.address_from : item.params_to;
            address = addressOmit(address);

            return (
                <div key={rowID}
                     className={style.txList}
                     onClick={() => hashHistory.push(`/transactiondetail?txid=${item.tx_id}`)}
                >
                    <div className={style.leftContainer}>
                        <div className={iconClass}>
                        </div>
                        <div>
                            <div className={style.address}>
                                {address}
                            </div>
                            {/* <div className={style.time}>2018-09-08</div> */}
                            {/* <div className = {style.defeated} >交易失败</div> */}
                        </div>
                    </div>
                    <div className={style.rightContainer}>
                        <div className={style.balance}>{quantity}</div>
                        {/* <div className={style.tenderValuation}>≈</div> */}
                    </div>
                </div>
            );

        };

        return (
            <div
                className={style.transactionContainer + ' ' + 'transaction-list-container'}
                style = {this.state.SearchShow ? this.hide : this.show}
            >
                <ListView
                    initialListSize={NUM_ROWS}
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    useBodyScroll={this.state.useBodyScroll}
                    style={this.state.useBodyScroll ? {} : {
                        height: '100%',
                        margin: '5px 0'
                    }}

                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                    />}
                    onEndReached={() => this.onEndReached()}
                    pageSize={10}
                />
            </div>
        );
    }

}
