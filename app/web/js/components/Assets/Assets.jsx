/*
 * huangzongzhe
 * 2018.07.26
 */
import React, { Component } from 'react'
import { WhiteSpace, List } from 'antd-mobile'
import style from './Assets.scss'
import { hashHistory } from 'react-router'

const Item = List.Item;
// React component
// TODO, 这里以后考虑使用ListView
// https://mobile.ant.design/components/list-view-cn/#components-list-view-demo-basic
class Assets extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    getAssets() {
        //1. get Assets From address
        //2. getBalanceOf Assets
    }
  
    render() {
        let test = hashHistory.getCurrentLocation().search;
        let dir = '/assethome?contract=0x8eaa0485799932c2c30f869f15e75e265402'

        return (
            <div>
                <List>
                    <Item extra={'233 skr skr'}
                    onClick={() => hashHistory.push(dir)}
                    >{test}</Item>
                </List>
                <List>
                    <Item extra={'11111'}>Click the first list</Item>
                </List>
                <List>
                    <Item extra={'11111'}>tokenName</Item>
                </List>
            </div>
        );
    }
}

export default Assets