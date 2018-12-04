import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import checkStatus from '../../../utils/checkStatus';

import { PullToRefresh, ListView, List, Switch } from 'antd-mobile'

import bindToken from '../../../utils/bindToken'
import unbindToken from '../../../utils/unbindToken' 

import { Toast } from 'antd-mobile'

require('./Tokenlist.css')

const NUM_ROWS = 1000;

/* 筛选是否已经绑定该cookie */
function mergeArr(json1, json2) {
    var keyArr = Array(json1.length);
    for(var i = 0; i< json1.length; i++) {
        keyArr[i] = false;
        for(var j = 0;j< json2.length; j++){
            if(json2[j].contract_address === json1[i].contract_address){
                keyArr[i] = true;
            }
        }
    }
    return keyArr;
}

/* 获取cookie中的csrfToken */
function getCookie(sName)
    {
        var aCookie = document.cookie.split("; ");
        for (var i=0; i < aCookie.length; i++)
        {
            var aCrumb = aCookie[i].split("=");
            if (sName == aCrumb[0]){
                return unescape(aCrumb[1]);
            }
        }
        return null;
}

function getContracts(callback, pIndex = 0){
    let params = {
        limit: NUM_ROWS,
        page: pIndex,
    }

    let query = '';
    for (let each in params) {
        query += `${each}=${params[each]}&`;
    }

    fetch(`/block/api/contract/contracts?${query}`, {
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
        })
    }).catch(error => {
        console.log('error:', error);
    });
}

function getTokens(callback){
    let params = {
        address:JSON.parse(localStorage.lastuse).address
    }

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
        })
    }).catch(error => {
        console.log('error:', error);
    });

}

class Tokenlist extends React.Component{
    constructor(props){
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            open: false,
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            tokenData:null,
            bindToken:null,
            compare:null
        };
    }
    
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentDidMount(){
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        getContracts(result => {
            this.rData = result.transactions;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                height: hei,
                refreshing: false,
                isLoading: false,
                tokenData:result.transactions,
                compare:Array(result.transactions.length),
            });
        });

        getTokens(result=>{
            this.setState({
                bindToken:result
            })

            let compare = null;
            let test = null;
            if(this.state.tokenData!==null){
                compare = mergeArr(this.state.tokenData,this.state.bindToken);
                console.log(compare)
                this.setState({
                    compare:compare
                })
            }
        })
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
        })
        
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

        getContracts(result => {
            // 测试上千条数据
            // this.rData = [...this.rData, ...this.rData];
            this.rData = [...this.state.walletData, ...result.transactions];

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
                tokenData:this.rData
            });
        }, ++pageIndex);
    };

    render(){ 
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
                        color = '#AC00E6'
                        onChange={() => {
                            let compare = this.state.compare;
                            compare[rowID] = !compare[rowID]
                            this.setState({
                                compare: compare,
                            });
                            
                            let address = JSON.parse(localStorage.lastuse).address;
                            let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
                            
                            if(compare[rowID]){
                                bindToken({
                                    address: address,
                                    contract_address: Toeknaddress,
                                    signed_address:walletInfoList[address].signedAddress,
                                    public_key:walletInfoList[address].publicKey
                                },()=>{
                                    Toast.success('bind Success', 3);
                                })
                            }else{
                                unbindToken({
                                    address: JSON.parse(localStorage.lastuse).address,
                                    contract_address: Toeknaddress,
                                    signed_address:walletInfoList[address].signedAddress,
                                    public_key:walletInfoList[address].publicKey
                                },()=>{
                                    Toast.success('unbind Success', 3);
                                })
                            }
                        }}
                    />}
                    >
                        <div className = 'addtoken-list-tokenname' >{Tokenname}</div>
                        <div className = 'addtoken-list-name' >{Tokenname} Chain</div>
                        <div className = 'addtoken-list-tokenaddress' >{Toeknaddress}</div>
                    </List.Item>
                 </div>
            );
        };
        
        return(
            <div className = 'transaction-list-container' >
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

export default Tokenlist