import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Svg from '../../../components/Svg/Svg'

import style from './Navtoken.scss'




class Navtoken extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className = {style.Navtoken}>
                <div className = {style.letbtn} > 
                    <Svg icon={"back22"}  
                        style={{ display: 'inline-block', height:36, width: 16}}
                    >
                    </Svg>
                </div>
                <div className = {style.search}>
                    <Svg key="1"
                        icon={'search16'}
                        onClick={() => this.onOpenChange()}
                        style={{width: 16, height: 16, display:'inline-block', marginLeft:'4px'}}
                    ></Svg>
                    <input 
                        className = {style.searchinput}
                        placeholder = "Please input token name."
                        type = "text"
                        // onKeyPress = {this.handleClick.bind(this)}
                        // onChange = {this.handleChange.bind(this)}
                        ref = "search"
                    />
                </div>
            </div>
        )
    }
}

export default Navtoken