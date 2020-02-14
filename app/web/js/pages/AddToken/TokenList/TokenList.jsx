/**
 * @file
 * @author zhouminghui
 * token  绑定与解绑 以及列表渲染
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {PullToRefresh, ListView, List, Switch, Toast} from 'antd-mobile';

import bindToken from '../../../utils/bindToken';
import unbindToken from '../../../utils/unbindToken';
import contractMergeArr from '../../../utils/contractMergeArr';
import getContracts from '../../../utils/getContracts';
import getTokens from '../../../utils/getTokens';
import {SCROLLFOOTER} from '../../../constants';

require('./TokenList.css');

const NUM_ROWS = 20;
let pIndex = 0;

export default class TokenList extends React.Component {
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
            tokenData: null,
            bindToken: null,
            compare: null,
            searchShow: this.props.searchShow
        };

        pIndex = 0;
    }

    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        }
        else {
            document.body.style.overflow = 'hidden';
        }
    }

    getTokenList() {
        return new Promise((resolve, reject) => {
            getContracts(result => {
                resolve(result.transactions);
            }, pIndex, NUM_ROWS);
        });
    }

    getBindTokenList() {
        return new Promise((resolve, reject) => {
            getTokens(result => {
                resolve(result);
            });
        });
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        Promise.all([this.getTokenList(), this.getBindTokenList()]).then(value => {
            this.rData = value[0];
            this.tData = value[1];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
                height: hei,
                tokenData: this.rData,
                bindToken: this.tData,
                compare: contractMergeArr(this.rData, this.tData)
            });
        });
    }

    componentWillUnmount() {
        this.setState = function () {};
    }

    static getDerivedStateFromProps(props, state) {
        if (props.searchShow !== state.searchShow) {
            return {
                searchShow: props.searchShow
            };
        }

        if (props.value !== state.value) {
            return {
                value: props.value
            };
        }

        return null;
    }

    onRefresh() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            refreshing: true,
            isLoading: true
        });

        pIndex = 0;
        Promise.all([this.getTokenList(), this.getBindTokenList()]).then(value => {
            this.rData = value[0];
            this.tData = value[1];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
                height: hei,
                tokenData: this.rData,
                bindToken: this.tData,
                compare: contractMergeArr(this.rData, this.tData)
            });
        });

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
            this.rData = [...this.rData, ...result.transactions];
            if (result.transactions.length !== undefined) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                    tokenData: this.rData,
                    compare: contractMergeArr(this.rData, this.state.bindToken)
                });
            }
        }, ++pIndex, NUM_ROWS);
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            // let tokenName = rowData.name;
            let symbol = rowData.symbol;
            let tokenAddress = rowData.contract_address;
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
                                    address,
                                    contract_address: tokenAddress,
                                    symbol,
                                    signed_address: walletInfoList[address].signedAddress,
                                    public_key: walletInfoList[address].publicKey
                                };

                                if (compare[rowID]) {
                                    bindToken(TokenMessage, () => {
                                        Toast.success('bind Success', 3, () => {}, false);
                                    });
                                }
                                else {
                                    unbindToken(TokenMessage, () => {
                                        Toast.success('unbind Success', 3, () => {}, false);
                                    });
                                }
                            }}
                        />}
                    >
                        <div className='addtoken-list-symbol' >{symbol}</div>
                        {/* <div className='addtoken-list-tokenname' >{symbol}</div> */}
                        {/* <div className='addtoken-list-name' >{tokenName} Chain</div> */}
                        {/* <div className='addtoken-list-tokenaddress' >{tokenAddress}</div> */}
                    </List.Item>
                </div>
            );
        };

        return (
            <div className='transaction-list-container'
                style = {this.state.searchShow ? this.hide : this.show}
            >
                <ListView
                    initialListSize={NUM_ROWS}
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => SCROLLFOOTER(this.state.isLoading, this.state.hasMore)}
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
