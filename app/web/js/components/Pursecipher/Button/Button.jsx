import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import style from './Button.scss';

class Button extends React.Component{
    constructor(props){
        super(props); 
    }
    
    render(){
        return (
            <div 
                className = {style.Button} 
                style={(this.props.ButtonStyle)?{opacity:1}:{opacity:.3}} 
                onClick = {this.props.onClick}
            >
                <span>{this.props.title}</span>
            </div>
        )
    }
}

export default Button