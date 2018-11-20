/*
 * zhouminghui
 * 2018.11.20
 */


import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import style from './Rollbar.scss';

require('./Rollbar.css')

// Gradient算法  计算该色值区域中的渐变色色值
function gradientColor(startColor,endColor,step){
    this.startRGB = this.colorRgb(startColor);
    this.startR = this.startRGB[0];
    this.startG = this.startRGB[1];
    this.startB = this.startRGB[2];
    this.endRGB = this.colorRgb(endColor);
    this.endR = this.endRGB[0];  
    this.endG = this.endRGB[1];
    this.endB = this.endRGB[2];
    this.sR = (this.endR-this.startR)/step;
    this.sG = (this.endG-this.startG)/step;
    this.sB = (this.endB-this.startB)/step;
    var colorArr = [];
    for(var i=0;i<step;i++){
        var hex = this.colorHex('rgb('+parseInt((this.sR*i+this.startR))+','+parseInt((this.sG*i+this.startG))+','+parseInt((this.sB*i+this.startB))+')');
        colorArr.push(hex);
    }
  return colorArr;
 }
 
 gradientColor.prototype ={
    colorRgb:function(sColor){
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = sColor.toLowerCase();
        if(sColor && reg.test(sColor)){
           if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
             sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
           }
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
           return sColorChange;
        }else{
           return sColor;
        }
    },
    colorHex:function(rgb){
        var _this = rgb;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(/^(rgb|RGB)/.test(_this)){
            var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g,"").split(",");
            var strHex = "#";
            for(var i=0; i<aColor.length; i++){
                var hex = Number(aColor[i]).toString(16);
                hex = hex<10 ? 0+''+hex :hex;
                if(hex === "0"){
                    hex += hex;
                }
                strHex += hex;
            }
            if(strHex.length !== 7){
                strHex = _this;
            }
            return strHex;
        }else if(reg.test(_this)){
                var aNum = _this.replace(/#/,"").split("");
                if(aNum.length === 6){
                    return _this;
                }else if(aNum.length === 3){
                    var numHex = "#";
                    for(var i=0; i<aNum.length; i+=1){
                        numHex += (aNum[i]+aNum[i]);
                    }
                return numHex;
                }
        }else{
            return _this;
        }
    }
}

function Defaultbar(props){
    
    let numbers = [];
    for(var i = 0; i < 40 ; i++){
        numbers[i] = i;
    };
    
    
    const listItem = numbers.map((numbers)=>
            <div key ={numbers.toString()} className = {style.unbar} style={{marginLeft:props.marginleft + 'px'}}></div>
    )
   
    return( 
        <div className = {style.defaultbar} >{listItem}</div>
    )
}

function Slelectbar(props){
    
    let colorlist = new gradientColor('#2b0081','#ac00e6',40);
    
    const listItem = colorlist.map((colorlist)=>
        <div key ={colorlist} className = {style.unbar} style={{background:colorlist,opacity:1,marginLeft:props.marginleft + 'px'}} ></div>
    )
    
    return( 
        <div style = {{width:props.initialize}} className = {style.selectbar} >{listItem}</div>
    )
}


class Rollbar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            barwidth:0,
            initialize:0,
            marginleft:0,
            rate:0.001,
            unitprice:0
        }
        // this.selectbarWidth = this.refs.selectbar.clientWidth;
    }
    
    componentDidMount() {
        const selectbarWidth = this.refs.selectbar.clientWidth;
        const margleft = ((selectbarWidth - 80) / 40.0 );
        const barwidth = 20 * ( margleft + 2 );
        const unitprice = this.state.rate * 20;
        this.setState({
            initialize:selectbarWidth,
            barwidth:barwidth,
            marginleft:margleft,
            unitprice:unitprice
        });
    }    
    
    Clickhotsport(e){
        let touchlist = e.touches[0];
        let touchClientX = touchlist.clientX - this.refs.selectbar.offsetLeft;
        if(touchClientX != null && touchClientX > 0 && touchClientX < this.state.initialize){
            touchClientX = touchClientX.toFixed(3);
            let scrollleft = parseInt(touchClientX / (this.state.marginleft + 2)) * (this.state.marginleft+2);
            let unitprice = this.state.rate * (parseInt(touchClientX / (this.state.marginleft + 2)) + 1)
            this.setState({
                barwidth:scrollleft,
                unitprice: unitprice
            });
        }
    }
    
    render(){
        return(
          <div>
              <div className = {style.barbox} onTouchStart = {this.Clickhotsport.bind(this)} ref = 'selectbar' onTouchMove = {this.Clickhotsport.bind(this)} >
                  <Defaultbar marginleft = {this.state.marginleft}/>
                  <div className = {style.Selectmv} style = {{left:this.state.barwidth}}></div>
                  <div className = {style.SelectbarContainer} style = {{width:this.state.barwidth}}>
                      <Slelectbar initialize = {this.state.initialize} marginleft = {this.state.marginleft} />
                  </div>
              </div>
              <div className = {style.speed} ><span>慢</span><span>快</span></div>
              <div className = {style.fee}>{this.state.unitprice}aelf</div>
          </div>
        )
    }
}

export default Rollbar