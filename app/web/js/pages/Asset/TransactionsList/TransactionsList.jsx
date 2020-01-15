/**
 * @file TransactionsList.jsx
 * @author huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView } from 'antd-mobile';

import { BigNumber } from 'bignumber.js';
import moment from 'moment';

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
import getPrice from '../../../utils/getPrice';
require('./TransactionsList.css');

const NUM_ROWS = 20;
let pageIndex = 0;

/* eslint-disable */
function getTxs(callback, pIndex = 0) {

  const params = {
    symbol: getParam('token', window.location.href),
    limit: NUM_ROWS, // 13
    page: pIndex, // 0
    order: 'desc', // asc
    address: JSON.parse(localStorage.getItem('lastuse')).address,
  };
  const paramsUnconfirmed = Object.assign({type: 'unconfirmed'}, params);

  const requestList = [get('api/token/txs', params)];

  if (pIndex === 0) {
    requestList.unshift(get('api/token/txs', paramsUnconfirmed));
  }
  Promise.all(requestList).then(results => {
    const newResult = {
      total: 0,
      transactions: []
    };
    results.forEach(result => {
      newResult.total += result.total;
      newResult.transactions = [...newResult.transactions, ...result.transactions];
    });
    callback(newResult);
  });
}
/* eslint-enable */

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      tokenPrice: null,
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

    getPrice('ELF', result => {
      const {USD} = result;
      this.setState({
          tokenPrice: USD
      });
    }, () => {
    });
  }

  onRefresh() {

    this.props.getBalanceAndTokenName();

    this.setState({
      refreshing: true,
      isLoading: true
    });
    pageIndex = 0;
    getTxs(result => {
      this.rData = result.transactions;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false
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
    const decimalsQuery = `decimals=${this.props.decimals}`;
    const tokenQuery = tokenNameQuery + '&' + tokenAddressQuery + '&' + decimalsQuery;

    const {tokenPrice} = this.state;

    const row = (rowData, sectionID, rowID) => {

      let item = this.rData[rowID];

      const params = JSON.parse(item.params);
      // let isIncome = item.params_to === this.walletAddress;
      let isIncome = item.address_to === this.walletAddress;
      // let quantity = (isIncome ? '+' : '-') + params.quantity;
      let amount = (new BigNumber((params.amount || 0))).div(Math.pow(10, this.props.decimals)).toFixed(2);

      let tenderValue = '-';
      if (item.symbol === 'ELF' && tokenPrice) {
        const balanceBigNumber = new BigNumber(params.amount);
        const priceBigNumber = new BigNumber(tokenPrice);
        tenderValue = '$' + balanceBigNumber.div(Math.pow(10, 8)).multipliedBy(priceBigNumber).toFixed(2);
      }

      // let address = isIncome ? item.address_from : item.params_to;
      let address = isIncome ? item.address_from : item.address_to;
      address = addressOmit(address);

      const timeFormatted = moment(item.time).format('YYYY-MM-DD HH:mm:ss');

      const {PREFIX, CURRENT_CHAIN_ID} = window.defaultConfig.ADDRESS_INFO;
      // TODO other chain
      if (item.method === 'CrossChainTransfer') {
        const paramsTemp = JSON.parse(item.params);
        const toChainIdBase58 = window.defaultConfig.ADDRESS_INFO[paramsTemp.toChainId];

        address = PREFIX + '_' + addressOmit(paramsTemp.to) + '_' + toChainIdBase58;
        isIncome = false;

      } else {
        address = PREFIX + '_' + address + '_' + CURRENT_CHAIN_ID;
      }

      let iconClass = style.icon + ' ' + (isIncome ? style.iconIn : '');
      if (item.tx_status.toLowerCase().includes('failed')) {
        iconClass = style.icon + ' ' + style.iconFailed;
      }

      return (
        <div key={rowID}
          className={style.txList}
          onClick={() => {
            if (this.props.turnToDetailReady) {
              hashHistory.push(`/transactiondetail?txid=${item.tx_id}&${tokenQuery}`)
            }
          }}
        >
          <div className={style.leftContainer}>
            <div className={iconClass}>

            </div>
            <div>
              <div className={style.address}>
                {address}
              </div>
              <div className={style.time}>{timeFormatted}</div>
            </div>
          </div>
          <div className={style.rightContainer}>
            {/*<div className={style.balance}>{quantity}</div>*/}
            <div className={style.balance}>{amount}</div>
            <div className={style.tenderValuation}>{tenderValue}</div>
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
