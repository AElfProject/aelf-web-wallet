/**
 *  @file
 *  @author zhouminghui
 *  2018.11.20
 *  Code formatting completed
 */

import React from 'react';

import style from './DefaultBar.scss';

export default class DefaultBar extends React.Component {
    constructor(props) {
        super(props);
        this.numbers = [];
        for (let i = 0; i < 40; i++) {
            this.numbers[i] = i;
        }
    }

    listItem() {
        const listItem = this.numbers.map(numbers =>
            <div
                key={numbers.toString()}
                className={style.unbar}
                style={{marginLeft: this.props.marginLeft + 'px'}}
            ></div>
        );
        return listItem;
    }

    render() {

        let listCollection = this.listItem();
        return (
            <div className={style.defaultbar} >{listCollection}</div>
        );
    }
}
