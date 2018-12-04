/*
*  zhouminghui 
*  2018.12.4
*  页面逻辑其实就是各种父类传递过来的状态各种更新 状态大多是从Search组件传递到父类在传进来。
*  通过父类的方法传递两个子组件之间的状态
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { PullToRefresh, ListView } from 'antd-mobile';

import checkStatus from '../../../utils/checkStatus';
import getParam from '../../../utils/getParam';
import addressOmit from '../../../utils/addressOmit';
import { hashHistory } from 'react-router';

import style from '../TransactionsContent/TransactionsContent.scss';

class SearchContent extends React.Component{
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
            SearchValue:null,
            SearchShow:false,
            dataSource,
            walletAddress:this.props.address,
            height: document.documentElement.clientHeight
        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.SearchValue !== this.props.SearchValue){
            let result = nextProps.SearchValue;
            // 重新定义了 dataSource 是因为 这方法传了值他就一直认为要有值。。
            const dataSource = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            });
            console.log(result.result.tx_status)
            if(result.result.tx_status === 'NotExisted'){
                this.setState({
                    SearchValue:null,
                    dataSource
                });
            }else{
                this.setState({
                    SearchValue:result,
                    dataSource:this.state.dataSource.cloneWithRows(result)
                });
            }
            
        }

        if(nextProps.ShowSearch !== this.props.ShowSearch){
            this.setState({
                SearchShow:nextProps.ShowSearch
            })
        }

        if(nextProps.address !== this.props.address){
            this.setState({
                walletAddress:nextProps.address
            })
        }
    }

    render(){
        const row = (rowData, sectionID, rowID) => {
            let item = this.state.SearchValue.result;
            let params = item.tx_info.params.split(',')
            let isIncome = params[0] === this.state.walletAddress ? true : false;
            let iconClass = style.icon + ' ' + (isIncome ? style.iconIn : '');
            let address = isIncome ? item.tx_info.From : params[0];
            let status = item.tx_status;
            item.tx_id = item.tx_info.TxId;
            address = addressOmit(address);
            let quantity = params[1];

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
            <div className={style.transactionContainer + ' ' + 'transaction-list-container'} style = {this.state.SearchShow?this.show:this.hide} >
                <ListView
                    initialListSize={1}
                    key={'1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    style={{
                        height: '100%',
                        margin: '5px 0',
                    }}
                />
            </div>
        )
    }

}

export default SearchContent