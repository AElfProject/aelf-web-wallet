/*
 * huangzongzhe
 * 2018.08.27
 */
import React, { Component } from 'react'
import NavNormal from '../../../NavNormal/NavNormal'
import style from './pages.scss'
import { FormattedMessage } from 'react-intl';
// React component
class ForgetPassword extends Component {
    render() {
        return (
            <div>
                <NavNormal></NavNormal>
                <div className={style.textContainer}>
                    {/*<h2>如何修改密码？忘记密码怎么办？</h2>*/}
                    {/*<h3>修改密码</h3>*/}
                    {/*<p>修改密码可在钱包管理界面，进行密码修改操作。</p>*/}
                    {/*<h3>忘记密码</h3>*/}
                    {/*<p>在去中心化钱包中，所有用户的用户身份验证内容，如交易密码、私钥、助记词等都保存在用户手机本地，并不是保存在中心化服务器中，所以用户如果忘记密码是没有办法通过第三方团队来重置密码的。</p>*/}
                    {/*<p>唯一的解决办法是通过重新导入助记词或者私钥来设置新的密码。</p>*/}
                    {/*<h2>How to change the password? </h2>*/}
                    <h2><FormattedMessage id = 'aelf.HelpTitle06' /></h2>
                    <p><FormattedMessage id = 'aelf.forgetpasswordCon01' /></p>
                    <p><FormattedMessage id = 'aelf.forgetpasswordCon02' /></p>
                </div>
            </div>
        );
    }
}

export default ForgetPassword;