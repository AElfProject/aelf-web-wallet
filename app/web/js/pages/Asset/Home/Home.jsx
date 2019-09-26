/**
 * @file Home.jsx
 * @author huangzongzhe
 * 2018.07.26
 */
/* eslint-disable fecs-camelcase */
import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import Long from 'long';
import BigNumber from 'bignumber.js';
// window.Long = Long;
// window.BigNumber = BigNumber;
// var longVal = { low: 2000, high: 0, unsigned: true };
// var test = new Long(longVal.low, longVal.high, longVal.unsigned);

import style from './Home.scss';
import {hashHistory} from 'react-router';

import TransactionsList from '../TransactionsList/TransactionsList';
import NavNormal from '../../NavNormal/NavNormal';

import Svg from '../../../components/Svg/Svg';

import {
    getPageContainerStyle,
    getParam,
    getBalanceAndTokenName
} from '../../../utils/utils';

import {
    get
} from '../../../utils/apisauce';

import {FormattedMessage} from 'react-intl';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokenName: '-',
            balance: '-'
        };

        // 得把作用域绑上，不然子组件里执行函数，无法执行this.setState这些。
        this.getBalanceAndTokenName = this.getBalanceAndTokenName.bind(this);

        this.walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
    }

    getBalanceAndTokenName() {
        let address = this.walletAddress;
        let contractAddress = getParam('contract_address', window.location.href);
        let symbol = getParam('token', window.location.href);

        getBalanceAndTokenName(address, contractAddress, symbol, output => {
            const tokenInfo = output[0];
            this.getELFValue(tokenInfo);

            const balanceObj = tokenInfo.balance;
            const balance = new Long(balanceObj.low, balanceObj.high, balanceObj.unsigned);

            this.setState({
                balance, // .toLocaleString(),
                tokenName: tokenInfo.token_name,
                contract_address: contractAddress
            });
        });
    }

    getELFValue(tonkenInfo) {
        const {
            balance,
            token_name
        } = tonkenInfo;
        if (token_name !== 'ELF') {
            this.setState({
                tenderValue: 0
            });
            return;
        }
        // TODO: 需要更全的list
        // TODO: 这个数据，走server存到数据库去，能加速，目前大陆连这个接口太慢了。
        get('https://min-api.cryptocompare.com/data/price', {
            fsym: token_name,
            tsyms: 'USD'
        }).then(result => {
            const {USD} = result;

            const balanceLong = new Long(balance.low, balance.high, balance.unsigned);
            const balanceBigNumber = new BigNumber(balanceLong.toString());
            const priceBigNumber = new BigNumber(USD);
            let tenderValue = balanceBigNumber.multipliedBy(priceBigNumber).toString();

            // let tenderValue = (parseFloat(USD) * balance).toLocaleString();
            tenderValue = isNaN(tenderValue) ? 0 : tenderValue;
            this.setState({
                tenderValue
            });
        }).catch(error => {
            console.log('error:', error);
        });
    }

    componentDidMount() {
        Toast.hide();
        this.getBalanceAndTokenName();
    }

    componentWillUnmount() {
        this.WillUnmount = true;
        this.setState = () => {};
    }

    render() {
        let btnlink =  `/assettransfer?${this.props.location.search}`;
        let pageContainerStyle = getPageContainerStyle();
        pageContainerStyle.overflow = 'hidden';

        // let address = this.walletAddress;
        // let contractAddress = getParam('contract_address', window.location.href);

        return (
            <div>
                <NavNormal navTitle={<FormattedMessage id = 'aelf.Transaction Record' />}></NavNormal>
                <div style={pageContainerStyle} className={style.container}>
                    <div>
                        <div className={style.assetsInfoContainer}>
                            <div className={style.assetInfo}>
                                <div className={style.assetName}>
                                    {this.state.tokenName}
                                </div>
                                {/*<div className={style.assetDescription}>*/}
                                    {/*描述【暂无】*/}
                                {/*</div>*/}
                            </div>
                            <div className={style.assetBalanceContainer}>
                                <div className={style.balance}>
                                    {this.state.balance.toString()}
                                </div>
                                <div className={style.tenderValuation}>
                                    {this.state.tenderValue}
                                    {/*法币价值【暂无】*/}
                                    <span className={style.tenderUnit}> USD</span>
                                </div>
                            </div>
                        </div>

                        <div className={style.txBtnContainer}>
                            <div
                                className={style.button}
                                onClick={() => hashHistory.push(btnlink)}
                            >
                                <div className={style.icon}>
                                    <Svg icon='out20'
                                         style={{display: 'inline-block', height: 20, width: 20}}
                                    ></Svg>
                                </div>
                                <div><FormattedMessage id = 'aelf.Send' /></div>
                            </div>
                            <div
                                className={style.button}
                                onClick={() => hashHistory.push('/qrcode')}
                            >
                                <div className={style.icon}>
                                    <Svg icon='in20'
                                         style={{display: 'inline-block', height: 20, width: 20}}></Svg>
                                </div>
                                <div><FormattedMessage id = 'aelf.Receive' /></div>
                            </div>
                        </div>
                    </div>

                    <div className={style.txListContainer}>
                        <TransactionsList
                            getBalanceAndTokenName={this.getBalanceAndTokenName}
                        ></TransactionsList>
                    </div>
                </div>

            </div>
        );
    }
}
