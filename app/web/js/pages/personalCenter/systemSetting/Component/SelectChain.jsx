/**
 * @file
 * @author zhouminghui
 * 2018.12.1
 * 未解之谜   为何突然显示了select的内容 待研究！
 */
import React from 'react';
import {Picker, List} from 'antd-mobile';
import {createForm} from 'rc-form';
import {FormattedMessage} from 'react-intl';

require('./SelectLanguage.css');

const select = [
  {
    label: 'AELF',
    value: 'AELF'
  },
  {
    label: 'tDVV',
    value: 'tDVV'
  },
  {
    label: 'tDVW',
    value: 'tDVW'
  },
  {
    label: 'tDVX',
    value: 'tDVX'
  },
  {
    label: 'tDVY',
    value: 'tDVY'
  },
  {
    label: 'tDVZ',
    value: 'tDVZ'
  },
];

class SelectChain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chain: [window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID]
    };
    this.onChangeChain = this.onChangeChain.bind(this);
  }

  onChangeChain(label) {
    this.setState({
      chain: label
    });
    if (window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID === label[0]) {
      return;
    }
    window.location.href = window.defaultConfig.WALLET_INFO[label[0]];
  }

  render() {
    return (<div>
      <List className="language">
        <Picker
          title={<FormattedMessage id='aelf.Wallet Select' />}
          data={select}
          value={this.state.chain}
          cols={1}
          onChange={this.onChangeChain}
        >
          <List.Item arrow="horizontal"><FormattedMessage id='aelf.Wallet Select' /></List.Item>
        </Picker>
      </List>
      <p className="notes"><FormattedMessage id='aelf.Wallet Select Tip' /></p>
    </div>);
  }
}

export default createForm()(SelectChain);
