/*
 * huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react'
import { WhiteSpace, List, Button, PullToRefresh, ListView } from 'antd-mobile'

import style from './Home.scss'
import { hashHistory } from 'react-router'
import getParam from '../../../utils/getParam' // 还有类似方法的话，合并一下。

import initAelf from '../../../utils/initAelf'
import hexToString from '../../../utils/hexToString'

const Item = List.Item;
// const aelf = initAelf();
// const walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
// React component
// TODO, 这里以后考虑使用ListView
// https://mobile.ant.design/components/list-view-cn/#components-list-view-demo-basic


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        console.log('error response: ', response);
        throw error
    }
}

function getTxs () {

    let csrf = document.cookie.match(/csrfToken=[^;]*/)[0].replace('csrfToken=', '');

    let params = {
        limit: '13', // 13
        page: '0', // 0
        order: 'asc', // asc
        address: '0x04263089a3fd878482d81d5f54f6865260d6' // 0x04263089a3fd878482d81d5f54f6865260d6
    };
    let query = '';
    for (let each in params) {
        query += `${each}=${params[each]}&`;
    }

    fetch(`/block/api/address/transactions?${query}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            // 使用post的时候，egg需要配套加上这个，从cookie中获取,
            // csrf token方案
            // csrf: https://github.com/pillarjs/understanding-csrf/blob/master/README_zh.md
            // csrf: https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/index.html
            // let csrf = document.cookie.match(/^csrfToken=[^;]*/)[0].replace('csrfToken=', '')
            'x-csrf-token': csrf,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        // ,
        // query: JSON.stringify({
        //     limit: '13', // 13
        //     page: '0', // 0
        //     order: 'asc', // asc
        //     address: '0x04263089a3fd878482d81d5f54f6865260d6' // 0x04263089a3fd878482d81d5f54f6865260d6
        // })
    }).then(checkStatus).then(result => {
        console.log(result);
    }).catch(error => {
        console.log('error:', error)
    });
}



// PullToRefresh start 
const data = [{
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
}, {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
}, {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
}, ];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
}
// PullToRefresh end



class Home extends Component {
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
        // super();
        // this.state = {
        // };
        this.aelf = initAelf();
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

        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(genData()),
                height: hei,
                refreshing: false,
                isLoading: false,
            });
        }, 1500);
    }

    onRefresh = () => {
        this.setState({
            refreshing: true,
            isLoading: true
        });
        // simulate initial Ajax
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
            });
        }, 600);
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({
            isLoading: true
        });
        setTimeout(() => {
            this.rData = [...this.rData, ...genData(++pageIndex)];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };
    // PullToRefresh end



    // getCid from url. -> get Balance -> getTransactions
    getBalance() {
        let walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
        return this.aelf.contractMethods.BalanceOf(walletAddress);
    }

    getTokenName() {
        return this.aelf.contractMethods.TokenName();
    }

    testClick() {
        let testTxid = '0x9830bdbab7334f64e1f667068c15d439db47e26b88ff266cbf42aaa30ba6e525';
        hashHistory.push(`/transactiondetail?txid=${testTxid}`);
    }

    render() {

        // pull-to-refresh start
        const separator = (sectionID, rowID) => (
          <div
            key={`${sectionID}-${rowID}`}
            style={{
              backgroundColor: '#F5F5F9',
              height: 8,
              borderTop: '1px solid #ECECED',
              borderBottom: '1px solid #ECECED',
            }}
          />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
          if (index < 0) {
            index = data.length - 1;
          }
          const obj = data[index--];
          return (
            <div key={rowID}
              style={{
                padding: '0 15px',
                backgroundColor: 'white',
              }}
            >
              <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
                {obj.title}
              </div>
              <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
                <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
                <div style={{ display: 'inline-block' }}>
                  <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
                  <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
                </div>
              </div>
            </div>
          );
        };
        // pull-to-refresh end


        getTxs();

        let test = hashHistory.getCurrentLocation().search;
        let balance = parseInt(this.getBalance().return, 16);
        let tokenName = hexToString(this.getTokenName().return);

        return (
            <div>
                <h3>tokenName: {tokenName}</h3>
                <h3>balance: {balance}</h3>
                <p>get transaction history API not ready.</p>
                <List>
                    <Item extra={'支出-'} onClick={() => this.testClick()}>23333</Item>
                </List>
                <List>
                    <Item extra={'收入+'} onClick={() => this.testClick()}>6666</Item>
                </List>

                <WhiteSpace/>
                <div className={style.transfer}>
                    <Button
                        onClick={() => hashHistory.push('/assettransfer')}
                    >转账</Button>
                </div>



                  <Button
                    style={{ margin: '30px 15px' }}
                    inline
                    onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}
                  >
                    {this.state.useBodyScroll ? 'useBodyScroll' : 'partial scroll'}
                  </Button>
                  <ListView
                    key={this.state.useBodyScroll ? '0' : '1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>Pull to refresh</span>}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                      {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    useBodyScroll={this.state.useBodyScroll}
                    style={this.state.useBodyScroll ? {} : {
                      height: this.state.height,
                      border: '1px solid #ddd',
                      margin: '5px 0',
                    }}
                    pullToRefresh={<PullToRefresh
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                    />}
                    onEndReached={this.onEndReached}
                    pageSize={5}
                  />



            </div>
        );
    }
}

export default Home