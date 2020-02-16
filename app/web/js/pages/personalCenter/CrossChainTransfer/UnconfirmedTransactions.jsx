import React, { Component } from 'react'
import { List, Button } from 'antd-mobile'
import { hashHistory } from 'react-router'
import NavNormal from '../../NavNormal/NavNormal'
import moment from 'moment';

import { FormattedMessage } from 'react-intl'

import getPageContainerStyle from '../../../utils/getPageContainerStyle';

import style from './UnconfirmedTransactions.scss'

const Item = List.Item;
// React component
class UnconfirmedTransactions extends Component {

  confirmTransfer(txId) {
    // TODO use crossChain utils
    alert(txId);
  }

  renderList () {
    // TODO get list from api
    let lists = [
      {
        from: 'address1',
        to: 'ELF_2RCLmZQ2291xDwSbDEJR6nLhFJcMkyfrVTq1i1YxWC4SdY49a6_tDVV',
        symbol: 'ELF',
        amount: 1,
        memo: '2333',
        time: 1581871716203,
        send_node: 'http://54.199.254.157:8000',
        receive_node: 'http://3.112.250.87:8000',
        main_chain_id: 9992731,
        issue_chain_id: 9992731,
        tx_id: '140b682ec5394640e2ffd86dc2981dd3dd2157eaf17dc5bd9f1530a53e7e0c4a', // unique key
      },
      {
        from: 'address1',
        to: 'ELF_2RCLmZQ2291xDwSbDEJR6nLhFJcMkyfrVTq1i1YxWC4SdY49a6_tDVV',
        symbol: 'ELF',
        amount: 1,
        memo: '2555',
        time: 1581871716203,
        send_node: 'http://54.199.254.157:8000',
        receive_node: 'http://3.112.250.87:8000',
        main_chain_id: 9992731,
        issue_chain_id: 9992731,
        tx_id: '140b682ec5394640e2ffd86dc2981dd3dd2157eaf17dc5bd9f1530a53e7e0c4a', // unique key
      }
    ];

    let listHtml = lists.map(item => {
      return <List>
        <Item>
          <div className={style.list}>
            <div className={style.listItem}>Tx id: <span className={style.listItemText}>{item.tx_id}</span></div>
            <div className={style.listItem}>To: <span className={style.listItemText}>{item.to}</span></div>
            <div className={style.listItem}>Amount: <span className={style.listItemText}>{item.amount + ' ' + item.symbol}</span></div>
            <div className={style.confirmButton}>
              <div className={style.listItemText}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</div>
              <Button
                inline
                size="small"
                onClick={() => this.confirmTransfer(item.tx_id)}
                style={{ color: '#AC00E6', borderColor: '#FFF' }}>
                <FormattedMessage id = 'aelf.Confirm' />
              </Button>
            </div>
          </div>
        </Item>
      </List>;
    });

    return [...listHtml, ...listHtml, ...listHtml, ...listHtml, ...listHtml];
  }

  render() {
    const listHtml = this.renderList();
    const containerStyle = getPageContainerStyle();

    return (
      <div className='aelf-personal-pages aelf-solid'>
        <NavNormal/>
        <div className={style.listContainer}  style={containerStyle}>
          {listHtml}
        </div>

      </div>
    );
  }
}

export default UnconfirmedTransactions
