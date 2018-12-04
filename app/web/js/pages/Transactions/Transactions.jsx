/*
* 2018.11.23
* zhouminghui
*/

import React, {Component} from "react";
import ReactDOM from "react-dom";

import TransactionsNav from "./TransactionsNav/TransactionsNav"

require("./Transactions.css");


class TransactionsList extends React.Component{
    
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div>
               <TransactionsNav />
            </div>
        )
    }
    
    
}

export default TransactionsList