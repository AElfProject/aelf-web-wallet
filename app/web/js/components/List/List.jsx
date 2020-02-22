/*
 * huangzongzhe
 * 2018.10.20
 */
import React, {
    Component
} from 'react'
import { List } from 'antd-mobile'

import style from './List.scss'

import Svg from '../../components/Svg/Svg'

const Item = List.Item;
export default class AelfList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let textStyle = {};
        if (this.props.type === 'small') {
            textStyle.fontSize = '14px';
        }
        let listIconLeftHtml = '';
        if (this.props.icon) {
            listIconLeftHtml =
                <div className={style.listIconLeft}>
                    <Svg
                        icon={this.props.icon}
                        style={{
                            width: 16,
                            height: 16
                        }}
                    />
                </div>;
        }

        return (
            <List className='aelf-list'>
                <Item onClick={() => this.props.onClick()}>
                    <div className={style.listContainer}>
                        <div className={style.listLeft}>
                            {listIconLeftHtml}
                            <div style={textStyle}>{this.props.text}</div>
                        </div>
                        <div>
                            <Svg
                                icon="right12"
                            />
                        </div>
                    </div>
                </Item>
            </List>
        );
    }
}
