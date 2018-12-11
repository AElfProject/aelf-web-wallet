/*
 * huangzongzhe
 * 2018.11.15
 */
import React, {
    Component
} from 'react'

import { List } from 'antd-mobile'

import { hashHistory } from 'react-router'
import NavNormal from '../../NavNormal/NavNormal'

import AelfList from '../../../components/List/List'
import NoticePanel from '../../../components/NoticePanel/NoticePanel'

import SelectLanguage from './Component/SelectLanguage';

import { FormattedMessage } from 'react-intl';

require('./SystemSetting.css');

const Item = List.Item;
class SystemSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: [localStorage.language]
        }
    }
    renderList() {
        let type = 'small';
        let lists = [
            {
                url: '/personalcenter/systemsetting/network',
                text: 'Network',
                type: type
            }
        ];

        let listHtml = lists.map(item => {
            return <AelfList
                key={item.text}
                onClick={() => hashHistory.push(item.url)}
                text={<FormattedMessage id={'aelf.' + item.text} defaultMessage={item.text} />}
                type={item.type}
            ></AelfList>
        });

        return listHtml;
    }

    render() {
        let listHtml = this.renderList();

        return (
            <div className='aelf-personal-pages aelf-solid'>
                <NavNormal></NavNormal>
                <div className='aelf-blank40'></div>
                <NoticePanel
                    mainTitle={<FormattedMessage id='aelf.System Setting' defaultMessage='System Setting' />}
                    iconHidden={true}
                ></NoticePanel>
                <div className='aelf-blank16'></div>
                {listHtml}
                <SelectLanguage />
            </div>
        );
    }
}

export default SystemSetting