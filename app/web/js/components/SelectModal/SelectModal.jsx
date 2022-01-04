import React, { Component } from "react";
import Style from "./SelectModal.scss";
import { FormattedMessage } from "react-intl";
import { Button } from "antd-mobile";
const SELECT = [
  {
    label: "简体中文",
    value: "zh-CN",
  },
  {
    label: "English",
    value: "en-US",
  },
];

const walletKeys = Object.keys(window.defaultConfig.WALLET_INFO);

const CHAIN_SELECT = walletKeys.map((item) => {
  return {
    label: item,
    value: item,
  };
});

export default class SelectModal extends Component {
  constructor() {
    super();
    this.state = {
      languageSelect: localStorage.language,
      chainSelect: window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID,
    };
  }

  renderLanguage() {
    const _type = this.props.type;
    if (!_type) return <div></div>;
    const selectType = _type === "language" ? "languageSelect" : "chainSelect";
    const selectData = _type === "language" ? SELECT : CHAIN_SELECT;
    return (
      <div>
        <div className="modal-select-title">
          <FormattedMessage id="aelf.changelanguage" />
        </div>
        <div className="modal-select-content">
          {selectData.map((item) => {
            return (
              <div
                className={`modal-select-content-item${
                  item.value === this.state[selectType]
                    ? " modal-select-content-item-select"
                    : ""
                }`}
                onClick={() => {
                  this.setState({
                    [selectType]: item.value,
                  });
                }}
                key={item.value}
              >
                {item.label}
              </div>
            );
          })}
        </div>
        <div className="modal-select-button-wrapper">
          <Button
            text="Next"
            className="blue"
            onClick={() => {
              this.props.onSure && this.props.onSure(this.state[selectType]);
            }}
          >
            <FormattedMessage id="aelf.Sure" />
          </Button>
          <Button
            className="white"
            onClick={() => {
              this.props.onCancel && this.props.onCancel();
            }}
          >
            <FormattedMessage id="aelf.Cancel" />
          </Button>
        </div>
      </div>
    );
  }

  renderBackup() {
    return (
      <div>
        <div className="modal-select-title">
          <FormattedMessage
            id="aelf.Copy Private Key"
            defaultMessage="Copy Private Key"
          />
        </div>
        <div className="modal-select-content ">
          <div id="privateKeyBackUp" className="modal-select-privateKey">
            {this.props.privateKey}
          </div>
        </div>
        <div className="modal-select-button-wrapper">
          <Button
            text="Next"
            className="blue"
            id="clipboard-backup"
            data-clipboard-target="#privateKeyBackUp"
            onClick={() => {
              let btn = document.getElementById("clipboard-backup");
              btn.click();
              this.props.onSure && this.props.onSure();
            }}
          >
            <FormattedMessage id="aelf.Copy" />
          </Button>
          <Button
            className="white"
            onClick={() => {
              this.props.onCancel && this.props.onCancel();
            }}
          >
            <FormattedMessage id="aelf.Cancel" />
          </Button>
        </div>
      </div>
    );
  }

  render() {
    let Children = null;
    if (this.props.type === "language" || this.props.type === "chain") {
      Children = this.renderLanguage();
    } else if (this.props.type === "backup") {
      Children = this.renderBackup();
    }
    return (
      <div
        className={Style.selectModal}
        style={{ display: this.props.visible ? "none" : "" }}
      >
        {Children}
      </div>
    );
  }
}
