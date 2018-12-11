/**
 *  @file
 *  @author zhouminghui
 *  2018.11.20
 *  Code formatting completed
*/

import React from 'react';
import style from './PursTip.scss';

export default function PursTip(props) {
    return <p className = {style.tips}>{props.tip}</p>;
}
