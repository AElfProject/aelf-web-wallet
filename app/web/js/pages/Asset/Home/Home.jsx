/**
 * @file Home.jsx
 * @author huangzongzhe
 * 2018.07.26
 */
/* eslint-disable fecs-camelcase */
import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import BigNumber from 'bignumber.js';
// test.div(Math.pow(10, 8)).toFixed(2);
// test.div(Math.pow(10, decimals)).toFixed(2);

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

import getPrice from '../../../utils/getPrice';

import {FormattedMessage} from 'react-intl';
import WalletUtil from "../../../utils/Wallet/wallet";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokenName: '-',
            balance: '-',
            decimals: 30
        };

        // 得把作用域绑上，不然子组件里执行函数，无法执行this.setState这些。
        this.getBalanceAndTokenName = this.getBalanceAndTokenName.bind(this);

        const walletUtilInstance = new WalletUtil();
        this.walletAddress = walletUtilInstance.getLastUse().address;
    }

    getBalanceAndTokenName() {
        let address = this.walletAddress;
        let contractAddress = getParam('contract_address', window.location.href);
        let symbol = getParam('token', window.location.href);

        getBalanceAndTokenName(address, contractAddress, symbol, output => {
            const tokenInfo = output[0];
            this.getELFValue(tokenInfo);

            const {
              balance,
              token_name,
              decimals
            } = tokenInfo;

            let balanceBig = new BigNumber(balance);
            balanceBig = balanceBig.div(Math.pow(10, decimals)).toFixed(2);

            this.setState({
              balance: balanceBig, // .toLocaleString(),
              tokenName: token_name,
                contract_address: contractAddress
            });
        });
    }

    getELFValue(tonkenInfo) {
        const {
            balance,
            token_name,
            decimals
        } = tonkenInfo;
        if (token_name !== 'ELF') {
            this.setState({
                decimals,
                tenderValue: 0
            });
            return;
        }
        // TODO: 需要更全的list
        // TODO: 这个数据，走server存到数据库去，能加速，目前大陆连这个接口太慢了。
        getPrice(token_name, result => {
            const {USD} = result;

            const balanceBigNumber = new BigNumber(balance);
            const priceBigNumber = new BigNumber(USD);
            let tenderValue = balanceBigNumber.div(Math.pow(10, decimals)).multipliedBy(priceBigNumber).toFixed(2);

            // let tenderValue = (parseFloat(USD) * balance).toLocaleString();
            tenderValue = isNaN(tenderValue) ? 0 : tenderValue;
            this.setState({
                decimals,
                tenderValue
            });
        }, () => {
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
                <NavNormal navTitle={<FormattedMessage id = 'aelf.Transaction Records' />}/>
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
                                    <Svg icon='in20'
                                         style={{display: 'inline-block', height: 20, width: 20}}
                                    />
                                </div>
                                <div><FormattedMessage id = 'aelf.Send' /></div>
                            </div>
                            <div
                                className={style.button}
                                onClick={() => hashHistory.push('/qrcode')}
                            >
                                <div className={style.icon}>
                                    <Svg icon='out20'
                                         style={{display: 'inline-block', height: 20, width: 20}}/>
                                </div>
                                <div><FormattedMessage id = 'aelf.Receive' /></div>
                            </div>
                        </div>
                    </div>

                    <div className={style.txListContainer}>
                        <TransactionsList
                            getBalanceAndTokenName={this.getBalanceAndTokenName}
                            decimals={this.state.decimals}
                            turnToDetailReady={this.state.decimals < 30}
                        />
                    </div>
                </div>

            </div>
        );
    }
}
