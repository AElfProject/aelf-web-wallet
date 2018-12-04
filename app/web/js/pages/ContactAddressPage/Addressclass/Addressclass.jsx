/*
  2018.11.21
  zhouminghui
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { SwipeAction, List } from 'antd-mobile';

require('./Addressclass.css');

function compare (property){
     return function(a,b){
         var t1 = a[property];
         var t2 = b[property];
         return t1.localeCompare(t2)
     }
 }

function uniq(array){
    array.sort();
    var temp=[array[0]];
    for(var i = 1; i < array.length; i++){
        if( array[i] !== temp[temp.length-1]){
            temp.push(array[i]);
        }
    }
    return temp;
}

function pySegSort(arry){
    let addressclass = arry;
    
    if(addressclass == undefined){
        return;
    }else if(addressclass.lenght === 0){
        return;
    }else{
        let arry_ = [];
        let newAddressclass = addressclass.sort(compare("srt"));
        
        return newAddressclass;
    }
}


function Addresslist(props){
    
    if(props.father.state.content == undefined){
        return;
    }else if(props.father.state.content.lenght === 0){
        return;
    }
    
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    let content  = props.father.state.newcontent;
    let signet = -2;
    let othersignet = -1;
    
    const listitem = content.map(function(content,index){
        if(signet != letters.indexOf(content.srt) && letters.indexOf(content.srt) != -1){
            signet = letters.indexOf(content.srt);
            return(
                <div key = {index}>
                    <div className = "ListClass">{letters[signet]}</div>
                    <SwipeAction
                        autoClose
                        right={[
                            {
                            text: 'DELETE',
                            onPress:() => {
                               props.father.state.newcontent.splice(index,1);
                               let Message = props.father.state.newcontent;
                               let Content = {
                               	"content":Message
                               }
                               props.father.forceUpdate();
                               localStorage.setItem("content",JSON.stringify(Content))
                            },
                            style: { backgroundColor: '#FF0080', color: 'white' },
                            },
                        ]}
                    >
                    <div className = "listname" >{content.name}</div>
                    <div className = "listaddress" >{content.address}</div>
                    </SwipeAction>
                </div>
            )
        }else{
            if(letters.indexOf(content.srt) === -1){
                return false
            }
            return(
                <div key = {index}>
                    <SwipeAction
                        autoClose
                        right={[
                            {
                            text: 'DELETE',
                            onPress:() => {
                               props.father.state.newcontent.splice(index,1);
                               let Message = props.father.state.newcontent;
                               let Content = {
                               	"content":Message
                               }
                               props.father.forceUpdate();
                               localStorage.setItem("content",JSON.stringify(Content));
                            },
                            style: { backgroundColor: '#FF0080', color: 'white' },
                            }
                        ]}
                    >
                    <div className = "listname" >{content.name}</div>
                    <div className = "listaddress" >{content.address}</div>
                    </SwipeAction>
                </div>
            )
        }
    })
    
    
    const Otherlist = content.map(function(content,index){
        if(letters.indexOf(content.srt) === othersignet){
                othersignet = -2;
                return(
                    <div key = {index}>
                        <div className = "ListClass">#</div>
                        <SwipeAction
                            autoClose
                            right={[
                                {
                                text: 'DELETE',
                                onPress:() => {
                                    props.father.state.newcontent.splice(index,1);
                                    let Message = props.father.state.newcontent;
                                    let Content = {
                                        "content":Message
                                    }
                                    props.father.forceUpdate();
                                    localStorage.setItem("content",JSON.stringify(Content));
                                },
                                style: { backgroundColor: '#FF0080', color: 'white' },
                                },
                            ]}
                        >
                        <div className = "listname" >{content.name}</div>
                        <div className = "listaddress" >{content.address}</div>
                        </SwipeAction>
                    </div>
                )
            
        }else{
            if( letters.indexOf(content.srt) == -1 ){
                return(
                    <div key = {index}>
                        <SwipeAction
                            autoClose
                            right={[
                                {
                                text: 'DELETE',
                                onPress:() => {
                                    props.father.state.newcontent.splice(index,1);
                                    let Message = props.father.state.newcontent;
                                    let Content = {
                                        "content":Message
                                    }
                                    props.father.forceUpdate();
                                    localStorage.setItem("content",JSON.stringify(Content));
                                },
                                style: { backgroundColor: '#FF0080', color: 'white' },
                                }
                            ]}
                        >
                        <div className = "listname" >{content.name}</div>
                        <div className = "listaddress" >{content.address}</div>
                        </SwipeAction>
                    </div>
                )
            } 
        }
    })
    
    return(
    	<div>
    		{listitem}
    		{Otherlist}
    	</div>
    )
  }




class Addressclass extends React.Component{
    constructor(props){
    	super(props);
      this.state = {
          content:JSON.parse(localStorage.content).content,
          newcontent:[]
      }
    }
    
    componentDidMount(){
       let newAddress = pySegSort(JSON.parse(localStorage.content).content);
       this.setState({
         newcontent:newAddress
       })
    }
    
    render(){
        return(
            <div className = "addresslist">
                <Addresslist list = {this.state.newcontent} father = {this} />
            </div>
        )
    }
    
}

export default Addressclass