import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { PullToRefresh, ListView } from 'antd-mobile'

import NavToken from './NavToken/NavToken'

import Tokenlist from './Tokenlist/Tokenlist'

require('./AddToken.css')

class AddToken extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className = 'Tokenlist' >
                <NavToken />
                <Tokenlist />
            </div>
        )
    }
}

export default AddToken