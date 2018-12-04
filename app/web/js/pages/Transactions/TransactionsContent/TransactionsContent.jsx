/*
* 2018.11.23
* zhouminghui
* dataSource 可能是导致大批量渲染的主谋
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { PullToRefresh, ListView } from 'antd-mobile';

import checkStatus from '../../../utils/checkStatus';
import getParam from '../../../utils/getParam';
import addressOmit from '../../../utils/addressOmit';
import { hashHistory } from 'react-router';

import style from './TransactionsContent.scss';

// 交易失败 TODO 暂时不知道交易失败返回的是什么值
// 偶发  列表下拉后数据无法切换  刷新即可切换  待查看原因 【已修复】

let pageIndex = 0;
const NUM_ROWS = 20;

function getTxs(callback,walletAddress,pIndex = 0,){
    let params = {
        limit: NUM_ROWS, // 13
        page: pIndex, // 0
        order: 'desc', // asc
        address: walletAddress, // 0x04263089a3fd878482d81d5f54f6865260d6
        // contract_address: getParam('contract_address', window.location.href)
        // contract_address:"b531339ea1548b447dd2144f59358b75c095"
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

class TransactionsContent extends React.Component{
    constructor(props){
        super(props);


        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.hide = {
            display:'none'
        }

        this.show = {
            display:'block'
        }

        this.state = {
            open: false,
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            walletAddress:this.props.address,
            walletData:null,
        };
    }
    
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.address !== this.props.address ){
            this.setState({
                walletAddress:nextProps.address
            })
            const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
            getTxs(result => {
                this.rData = result.transactions;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    height: hei,
                    refreshing: false,
                    isLoading: false,
                    walletData:result.transactions
                });
            },nextProps.address);
        }

        // if(nextProps.SearchValue !== this.props.SearchValue){
        //     let result = nextProps.SearchValue
        //     this.setState({
        //         SearchValue:result
        //     })
        // }

        if(nextProps.ShowSearch !== this.props.ShowSearch){
            this.setState({
                SearchShow:nextProps.ShowSearch
            })
        }
    }

    componentDidMount(){
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        getTxs(result => {
            this.rData = result.transactions;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
                walletData:result.transactions
            });
        },this.state.walletAddress);

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
        },this.state.walletAddress)
        
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
            // 测试上千条数据
            // this.rData = [...this.rData, ...this.rData];
            this.rData = [...this.state.walletData, ...result.transactions];

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
                walletData:this.rData
            });
        },this.state.walletAddress,++pageIndex);
    };

    render(){
        const row = (rowData, sectionID, rowID) => {
            let  item = this.state.walletData[rowID];
            let  isIncome = item.params_to === this.state.walletAddress ? true : false;
            let  quantity = item.quantity;
            let  iconClass = style.icon + ' ' + (isIncome ? style.iconIn : '');
            let  address = isIncome ? item.address_from : item.params_to;
            let  status = item.tx_status;
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
        
        return(
            <div className={style.transactionContainer + ' ' + 'transaction-list-container'} style = {this.state.SearchShow?this.hide:this.show} >
                <ListView
                    initialListSize={NUM_ROWS}
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
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
        )
    }

}

export default TransactionsContent