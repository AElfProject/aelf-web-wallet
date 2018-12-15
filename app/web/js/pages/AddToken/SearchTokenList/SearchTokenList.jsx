/**
* @file
* @author zhouminghui
* 搜索token后的列表显示
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {List, Switch, ListView, Toast} from 'antd-mobile';
import getSearchToken from '../../../utils/getSearchToken';
import getTokens from '../../../utils/getTokens';
import contractMergeArr from '../../../utils/contractMergeArr';
import bindToken from '../../../utils/bindToken';
import unbindToken from '../../../utils/unbindToken';
import {tokenOmit} from '../../../utils/utils';
import {SCROLLFOOTER} from '../../../constants';

export default class SearchTokenList extends React.Component {
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
            value: this.props.value,
            searchShow: this.props.searchShow,
            dataSource,
            height: document.documentElement.clientHeight,
            searchTokens: null,
            isLoading: false,
            bindToken: null,
            compare: null,
            useBodyScroll: false
        };
    }

    getSearchTokenList(name) {
        return new Promise((resolve, reject) => {
            getSearchToken(result => {
                resolve(result);
            }, name);
        });
    }

    getBindTokenList() {
        return new Promise((resolve, reject) => {
            getTokens(result => {
                resolve(result);
            });
        });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.value) {
            return {
                value: props.value
            };
        }

        if (props.searchShow !== state.searchShow) {
            return {
                searchShow: props.searchShow
            };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                isLoading: true
            });
            const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
            Promise.all([this.getSearchTokenList(this.props.value), this.getBindTokenList()]).then(value => {
                this.sData = value[0];
                this.tData = value[1];
                this.setState({
                    searchTokens: this.sData,
                    bindToken: this.tData,
                    isLoading: false,
                    height: hei,
                    dataSource: this.state.dataSource.cloneWithRows(this.sData),
                    compare: contractMergeArr(this.sData, this.tData)
                });
            });
        }
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            let tokenName = rowData.name;
            let tokenAddress = rowData.contract_address;
            tokenAddress = tokenOmit(tokenAddress);
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
                                    contract_address: tokenAddress,
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
                        <div className='addtoken-list-tokenname' >{tokenName}</div>
                        <div className='addtoken-list-name' >{tokenName} Chain</div>
                        <div className='addtoken-list-tokenaddress' >{tokenAddress}</div>
                    </List.Item>
                </div>
            );
        };
        return (
            <div className='transaction-list-container'
                style={this.state.searchShow ? this.show : this.hide}
            >
                <ListView
                    initialListSize={1000}
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
                    pageSize={10}
                />
            </div>
        );
    }
}
