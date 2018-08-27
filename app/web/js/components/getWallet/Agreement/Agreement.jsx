import React, { Component } from 'react'
import { Button, WhiteSpace } from 'antd-mobile'
import style from './Agreement.scss'
import { hashHistory } from 'react-router'

import Service from './Service'
import Privacy from './Privacy'

// React component
class Agreement extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        let agreementDisplay = this.props.agreementDisplay;
        let argeementStyle = agreementDisplay ? { display: 'block' } : { display: 'none' };
        argeementStyle.height = document.documentElement.offsetHeight;
        
        console.log('agreementDisplay： ', agreementDisplay);
        return (
            <div>
                <div style={ argeementStyle } className={ style.agreement }>
                    <div className={style.center}>
                        <h3>AELF钱包服务协议与隐私政策</h3>
                    </div>
                    <WhiteSpace />
                    <div className={style.textContainer} style={{
                        height: document.documentElement.clientHeight - 150
                    }}>
                        
                        <Service></Service>
                        <Privacy></Privacy>

                    </div>
                    <WhiteSpace />
                    {/*<Button onClick={() => this.nextPage()}>已阅读并且同意条款</Button>*/}
                    {/*<Button onClick={() => hashHistory.push('/get-wallet/guide')}>已阅读并且同意 / Agree</Button>*/}
                    <Button onClick={this.props.toggleAgreement}>朕已阅</Button>
                </div>
            </div>
        );
    }
}

export default Agreement