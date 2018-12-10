/**
 *  @file
 *  @author zhouminghui
 *  2018.11.20
 *  Code formatting completed
 */

import React from 'react';

import {GradientColor} from '../../../utils/GradientColor';

import style from './SelectBar.scss';

export default class SelectBar extends React.Component {
    constructor(props) {
        super(props);
        this.colorlist = new GradientColor('#2b0081', '#ac00e6', 40);
    }

    listItem() {
        const listItem = this.colorlist.map(colorlist =>
            <div
                key={colorlist}
                className={style.unbar}
                style={{background: colorlist, opacity: 1, marginLeft: this.props.marginLeft + 'px'}}
            ></div>
        );
        return listItem;
    }

    render() {
        let listitem = this.listItem();
        return (
            <div
                style={{width: this.props.initialize}}
                className={style.selectbar}
            >{listitem}</div>
        );
    }
}
