import React, { Component } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import style from './Import.scss'
import { hashHistory } from 'react-router'

// React component
class Import extends Component {
    constructor() {
        super();
    }

    createAndGO() {
        // hashHistory.push('/');
    }
  
    render() {
        return (
            <div>
                <div>
                    <h3>导入钱包</h3>
                </div>
                <WhiteSpace />
                <div>
                    助记词填空
                </div>
                <WhiteSpace />
                <div>
                    私钥填空
                </div>
                <WhiteSpace />
                <div>
                    密码填空
                </div>
                <WhiteSpace />
                <div>
                    密码确认
                </div>
                <WhiteSpace />
                {/*<Button onClick={() => this.nextPage()}>已阅读并且同意条款</Button>*/}
                <Button onClick={() => this.createAndGO()}>生成密码</Button>
            </div>
        );
    }
}

export default Import