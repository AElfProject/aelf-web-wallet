import React, {Component} from 'react'
import {Button, List, Modal, Toast} from 'antd-mobile'
import {hashHistory} from 'react-router'
import NavNormal from '../../NavNormal/NavNormal'
import moment from 'moment';

import {FormattedMessage} from 'react-intl'

import getPageContainerStyle from '../../../utils/getPageContainerStyle';

import style from './UnconfirmedTransactions.scss';
import {CrossChainMethods, getCrossInfo} from '../../../utils/crossChain';
import {getWallet} from '../../../utils/initAelf';
import {get} from "../../../utils/apisauce";
import WalletUtil from "../../../utils/Wallet/wallet";

const Item = List.Item;
const prompt = Modal.prompt;

// React component
class UnconfirmedTransactions extends Component {

  constructor() {
    super();
    this.state = {
      listData: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  passwordPrompt(e, receiveParams) {
    e.persist();
    prompt(
      'Password',
      'Please make sure you are under safe enviroment.',
      [
        { text: 'Cancel' },
        { text: 'Submit', onPress: password => {
            Toast.loading('Cross chain transfer', 60);
            receiveParams.password = password;
            this.confirmTransfer(receiveParams);
          }
        },
      ],
      'secure-text',
    );
  }

  // {
  //     crossTransferTxId,
  //     transfer: {
  //         to: receiveAddress,
  //         symbol: 'ELF',
  //         amount: 1,
  //         memo: 'to be or not to be.'
  //     },
  //     fromChain: 'AELF':
  // }
  confirmTransfer(options) {
    const {password, fromChain, transfer} = options;

    let wallet;
    try {
      wallet = getWallet(password || '?');
    } catch(e) {
      Toast.hide();
      Toast.fail('Wrong Password', 3, () => {}, false);
      return;
    }

    const crossInstance = new CrossChainMethods({
      wallet,
      WEB_API_INFO: window.defaultConfig.WEB_API_INFO,
      TOKEN_CROSS_SUPPORT: window.defaultConfig.TOKEN_CROSS_SUPPORT
    });

    crossInstance.receive(options).then(result => {
      console.log('result', result);
      if (result.TransactionId) {
        Toast.hide();
        const {symbol, to} = transfer;
        const toChain = to.split('_')[2];
        const decimals = window.defaultConfig.TOKEN_CROSS_SUPPORT[symbol].decimals;
        hashHistory.push(`/transactiondetail?txid=${result.TransactionId}&token=${symbol}`
          + `&decimals=${decimals}&from=${fromChain}&to=${toChain}&type=receive`);
      }
    }).catch(error => {
      Toast.fail(error.message || 'Something error', 3, () => {}, false);
    });
  }
  async confirmTransferExtension(options) {
    const {fromChain, transfer} = options;

    const CROSS_INFO = getCrossInfo(transfer, fromChain);
    // console.log('crossTransferExtension CROSS_INFO r', CROSS_INFO);
    // return;

    const walletUtilInstance = new WalletUtil();
    const walletAddress = walletUtilInstance.getLastUse().address;
    const wallet = {
      address: walletAddress
    };
    const crossInstance = new window.NightElf.CrossChain({
      wallet,
      CROSS_INFO
    });
    console.log('crossInstance', crossInstance, options);

    try {
      const receiveResult = await crossInstance.receive({
        crossTransferTxId: options.crossTransferTxId
      })

      const crossReceiveId = JSON.parse(receiveResult.detail).TransactionId;

      console.log('receiveResult Extension: ', receiveResult);
      if (crossReceiveId) {

        const crossInstanceLocal = new CrossChainMethods({});
        await crossInstanceLocal.markReceived({
          txId: options.crossTransferTxId
        });

        Toast.hide();
        const {symbol, to} = transfer;
        const toChain = to.split('_')[2];
        const decimals = window.defaultConfig.TOKEN_CROSS_SUPPORT[symbol].decimals;
        hashHistory.push(`/transactiondetail?txid=${crossReceiveId}&token=${symbol}`
          + `&decimals=${decimals}&from=${fromChain}&to=${toChain}&type=receive`);
      } else {
        Toast.fail(JSON.stringify(receiveResult) || 'Something error', 3, () => {}, false);
      }
    } catch (error) {
      Toast.fail(error.message || 'Something error', 3, () => {}, false);
    }
  }

  fetchData() {
    const walletUtilInstance = new WalletUtil();
    const address = walletUtilInstance.getLastUse().address;

    const offset = 0;
    const limit = 100;

    get('/cross/api/list', {
      offset, // 13
      limit, // 0
      address // asc
    }).then(result => {
      console.log('/cross/api/list: ', result);

      this.setState({
        listData: result
      });
    }).catch(error => {
      Toast.fail(error, 6, () => {}, false);
    });
  }

  renderList() {
    const walletUtilInstance = new WalletUtil();
    const walletType = walletUtilInstance.getWalletType();
    const {listData} = this.state;
    return listData.map(item => {

      const almostReady = (new Date()).getTime() - +item.time > (5 * 60 * 1000);
      console.log('almostReady', almostReady);

      const receiveParams = {
        crossTransferTxId: item.tx_id,
        transfer: {
          to: item.to,
          symbol: item.symbol,
          amount: item.amount,
          memo: item.memo
        },
        fromChain: window.defaultConfig.chainId
      };

      return <List key={item.tx_id}>
        <Item>
          <div className={style.list}>
            <div className={style.listItem}>Tx id: <span className={style.listItemText}>{item.tx_id}</span></div>
            <div className={style.listItem}>To: <span className={style.listItemText}>{item.to}</span></div>
            <div className={style.listItem}>
              Amount: <span className={style.listItemText}>{item.amount + ' ' + item.symbol}</span></div>
            {item.memo
            && <div className={style.listItem}>Memo: <span className={style.listItemText}>{item.memo}</span></div>}
            <div className={style.confirmButton}>
              <div className={style.listItemText}>{moment(+item.time).format('YYYY-MM-DD HH:mm')}</div>
              {almostReady ? <Button
                inline
                size="small"
                onClick={e => {
                  if (walletType !== 'local') {
                    this.confirmTransferExtension(receiveParams);
                    return;
                  }
                  this.passwordPrompt(e, receiveParams)
                }}
                style={{color: '#AC00E6', borderColor: '#FFF'}}>
                <FormattedMessage id='aelf.Confirm'/>
              </Button> : <FormattedMessage id='aelf.Pending'/>}
            </div>
          </div>
        </Item>
      </List>;
    });
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

export default UnconfirmedTransactions;
