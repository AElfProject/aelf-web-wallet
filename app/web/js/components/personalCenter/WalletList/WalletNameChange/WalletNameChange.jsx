/*
 * huangzongzhe
 * 2018.08.24
 */
import React, {
	Component
} from 'react'

import { WhiteSpace, List, InputItem, Button, Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'

import NavNormal from '../../../NavNormal/NavNormal'

import moneyKeyboardWrapProps from '../../../../utils/moneyKeyboardWrapProps'
import insertWalletInfo from '../../../../utils/walletStorage'

const Item = List.Item;
class WalletNameChange extends Component {
	constructor() {
        super();
        this.state = {
        	name: ''
        };
    }

    inputName(name) {
        this.setState({
            name: name
        });
    }

    changeName() {
        let walletId = JSON.parse(localStorage.getItem('lastuse')).address;
        let walletInfoList = JSON.parse(localStorage.getItem('walletInfoList'));
        let walletInfo = walletInfoList[walletId];
        walletInfo.walletName = this.state.name;

        insertWalletInfo(walletInfo, false);
        Toast.success('修改成功', 1.5, () => {
            hashHistory.goBack();
        }, false)
    }

	render() {
        let changeButton = '';
        if (this.state.name && true) {
            changeButton = <Button onClick={() => this.changeName()}>确认修改</Button>;
        }

		return (
			<div>
                <NavNormal navTitle="修改名称"></NavNormal>
                <div className="aelf-white-space"></div>
				<List>
                    <InputItem
                        value={this.state.name}
                        type="text"
                        placeholder="新名称"
                        onChange={name => this.inputName(name)}
                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                    ></InputItem>
                </List>

                <WhiteSpace />
                {changeButton}
			</div>
		);
	}
}

export default WalletNameChange