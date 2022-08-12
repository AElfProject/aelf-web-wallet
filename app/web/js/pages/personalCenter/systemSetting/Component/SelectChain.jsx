/**
 * @file
 * @author zhouminghui
 * 2018.12.1
 * 未解之谜   为何突然显示了select的内容 待研究！
 */
import React from "react";
import { Picker, List } from "antd-mobile";
import { createForm } from "rc-form";
import { FormattedMessage } from "react-intl";
import SelectModal from "../../../../components/SelectModal/SelectModal";

require("./SelectLanguage.css");

const walletKeys = Object.entries(window.defaultConfig.WALLET_INFO);

const select = walletKeys.map(([key,item]) => {
  return {
    label: item.name,
    value: key,
  };
});

class SelectChain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chain: [window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID],
      visible: true,
    };
    this.onChangeChain = this.onChangeChain.bind(this);
  }

  onChangeChain(label) {
    // console.log(label, "label====");
    if (label === this.state.chain[0]) return this.setState({ visible: true });
    label = [label];
    this.setState({
      chain: [label],
      visible: true,
    });
    if (window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID === label[0]) {
      return;
    }
    window.location.href = window.defaultConfig.WALLET_INFO[label[0]].url;
  }

  onClickHandler() {
    this.setState((v) => {
      return {
        visible: !v.visible,
      };
    });
  }

  render() {
    return (
      <div>
        <List className="language">
          <Picker
            title={<FormattedMessage id="aelf.Wallet Select" />}
            data={select}
            value={this.state.chain}
            cols={1}
            disabled
            onChange={this.onChangeChain}
          >
            <List.Item
              arrow="horizontal"
              onClick={this.onClickHandler.bind(this)}
            >
              <FormattedMessage id="aelf.Wallet Select" />
            </List.Item>
          </Picker>
        </List>
        <p className="notes">
          <FormattedMessage id="aelf.Wallet Select Tip" />
        </p>
        <SelectModal
          visible={this.state.visible}
          type="chain"
          onSure={this.onChangeChain.bind(this)}
          onCancel={() => {
            this.setState({ visible: true });
          }}
        />
      </div>
    );
  }
}

export default createForm()(SelectChain);
