import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import style from './PursTip.scss';


function PursTip(props){
    return <p className = {style.tips}>{props.tip}</p>
};

export default PursTip