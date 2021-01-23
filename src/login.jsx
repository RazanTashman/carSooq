


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
      url:'http://localhost:7000/login',
      data : JSON.stringify({
      email: this.state.email,
      password:this.state.password
      }),
      contentType: "application/json",
      success:function(data){
        console.log(data)
        localStorage.setItem ("token" ,data.token)
        localStorage.setItem ("id" ,data.id)
      },
      error: function(err){
        that.setState({emailError : err.responseText})
      }
    })
  }

render(){
  return (

<div class="signup-form">
  <form action="/profile">
		<div class="form-header">
			<h2>Log in</h2>
      </div>
        <div class="form-group">
			<label>Email Address</label>
        	<input type="email" class="form-control" name="email" required="required" onChange={this.getTheInfo.bind(this)}/>
    <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
        </div>
 <div class="form-group">
<label>Password</label>
            <input type="password" class="form-control" name="password" required="required" onChange={this.getTheInfo.bind(this)}/>
    <div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
          </div>
        </div>
        <div class="form-group">
			<button type="submit" className="btn btn-primary btn-block btn-lg" onClick={this.validate.bind(this)}>Log in</button>
		</div>
    </form>
       </div>

  /* //   <div>
  //     <Nav />

  //   <input name='email' type= 'email' placeholder="email" onChange={this.getTheInfo.bind(this)}/>
  //   <div style={{ fontSize: 12, color: "red" }}>
  //           {this.state.emailError}
  //         </div>
  //   <input name='password' placeholder="password" type='password' onChange={this.getTheInfo.bind(this)}/>
  //   <div style={{ fontSize: 12, color: "red" }}>
  //           {this.state.passwordError}
  //         </div>
  //   <button onClick={this.validate.bind(this)}>login</button>
  // </div>


=======





//////////////////////////////////////////////////
>>>>>>> 245ead9772bb6c5f14443ae2fbfd28110a2b58c1



//////////////////////////////////////////////////
 */

  )
}
}



export default Login;
