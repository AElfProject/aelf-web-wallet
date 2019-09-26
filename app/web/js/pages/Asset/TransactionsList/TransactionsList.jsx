/**
 * @file TransactionsList.jsx
 * @author huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView } from 'antd-mobile';

import style from './TransactionsList.scss';

import { hashHistory } from 'react-router';

import {
  addressOmit,
  getParam
} from '../../../utils/utils';

import {
  get
} from '../../../utils/apisauce';

import {
  SCROLLFOOTER
} from '../../../constants';
require('./TransactionsList.css');

const NUM_ROWS = 20;
let pageIndex = 0;

function getTxs(callback, pIndex = 0) {
  get('api/token/txs', {
    symbol: getParam('token', window.location.href),
    // ptype: 'api',
    // action: 'address_transactions',
    limit: NUM_ROWS, // 13
    page: pIndex, // 0
    order: 'desc', // asc
    address: JSON.parse(localStorage.getItem('lastuse')).address // ,
    // contract_address: getParam('contract_address', window.location.href)
  }).then(result => {
    callback(result);
  });
}

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false
    };

    this.walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
  }

  // PullToRefresh start
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    }
    else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

    getTxs(result => {
      this.rData = result.transactions;

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        height: hei,
        refreshing: false,
        isLoading: false
      });
    });
  }

  onRefresh() {

    this.props.getBalanceAndTokenName();

    this.setState({
      refreshing: true,
      isLoading: true
    });

    getTxs(result => {
      this.rData = result.transactions;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false
      });
    });
    pageIndex = 0;
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

    getTxs(result => {
      this.rData = [...this.rData, ...result.transactions];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      });
    }, ++pageIndex);
  }
  // PullToRefresh end

  componentWillUnmount() {
    this.WillUnmount = true;
    this.setState = () => { };
  }

  render() {
    const tokenNameQuery = `token=${getParam('token', window.location.href)}`;
    const tokenAddressQuery = `contract_address=${getParam('contract_address', window.location.href)}`;
    const tokenQuery = tokenNameQuery + '&' + tokenAddressQuery;
    const row = (rowData, sectionID, rowID) => {

      let item = this.rData[rowID];

      console.log('111111111_______________', item);
      const params = JSON.parse(item.params);
      // let isIncome = item.params_to === this.walletAddress;
      let isIncome = item.adderss_to === this.walletAddress;
      // let quantity = (isIncome ? '+' : '-') + params.quantity;
      let quantity = (isIncome ? '+' : '-') + (params.amount || 0);
      let iconClass = style.icon + ' ' + (isIncome ? style.iconIn : '');

      // let address = isIncome ? item.address_from : item.params_to;
      let address = isIncome ? item.address_from : item.address_to;
      let status = item.tx_status;
      if (status.toLowerCase().includes('failed')) {
        iconClass = style.icon + ' ' + style.iconFailed;
      }
      address = addressOmit(address);

      return (
        <div key={rowID}
          className={style.txList}
          onClick={() => hashHistory.push(`/transactiondetail?txid=${item.tx_id}&${tokenQuery}`)}
        >
          <div className={style.leftContainer}>
            <div className={iconClass}>

            </div>
            <div>
              <div className={style.address}>
                {address}
              </div>
              {/*<div className={style.time}>2018-09-08</div>*/}
            </div>
          </div>
          <div className={style.rightContainer}>
            <div className={style.balance}>{quantity} {status}</div>
            {/*<div className={style.tenderValuation}>法币价值</div>*/}
          </div>
        </div>
      );
    };

    // pull-to-refresh end

    return (
      <div className={style.transactionContainer + ' ' + 'transaction-list-container'}>
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
