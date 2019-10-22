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
        label: '简体中文',
        value: 'zh-CN'
    },
    {
        label: 'English',
        value: 'en-US'
    },
];

class Selectlang extends React.Component {
    constructor(props) {
        super(props);
        let defaultlanguage = null;
        if (localStorage.language === 'zh-CN') {
            defaultlanguage = '简体中文';
        } else {
            defaultlanguage = 'English';
        }
        this.state = {
            language: [defaultlanguage]
        };
    }

    onChangelang(label) {

        let defaultlanguage = null;
        if (label === 'zh-CN') {
            defaultlanguage = '简体中文';
        } else {
            defaultlanguage = 'English';
        }
        this.setState({
            language: [defaultlanguage]
        });


        localStorage.setItem('language', [label]);

        window.history.go(0);
        setTimeout(() => {
          location.reload();
        }, 10);
    }

    render() {
        console.log(this.state.language);
        return (<div>
            <List className="language">
                <Picker
                    title={<FormattedMessage id='aelf.changelanguage' />}
                    extra={<FormattedMessage id='aelf.languageSelect' />}
                    data={select}
                    value={this.state.language}
                    cols={1}
                    onChange={this.onChangelang.bind(this)}
                >
                    <List.Item arrow="horizontal"><FormattedMessage id='aelf.Language' /></List.Item>
                </Picker>
            </List>
        </div>);
    }
}

const Selectlanguage = createForm()(Selectlang);

export default Selectlanguage;
