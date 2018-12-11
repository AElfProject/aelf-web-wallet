/**
 *  @file
 *  @author zhouminghui
 *  token  绑定与解绑 以及列表渲染
 */

/* eslint-disable new-cap */
/* eslint-disable fecs-camelcase */

import React from 'react';
import ReactDOM from 'react-dom';
import {PullToRefresh, ListView, List, Switch, Toast} from 'antd-mobile';

import bindToken from '../../../utils/bindToken';
import unbindToken from '../../../utils/unbindToken';
import contactMergeArr from '../../../utils/contactMergeArr';
import getContracts from '../../../utils/getContracts';
import getTokens from '../../../utils/getTokens';

require('./TokenList.css');

const NUM_ROWS = 20;
let pIndex = 0;

export default class TokenList extends React.Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            open: false,
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            tokenData: null,
            bindToken: null,
            compare: null
        };
    }

    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        getContracts(result => {
            this.rData = result.transactions;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
                tokenData: result.transactions,
                compare: Array(result.transactions.length)
            });
        }, pIndex, NUM_ROWS);

        getTokens(result => {
            this.setState({
                bindToken: result
            });

            let compare = null;
            if (this.state.tokenData !== null) {
                compare = contactMergeArr(this.state.tokenData, this.state.bindToken);
                this.setState({
                    compare
                });
            }
        });
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

        getContracts(result => {
            this.rData = result.transactions;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
                tokenData: result.transactions
            });
        }, pIndex = 0, NUM_ROWS);

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

        getContracts(result => {
            // 测试上千条数据
            // this.rData = [...this.rData, ...this.rData];
            this.rData = [...this.state.walletData, ...result.transactions];

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
                tokenData: this.rData
            });
        }, ++pIndex, NUM_ROWS);
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            let item = this.state.tokenData[rowID];
            let Tokenname = item.name;
            let Toeknaddress = item.contract_address;
            return (
                <div key={rowID}
                    className='addtoken-list-con'
                >
                    <List.Item
                        extra={<Switch
                            checked={this.state.compare[rowID]}
                            color='#AC00E6'
                            onChange={() => {
                                let compare = this.state.compare;
                                compare[rowID] = !compare[rowID];
                                this.setState({
                                    compare
                                });

                                let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
                                let address = JSON.parse(localStorage.lastuse).address;
                                let TokenMessage = {
                                    address: address,
                                    contract_address: Toeknaddress,
                                    signed_address: walletInfoList[address].signedAddress,
                                    public_key: walletInfoList[address].publicKey
                                };

                                if (compare[rowID]) {
                                    bindToken(TokenMessage, () => {
                                        Toast.success('bind Success', 3);
                                    });
                                }
                                else {
                                    unbindToken(TokenMessage, () => {
                                        Toast.success('unbind Success', 3);
                                    });
                                }
                            }}
                        />}
                    >
                        <div className='addtoken-list-tokenname' >{Tokenname}</div>
                        <div className='addtoken-list-name' >{Tokenname} Chain</div>
                        <div className='addtoken-list-tokenaddress' >{Toeknaddress}</div>
                    </List.Item>
                </div>
            );
        };

        return (
            <div className='transaction-list-container' >
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
