/**
 * @file
 * @author zhouminghui
 * 2018.12.1
 * 未解之谜   为何突然显示了select的内容 待研究！
 */
import React from "react";
import { Picker, List, Button } from "antd-mobile";
import { createForm } from "rc-form";
import { FormattedMessage } from "react-intl";
import SelectModal from "../../../../components/SelectModal/SelectModal";
require("./SelectLanguage.css");

const select = [
  {
    label: "简体中文",
    value: "zh-CN",
  },
  {
    label: "English",
    value: "en-US",
  },
];

class Selectlang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: [localStorage.language],
      visible: true,
      selectVal: localStorage.language,
    };
  }

  onChangelang(label) {
    if (label === this.state.language[0])
      return this.setState({
        visible: true,
      });

    this.setState({
      language: [label],
      visible: true,
    });

    localStorage.setItem("language", [label]);

    window.history.go(0);
    setTimeout(() => {
      location.reload();
    }, 10);
  }

  onClickHandler() {
    this.setState((v) => {
      return {
        visible: !v.visible,
      };
    });
  }

  render() {
    console.log("this.state.language", this.state.visible);
    return (
      <div>
        <List className="language">
          <Picker
            title={<FormattedMessage id="aelf.changelanguage" />}
            extra={<FormattedMessage id="aelf.languageSelect" />}
            data={select}
            value={this.state.language}
            cols={1}
            disabled
            // onChange={this.onChangelang.bind(this)}
          >
            <List.Item
              arrow="horizontal"
              onClick={this.onClickHandler.bind(this)}
            >
              <FormattedMessage id="aelf.Language" />
            </List.Item>
          </Picker>
        </List>
        <SelectModal
          visible={this.state.visible}
          type="language"
          onSure={this.onChangelang.bind(this)}
          onCancel={() => {
            this.setState({ visible: true });
          }}
        />
      </div>
    );
  }
}

const Selectlanguage = createForm()(Selectlang);

export default Selectlanguage;
