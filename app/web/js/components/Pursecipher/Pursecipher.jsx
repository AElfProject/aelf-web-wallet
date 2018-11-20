/*
 * zhouminghui
 * 2018.11.17
 */
/* <Aelfpassword tip='钱包密码' aelficon = 'notice32' /> */


import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Svg from '../Svg/Svg';

/*tip组件*/
import PursTip from './tips/PursTip';

/*按钮组件*/
import Button from './Button/Button';

/*样式表*/
import style from './Pursecipher.scss';

class Pursecipher extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            password: '',
            key: '1234',
            times:5,
            ButtonStyle:false,
            passwordopacity:false,
            CheckCompletion:false
            
        }
    }
   
    inputPassword() {
        this.state.password = this.refs.password.value;
        if(this.state.password.length > 0)
        {
          this.setState({
            passwordopacity:true,
            ButtonStyle:true
          })
        }else{
          this.setState({
          	passwordopacity:false,
            ButtonStyle:false,
          })
        }
    }
    
    
    CheckPassword(password){
      if(this.state.ButtonStyle && this.state.times != 0){
          if(this.state.key === this.state.password){
            this.setState({
                CheckCompletion:false,
            });
            /*TODO*/
          }else{
              this.setState({
              	CheckCompletion:true,
              });
              this.state.times--;
          }
      }
    }
    
    
    render(){
        
        let CheckState = {
        	show:{
        		opacity:1
        	},
        	hide:{
        		opacity:0
        	}
        }
        
        return(
            <div className = {style.TranderPassword} >
            	<PursTip tip = {this.props.tip} />
                <div className = {style.passwordbox}>
                    <input
                        className = {(this.state.passwordopacity)? style.passwordinput2:style.passwordinput}
                    	type="password"
                    	placeholder="输入钱包密码"
                        ref = "password"
                        onChange = {this.inputPassword.bind(this)}
                    />
                </div>
                <div 
                    className = {style.passwordtip} 
                    style={(this.state.CheckCompletion)?CheckState.show:CheckState.hide}
                >
                    <Svg icon={this.props.aelficon}  
                         style={{ display: 'inline-block', height: 16, width: 16}}>
                    </Svg>
                    <span>密码错误，您还有{this.state.times}次机会</span>
                </div>
                <Button title='下一步' ButtonStyle={this.state.ButtonStyle} onClick={this.CheckPassword.bind(this)}/>
            </div>
        )
    }
}

export default Pursecipher
