/*
 * huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Toast } from 'antd-mobile'

import style from './Home.scss'
import { hashHistory } from 'react-router'
import getParam from '../../../utils/getParam' // 还有类似方法的话，合并一下。

import TransactionsList from '../TransactionsList/TransactionsList'
import NavNormal from '../../NavNormal/NavNormal'

import checkStatus from '../../../utils/checkStatus'

class Home extends Component {
    constructor() {
        super();

        this.state = {
            tokenName: '-',
            balance: '-'
        };

        // 得把作用域绑上，不然子组件里执行函数，无法执行this.setState这些。
        this.getBalanceAndTokenName = this.getBalanceAndTokenName.bind(this);

        this.walletAddress = JSON.parse(localStorage.getItem('lastuse')).address;
    }

    componentDidUpdate() {
        Toast.hide();
    }

    // getCid from url. -> get Balance -> getTransactions
    getBalanceAndTokenName() {
        let params = {
            address: this.walletAddress,
            contract_address: getParam('contract_address', window.location.href)
        };

        let query = '';
        for (let each in params) {
            query += `${each}=${params[each]}&`;
        }

        fetch(`/block/api/address/balance?${query}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(checkStatus).then(result => {
            result.text().then(result => {
                let output = JSON.parse(result);

                this.setState({
                    balance: output.balance,
                    tokenName: output.tokenDetail.name,
                    contract_address: params.contract_address
                });
            })
        }).catch(error => {
            console.log('error:', error);
        });
    }

    componentDidMount() {
        this.getBalanceAndTokenName();
    }

    componentWillUnmount() {
        this.WillUnmount = true;
        this.setState = () => {};
    }

    render() {

        let btnlink =  `/assettransfer?contract_address=${getParam('contract_address', window.location.href)}`;

        return (
            <div>
                <NavNormal navTitle="交易记录"></NavNormal>
                <div className="aelf-content-container">
                    <h3>tokenName: {this.state.tokenName}</h3>
                    <h3>balance: {this.state.balance}</h3>

                    <TransactionsList
                        getBalanceAndTokenName={this.getBalanceAndTokenName}
                    ></TransactionsList>

                    <div className={style.transfer}>
                        <Button
                            onClick={() => hashHistory.push(btnlink)}
                        >转账</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home