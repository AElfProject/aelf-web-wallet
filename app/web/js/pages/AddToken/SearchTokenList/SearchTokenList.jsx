/**
* @file
* @author zhouminghui
* 搜索token后的列表显示
*/

import React from 'react';
import {List, Switch, ListView, Toast} from 'antd-mobile';
import getSearchToken from '../../../utils/getSearchToken';
import getTokens from '../../../utils/getTokens';
import contractMergeArr from '../../../utils/contractMergeArr';
import bindToken from '../../../utils/bindToken';
import unbindToken from '../../../utils/unbindToken';

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
            dataSource,
            searchTokens: null,
            bindToken: null,
            compare: null,
            SearchShow: false,
            useBodyScroll: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchShow !== this.props.searchShow) {
            this.setState({
                SearchShow: nextProps.searchShow
            });

            getTokens(result => {
                this.setState({
                    bindToken: result
                });

                let compare = null;
                if (this.state.searchTokens !== null) {
                    compare = contractMergeArr(this.state.searchTokens, this.state.bindToken);
                    this.setState({
                        compare
                    });
                }
            });
        }

        if (nextProps.value !== this.props.value) {
            getSearchToken(result => {
                this.setState({
                    value: nextProps.value,
                    searchTokens: result,
                    dataSource: this.state.dataSource.cloneWithRows(result),
                    compare: Array(result.length)
                });
            }, nextProps.value);

            getTokens(result => {
                this.setState({
                    bindToken: result
                });

                let compare = null;
                if (this.state.searchTokens !== null) {
                    compare = contractMergeArr(this.state.searchTokens, this.state.bindToken);
                    this.setState({
                        compare
                    });
                }
            });
        }
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            let item = this.state.searchTokens[rowID];
            console.log(this.state.compare[rowID]);
            let TokenName = item.name;
            let TokenAddress = item.contract_address;
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
                                    contract_address: TokenAddress,
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
                        <div className='addtoken-list-tokenname' >{TokenName}</div>
                        <div className='addtoken-list-name' >{TokenName} Chain</div>
                        <div className='addtoken-list-tokenaddress' >{TokenAddress}</div>
                    </List.Item>
                </div>
            );
        };
        return (
            <div className='transaction-list-container'
                style={this.state.SearchShow ? this.show : this.hide}
            >
                <ListView
                    initialListSize={1000}
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
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
