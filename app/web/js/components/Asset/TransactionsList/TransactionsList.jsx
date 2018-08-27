/*
 * huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { PullToRefresh, ListView } from 'antd-mobile'

import style from './TransactionsList.scss'
import { hashHistory } from 'react-router'

import checkStatus from '../../../utils/checkStatus'
import addressOmit from '../../../utils/addressOmit'

const NUM_ROWS = 10;
let pageIndex = 0;

function getTxs (callback, pIndex = 0) {

    let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;

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

    render() {
        const row = (rowData, sectionID, rowID) => {
            let item = this.rData[rowID];
            let isIncome = item.params_to === this.walletAddress ? true : false;
            let quantity = (isIncome ? '+' : '-') + item.quantity;
            let address = isIncome ? item.address_from : item.params_to;

            address = addressOmit(address);

            return (
                <div key={rowID}
                    className={style.txList}
                    style={{
                        margin: '0 15px',
                        backgroundColor: 'white',
                    }}
                    onClick={() => hashHistory.push(`/transactiondetail?txid=${item.tx_id}`)}
                >
                    <div>
                        <div className={style.address}>{address}</div>
                        <div className={style.quantity}>{quantity} </div>
                    </div>
                </div>
            );
        };
        // pull-to-refresh end

        return (
            <div>
                <ListView
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                   
                    renderFooter={() => (<div style={{ padding: 6, textAlign: 'center' }}>
                      {this.state.isLoading ? 'Loading...' : (this.state.hasMore ? 'Loaded' : '没有更多记录了o((⊙﹏⊙))o')}
                    </div>)}

                    renderRow={row}

                    useBodyScroll={this.state.useBodyScroll}
                    style={this.state.useBodyScroll ? {} : {
                      height: this.state.height - 150,
                      // border: '1px solid #ddd',
                      margin: '5px 0',
                    }}

                    pullToRefresh={<PullToRefresh
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />}
                    onEndReached={() => this.onEndReached()}
                    pageSize={5}
                />
            </div>
        );
    }
}

export default TransactionsList;