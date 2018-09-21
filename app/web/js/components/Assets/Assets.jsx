/*
 * huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { WhiteSpace, ListView, PullToRefresh, Toast } from 'antd-mobile'
import style from './Assets.scss'
import { hashHistory } from 'react-router'

import initAelf from '../../utils/initAelf'
import hexToString from '../../utils/hexToString'
import { historyPush } from '../../utils/historyChange'
import checkStatus from '../../utils/checkStatus'

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

    onRefresh() {
        // this.props.getBalanceAndTokenName();

        this.setState({
            refreshing: true,
            isLoading: true
        });

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
  
    render() {
        const row = (rowData, sectionID, rowID) => {
            let item = this.rData[rowID];
            let dir = `/assethome?contract_address=${item.contract_address}`;
            return (
                <div key={rowID}
                    className={style.txList}
                    style={{
                        margin: '0 15px',
                        backgroundColor: 'white',
                    }}
                    onClick={() => historyPush(dir)}
                >
                        <div>{item.name}</div>
                        <div>{item.balance}</div>

                </div>
            );
        };
        // pull-to-refresh end

        return (
            <div>
                <ListView
                    initialListSize={NUM_ROWS} 
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                   
                    renderFooter={() => (<div style={{ padding: 6, textAlign: 'center' }}>
                      {this.state.isLoading ? 'Loading...' : (this.state.hasMore ? 'Loaded' : '没有更多记录了o((⊙﹏⊙))o')}
                    </div>)}

                    renderRow={row}

                    useBodyScroll={this.state.useBodyScroll}
                    style={this.state.useBodyScroll ? {} : {
                      height: this.state.height - 100,
                      // top nav 45px, bottom bar 50px, margin-top 5px; 合计 100px
                      // border: '1px solid #ddd',
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

export default Assets