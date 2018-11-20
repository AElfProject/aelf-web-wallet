/*
 * zhouminghui
 * 2018.11.17
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Rollbar from './Rollbar/Rollbar';

import style from './Feeselect.scss';

class Feeselect extends React.Component{
    
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div className = {style.Touchbar}>
                <div className = {style.Touchbar_title} >{this.props.title}</div>
                <Rollbar />
            </div>
        )
    }
}

export default Feeselect
