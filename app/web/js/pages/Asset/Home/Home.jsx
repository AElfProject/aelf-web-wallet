/**
 * @file Home.jsx
 * @author huangzongzhe
 * 2018.07.26
 */
import React, {Component} from 'react';
import {Toast} from 'antd-mobile';

import style from './Home.scss';
import {hashHistory} from 'react-router';

import TransactionsList from '../TransactionsList/TransactionsList';
import NavNormal from '../../NavNormal/NavNormal';

import Svg from '../../../components/Svg/Svg';

import {
    checkStatus,
    getPageContainerStyle,
    getParam,
    getBalanceAndTokenName,
    apisauce
} from '../../../utils/utils';

import {FormattedMessage} from 'react-intl';

class Home extends Component {
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

        getBalanceAndTokenName(address, contractAddress, output => {
            const {balance = 0} = output;
            this.getELFValue(balance);
            this.setState({
                balance: output.balance.toLocaleString(),
                tokenName: output.tokenDetail.name,
                contract_address: contractAddress
            });
        });
    }

    getELFValue(ELFValue) {
        // TODO: 更全的list
        apisauce.get('https://min-api.cryptocompare.com/data/price', {
            fsym: getParam('token', window.location.href),
            tsyms: 'USD'
        }).then(result => {
            const {USD} = result;
            let tenderValue = (parseFloat(USD) * ELFValue).toLocaleString();
            tenderValue = isNaN(tenderValue) ? 0 : tenderValue;
            this.setState({
                tenderValue
            });
        }).catch(error => {
            console.log('error:', error);
        });

        // fetch('https://min-api.cryptocompare.com/data/price?fsym=ELF&tsyms=USD').then(checkStatus).then(result => {
        //     result.text().then(result => {
        //         // console.log(result, this.setState);
        //         const {USD} = JSON.parse(result);
        //         const tenderValue = (parseFloat(USD) * ELFValue).toLocaleString();
        //         this.setState({
        //             tenderValue
        //         });
        //     });
        // }).catch(error => {
        //     Toast.fail(error.message, 6);
        // });

        // return ELFValue.toLocaleString();
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
                                    {this.state.balance}
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
                                         style={{ display: 'inline-block', height: 20, width: 20}}
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
                                         style={{ display: 'inline-block', height: 20, width: 20}}></Svg>
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

export default Home