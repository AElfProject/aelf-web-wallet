/*
 * huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { PullToRefresh, ListView } from 'antd-mobile'

import style from './TransactionsList.scss'
require('./TransactionsList.css')

import { hashHistory } from 'react-router'

import checkStatus from '../../../utils/checkStatus'
import addressOmit from '../../../utils/addressOmit'
import getParam from '../../../utils/getParam'

const NUM_ROWS = 20;
let pageIndex = 0;

function getTxs (callback, pIndex = 0) {

    let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;

    let params = {
        limit: NUM_ROWS, // 13
        page: pIndex, // 0
        order: 'desc', // asc
        address: walletAddress, // 0x04263089a3fd878482d81d5f54f6865260d6
        contract_address: getParam('contract_address', window.location.href)
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

            let length = output.total;
            let transactions = output.transactions;

            callback(output);
        })
    }).catch(error => {
        console.log('error:', error);
    });
}

class TransactionsList extends Component {
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

        this.walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
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

        getTxs(result => {
            this.rData = result.transactions;

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
            });
        });
    }

    onRefresh() {

        this.props.getBalanceAndTokenName();

        this.setState({
            refreshing: true,
            isLoading: true
        });

        getTxs(result => {
            this.rData = result.transactions;
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

        getTxs(result => {
            this.rData = [...this.rData, ...result.transactions];
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

    render() {
        const row = (rowData, sectionID, rowID) => {
            let item = this.rData[rowID];
            let isIncome = item.params_to === this.walletAddress ? true : false;

            let quantity = (isIncome ? '+' : '-') + item.quantity;
            let iconClass = style.icon + ' ' + (isIncome ? style.iconIn : '');

            let address = isIncome ? item.address_from : item.params_to;
            let status = item.tx_status;

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
                            {/*<div className={style.time}>2018-09-08</div>*/}
                        </div>
                    </div>
                    <div className={style.rightContainer}>
                        <div className={style.balance}>{quantity} {status}</div>
                        {/*<div className={style.tenderValuation}>法币价值</div>*/}
                    </div>
                </div>
            );
        };

        // pull-to-refresh end

        return (
            <div className={style.transactionContainer + ' ' + 'transaction-list-container'}>
                <ListView
                    initialListSize={NUM_ROWS}
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}

                    renderFooter={() => (<div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
                        {this.state.isLoading ? 'Loading...' : (this.state.hasMore ? 'Loaded' : '没有更多记录了o((⊙﹏⊙))o')}
                    </div>)}

                    renderRow={row}

                    useBodyScroll={this.state.useBodyScroll}
                    style={this.state.useBodyScroll ? {} : {
                        height: '100%',
                        margin: '5px 0',
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

export default TransactionsList;