import logo from './logo.svg';
import React from 'react';
import $ from 'jquery';
import { storage } from './firebase/firebase'
import { Link } from 'react-router-dom'


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
    url:'http://localhost:9000/signup',
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
      return (

      <div>
<input name='username' placeholder="username" onChange={this.getTheInfo.bind(this)}/>
<div style={{ fontSize: 12, color: "red" }}>
            {this.state.usernameError}
          </div>
<input name='email' type= 'email' placeholder="email" onChange={this.getTheInfo.bind(this)}/>
<div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
<input name='password' placeholder="password" type='password' onChange={this.getTheInfo.bind(this)}/>
<div style={{ fontSize: 12, color: "red" }}>
            {this.state.passwordError}
          </div>

<input type="file" onChange={this.handleChange.bind(this)} />

<Link className="dropdown-item"to="/login" ><button onClick={this.validate.bind(this)}>Signup</button></Link>
  </div>

     /////////////////////////
//      <div className="card">

//          <h5 className="card-header info-color white-text text-center py-4">
//              <strong>Sign up</strong>
//          </h5>
//          <div className="card-body px-lg-5 pt-0">
//              <form className="text-center" style={color: '#757575'}} action="#!">

//                  <div className="form-row">
//                      <div className="col">
//                          <div className="md-form">
//                              <input type="text" id="materialRegisterFormFirstName" className="form-control" name='username' onChange={this.getTheInfo.bind(this)}/>
//                              <label htmlFor="materialRegisterFormFirstName">Username</label>
//                          </div>
//                      </div>

//                  <div className="md-form mt-0">
//                      <input type="email" id="materialRegisterFormEmail" name='email' className="form-control" onChange={this.getTheInfo.bind(this)}/>
//                      <label htmlFor="materialRegisterFormEmail">E-mail</label>
//                  </div>

//                  <div className="md-form">
//                      <input type="password" id="materialRegisterFormPassword"  name='password' className="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock"  onChange={this.getTheInfo.bind(this)}/>
//                      <label htmlFor="materialRegisterFormPassword">Password</label>
//                      <small id="materialRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
//                          At least 8 characters and 1 digit
//                      </small>
//                  </div>


//                  <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" onClick={this.signUp.bind(this)}>Sign in</button>
//  </div>

// </form>
// </div>



//      </div>

     )}}
export default Signup;