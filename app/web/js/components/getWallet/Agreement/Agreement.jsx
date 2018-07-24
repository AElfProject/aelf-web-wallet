import React, { Component } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import style from './Agreement.scss'
import { hashHistory } from 'react-router'

// React component
class Agreement extends Component {
    constructor() {
        super();
    }

    // TODO, 条款看完滚到底才能点击同意条款
    // nextPage() {
    //     // TODO 
    //     hashHistory.push('/');
    // }
  
    render() {
        return (
            <div>
                <div className={style.center}>
                    <h3>AELF使用条款</h3>
                </div>
                <WhiteSpace />
                <div className={style.textContainer}>
                    这里放条款
                </div>
                <WhiteSpace />
                {/*<Button onClick={() => this.nextPage()}>已阅读并且同意条款</Button>*/}
                <Button onClick={() => hashHistory.push('/get-wallet/guide')}>已阅读并且同意条款</Button>
            </div>
        );
    }
}

export default Agreement