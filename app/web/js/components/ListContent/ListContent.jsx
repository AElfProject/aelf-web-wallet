/*
 * huangzongzhe
 * 2018.10.19
 */
import React, {
    Component
} from 'react'

import style from './ListContent.scss'

import Svg from '../../components/Svg/Svg'

export default class ListContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let textStyle = {};
        if (this.props.type === 'small') {
            textStyle.fontSize = '14px';
        }

        return (
            <div className={style.listContainer}>
                <div className={style.listLeft}>
                    <div className={style.listIconLeft}>
                        <Svg
                            icon={this.props.icon}
                            style={{
                                width: 16,
                                height: 16
                            }}
                        ></Svg>
                    </div>
                    <div style={textStyle}>{this.props.text}</div>
                </div>
                <div>
                    <Svg
                        icon="right12"
                    ></Svg>
                </div>
            </div>
        );
    }
}