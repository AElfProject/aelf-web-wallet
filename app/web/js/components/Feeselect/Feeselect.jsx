/**
 *  @file
 *  @author zhouminghui
 *  2018.11.20
 *  Code formatting completed
 */

import React from 'react';
import RollBar from './RollBar/RollBar';
import style from './FeeSelect.scss';

export default class FeeSelect extends React.Component {
    render() {
        return (
            <div className={style.touchbar}>
                <div className={style.touchbar_title} >{this.props.title}</div>
                <RollBar rate={0.001} />
            </div>
        );
    }
}
