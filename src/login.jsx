


import React from 'react';
import $ from 'jquery';
import Nav from './nav'
// import { Link } from 'react-router-dom';
class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email:"",
      password:""
    }}
 getTheInfo(event){
     this.setState({ [event.target.name]: event.target.value });
    }
  login(){
    $.ajax({
      method: 'POST',
      url:'http://localhost:3000/login',
      data : JSON.stringify({
      email: this.state.email,
      password:this.state.password
      }),
      contentType: "application/json",
      success:function(data){
        console.log(data)
      },
      error: function(err){
        console.log('error:' ,err)
      }
    })
  }

render(){
  return (



    <div>
      <Nav />
    <input name='email' type= 'email' placeholder="email" onChange={this.getTheInfo.bind(this)}/>
    <input name='password' placeholder="password" type='password' onChange={this.getTheInfo.bind(this)}/>
    <button onClick={this.login.bind(this)}>login</button>
    </div>





//////////////////////////////////////////////////


  )
}
}



export default Login;
