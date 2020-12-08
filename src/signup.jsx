import React from 'react';
import $ from 'jquery';
import Nav from './nav'
// import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username:"",
      email:"",
      password:""
    }}
getTheInfo(event){
    this.setState({ [event.target.name]: event.target.value });

  }

signUp(){
  // var that = this
  console.log(this.state.username)
  $.ajax({
    method: 'POST',
    url:'http://localhost:7000/signup',
    data : JSON.stringify({
    username:this.state.username ,
    email: this.state.email,
    password:this.state.password
    }),
    contentType: "application/json",
    success:function(){
      console.log('success')
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
{/* <div class="container">
  <div class="row">
    <div class="col-lg-6 col-xl-6 mx-auto">
      <div class="card card-signin flex-row my-5" style="background-color: rgba(255, 255,255, 0.2);">
        <div class="card-img-left d-none d-md-flex" >
        </div>
        <div class="card-body">
          <h5 class="card-title text-center">Register</h5>
          <form class="form-signin">
            <div class="form-label-group">
              <label for="inputUserame"  style="font-weight: bold; color :rgba(0, 0,0, 1)" >Username</label>
              <input type="text" class="form-control" placeholder="Username" name="username"  onChange={this.getTheInfo.bind(this)} required autofocus >
            </div> <br>
            <div class="form-label-group">
              <label for="inputEmail" style="font-weight: bold; color :rgba(0, 0,0, 1)">Email address</label>
              <input type="email" class="form-control" placeholder="Email address"  name='email' onChange={this.getTheInfo.bind(this)} required>
            </div>
             <br>
            <div class="form-label-group">
              <label for="inputPassword" style="font-weight: bold; color :rgba(0, 0,0, 1)">Password</label>
              <input type="password"  class="form-control" placeholder="Password" name="password" onChange={this.getTheInfo.bind(this)} required>
            </div>
            <br>
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit"  style="color:white;background-color: black;" onClick={this.signUp.bind(this)}>Sign up</button>
         </form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>*/}
</div>

  )
   }
  }
export default Signup
