import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import {handleLoginApi} from '../../services/userService';
import * as actions from "../../store/actions";

import './Login.scss';


class Login extends Component {

    state = {
        email:'',
        password:'',
        status: true,
        error:''
    }

    handleChangeUser = (e)=>{
        this.setState({
            email:e.target.value
        })
    }
    handleChangePass = (e)=>{
        this.setState({
            password:e.target.value
        })
    }
    handleSubmitUser = async()=>{
       try {
           this.setState({
            error:''
           })
    let data =   await handleLoginApi(this.state.email , this.state.password)

    if(data && data.user.code !== 4){
        this.setState({
            error: data.user.mess
           })
    }
    if(data && data.user.code === 4){
        // console.log(data.user.data);
        this.props.userLoginSuccess(data.user.data)
    }

       } catch (e) {
          
        if(e.response){
            if(e.response.data){            
                this.setState({
                    error: e.response.data.user.mess
                })
            }
        }
      }
    }
    togglePass = ()=>{

       this.setState({
            status: !this.state.status
       })
    }
    render() {       
    const {email,password,status,error} =this.state
        return (
            <div className="container">
                <section id="content">    
                <div>               
                        <h1>Login Form</h1>
                        <div>
                            <input type="text"
                             placeholder="Username" 
                             value={email}
                             onChange={(e)=>this.handleChangeUser(e)}
                             required="" id="email" />
                        </div>
                        <div>
                            <input 
                            type={status ? 'password' : 'text'}
                            placeholder="Password" 
                            value={password}
                            onChange={(e)=>this.handleChangePass(e)}
                            required="" 
                            id="password" />
                            <i className={status ? "far fa-eye" : "far fa-eye-slash"}
                                onClick={this.togglePass}
                            ></i>
                        </div>
                        <div>
                            <button  onClick={this.handleSubmitUser} >Submit</button>
                            <a href="#">Lost your password?</a>
                            <a href="#">Register</a>
                        </div>      
                        <div className={(error) ?"alert alert-danger" : " "}>{error}</div>            
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess :(userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
