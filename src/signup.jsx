import logo from './logo.svg';
import React from 'react';
import $ from 'jquery';
import { storage } from './firebase/firebase'
import { Link } from 'react-router-dom'

import Nav from './nav'
const initialState={
    username:"",
      usernameError:"",
      email:"",
      emailError:"",
      password:"",
      passwordError:"",
      image:null,
      imageError:"",
      url:"",
      nameOftheimage:""
    }
const obj ={
  emailError:"",
  passwordError:"",
  usernameError:""
}
class Signup extends React.Component {

  constructor() {
    super();
    this.state =initialState;
}
 handleChange(e){
  if (e.target.files[0]) {
this.setState({
  image:e.target.files[0],
  nameOftheimage:e.target.files[0].name
})
 }}

 validate () {
  let usernameError = "";
  let emailError = "";
  let passwordError = "";

  if (!this.state.username) {
    usernameError = "Username required ";
  }
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

  if (emailError || usernameError || passwordError) {
    this.setState({ emailError:emailError, usernameError:usernameError , passwordError:passwordError});
    return false;
  }else{
this.signUp()}

};

handleUpload () {
  var that=this;

  const uploadTask = storage.ref(`images/${this.state.nameOftheimage}`).put(this.state.image);
  uploadTask.on(
    "state_changed",
    snapshot => {},

    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(this.state.nameOftheimage)
        .getDownloadURL()
        .then(url => {
          this.setState({url:url});
        });
    }
  );
};


handleSubmit( event ) {
if ( this.state.emailError ||this.state.usernameError ||  this.state.password){

    this.setState(obj);
  }
};


getTheInfo(event){
    this.setState({ [event.target.name]: event.target.value })
    this.handleSubmit();


  }

signUp(){
  var that = this
  this.handleUpload();
  console.log(this.state.username)
  $.ajax({
    method: 'POST',
    url:'http://localhost:7000/signup',
    data : JSON.stringify({
    username:this.state.username ,
    email: this.state.email,
    password:this.state.password,
    url:this.state.url
    }),
    contentType: "application/json",
    success:function(data){
      console.log('jkjd')
    },
    error: function(err){
      console.log('error:' ,err)
    }
  })
}
    render(){
      const mystyle = {
        width: "550px",
        marginLeft:"450px",
        marginTop:"180px"
        // padding: "10px"
      };
      return (

<div class="signup-form">
<Nav/>
{/* <h1 style={{fontFamily: 'Lobster',color:"#3d4035", textAlign:"center", backgroundColor:"orange"}}>Sign Up </h1> */}
    <form action="/login"  style={mystyle} >
		<div class="form-header">

      </div>
        <div class="form-group">

      <div>
      <input name='username' placeholder="Username" onChange={this.getTheInfo.bind(this)} type="text" className="form-control" required="required"/></div><div style={{ fontSize: 12, color: "red" }}>
            {this.state.usernameError}
          </div></div>
          <div class="form-group">

      <input name='email' type= 'email' className="form-control" placeholder="Email" onChange={this.getTheInfo.bind(this)} />
      <div style={{ fontSize: 12, color: "red" }}>
             {this.state.emailError}
          </div>
        </div>

        <div class="form-group">

            <input type="password" class="form-control"  placeholder="Password" name="password" required="required" onChange={this.getTheInfo.bind(this)}/>
 <div style={{ fontSize: 12, color: "red" }}>
             {this.state.passwordError}
           </div>
        </div>
        <div class="form-group">
        <button type="submit" class="btn btn-dark btn-block btn-lg" onClick={this.validate.bind(this)}>Sign Up</button>
		</div>
        </form>
</div>


        /* //       <div>
// <input name='username' placeholder="username" onChange={this.getTheInfo.bind(this)}/>
// <div style={{ fontSize: 12, color: "red" }}>
//             {this.state.usernameError}
//           </div>
// <input name='email' type= 'email' placeholder="email" onChange={this.getTheInfo.bind(this)}/>
// <div style={{ fontSize: 12, color: "red" }}>
//             {this.state.emailError}
//           </div>
// <input name='password' placeholder="password" type='password' onChange={this.getTheInfo.bind(this)}/>
// <div style={{ fontSize: 12, color: "red" }}>
//             {this.state.passwordError}
//           </div>

// <input type="file" onChange={this.handleChange.bind(this)} />

// <Link className="dropdown-item"to="/login" ><button onClick={this.validate.bind(this)}>Signup</button></Link>
//   </div>

     /////////////////////////
//      <div>
// <form className="demoForm">
//        <h2>Sign up</h2>
//        <div className="form-group">
//          <label htmlFor="email">Username</label>
//    <input name='username' placeholder="username" onChange={this.getTheInfo.bind(this)} type="text" className="form-control" required="required"/></div>
//        <div className="form-group">
//          <label htmlFor="email">Email address</label>
//     <input name='username' placeholder="username"  id="txtUsername" className="form-control"   onChange={this.getTheInfo.bind(this)} required/>
//    <div>
//     {this.state.usernameError}
//     </div> </div></form>


 */


     )}}
export default Signup;