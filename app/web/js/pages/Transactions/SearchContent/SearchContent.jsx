/**
*  @file
*  @author zhouminghui
*  2018.12.6
*  页面逻辑其实就是各种父类传递过来的状态各种更新 状态大多是从Search组件传递到父类在传进来。
*  通过父类的方法传递两个子组件之间的状态
*/

import React from 'react';

import {ListView} from 'antd-mobile';

import {txIdOmit} from '../../../utils/utils';
import {hashHistory} from 'react-router';
import style from '../TransactionsContent/TransactionsContent.scss';

export default class SearchContent extends React.Component {
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
            searchValue: null,
            searchShow: this.props.searchShow,
            dataSource,
            walletAddress: this.props.address,
            height: document.documentElement.clientHeight
        };

    }

    static getDerivedStateFromProps(props, state) {
        if (props.searchValue !== state.searchValue) {
            return {
                searchValue: props.searchValue.result
            };
        }

        if (props.searchShow !== state.searchShow) {
            return {
                searchShow: props.searchShow
            };
        }

        if (props.address !== state.walletAddress) {
            return {
                walletAddress: props.address
            };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.searchValue !== this.props.searchValue) {
            let result = this.state.searchValue;
        // 重新定义了 dataSource 是因为 这方法传了值他就一直认为要有值。。
            const dataSource = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            });

            if (result.tx_status === 'NotExisted') {
                this.setState({
                    searchValue: null,
                    dataSource
                });
            }
            else {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result)
                });
            }
        }

        if (prevProps.searchShow !== this.props.searchShow) {
            this.setState({
                searchShow: this.props.searchShow
            });
        }

        if (prevProps.address !== this.props.address) {
            this.setState({
                walletAddress: this.props.address
            });
        }
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            let item = this.state.searchValue;
            let params = item.tx_info.params.split(',');
            let isIncome = params[0] === this.state.walletAddress ? true : false;
            let iconClass = style.icon + ' ' + (isIncome ? style.iconIn : '');
            item.txId = item.tx_info.TxId;
            let txId = item.tx_info.TxId;
            txId = txIdOmit(txId);
            let quantity = params[1];

            return (
                <div key={rowID}
                    className={style.txList}
                    onClick={() => hashHistory.push(`/transactiondetail?txid=${item.txId}`)}
                >
                    <div className={style.leftContainer}>
                        <div className={iconClass}>
                        </div>
                        <div>
                            <div className={style.address}>
                                {txId}
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
                style={this.state.searchShow ? this.show : this.hide}
            >
                <ListView
                    initialListSize={1}
                    key={'1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    style={{
                        height: '100%',
                        margin: '5px 0'
                    }}
                />
            </div>
        );
    }

}
