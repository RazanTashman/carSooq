


import React from 'react';
import $ from 'jquery';
import Nav from './nav'
import { Link } from 'react-router-dom'

// import { Link } from 'react-router-dom';
  const initialState={
      email:"",
      emailError:"",
      password:"",
      passwordError:""}


      const obj ={
        emailError:"",
        passwordError:""
      }
class Login extends React.Component {


  constructor() {
    super()
    this.state = initialState}

 getTheInfo(event){
     this.setState({ [event.target.name]: event.target.value });
     this.handleSubmit()
    }
    //
    validate () {
      let emailError = "";
      let passwordError = "";

      if (!this.state.email) {
        emailError = "Email required ";
      }
      if (!this.state.password) {
        passwordError = "Password required ";
      }
      if (!this.state.email.includes("@") && this.state.email !== "") {
        emailError = "invalid email";
      }
      if (this.state.password.length < 8  && this.state.password !== "" ) {
        passwordError = "Password must be longer than 8 characters";
      }

      if (emailError  || passwordError) {
        this.setState({ emailError:emailError,  passwordError:passwordError});
        return false;
      }else{
      this.login()}

    };
    handleSubmit( event ) {
      if ( this.state.emailError ||this.state.usernameError ||  this.state.password){

          this.setState(obj);
        }
      };


  login(){

var that =this
    $.ajax({
      method: 'POST',
      url:'http://localhost:9000/login',
      data : JSON.stringify({
      email: this.state.email,
      password:this.state.password
      }),
      contentType: "application/json",
      success:function(data){
        console.log(data)
        localStorage.setItem ("token" ,{ token :data})},
      error: function(err){
        that.setState({emailError : err.responseText})
        window.location.reload();
      }
    })
  }

render(){
  return (



    <div>
      <Nav />

    <input name='email' type= 'email' placeholder="email" onChange={this.getTheInfo.bind(this)}/>
    <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
    <input name='password' placeholder="password" type='password' onChange={this.getTheInfo.bind(this)}/>
    <div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
          </div>
    <button onClick={this.validate.bind(this)}>login</button>
  </div>





//////////////////////////////////////////////////


  )
}
}



export default Login;
