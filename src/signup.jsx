import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { storage } from './firebase/firebase'

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username:"",
      email:"",
      password:"",
      image:null
    }

}
//  handleChange(e){
//   if (e.target.files[0]) {
// this.setState({
//   image:e.target.files[0]
// })
//  }}
//  handleUpload(){
//   const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
//   uploadTask.on(
//     "state_changed",
//     snapshot => {
//       // const progress = Math.round(
//       //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       // );
//       console.log('amal')
//     },
//     error => {
//       console.log(error);
//     },
//     () => {
//       storage
//         .ref("images")
//         .child(this.state.image.name)
//         .getDownloadURL()
//         .then(url => {
//           this.setUrl(url);
//         });
//     }
//   );
// };

// }



getTheInfo(event){
    this.setState({ [event.target.name]: event.target.value })
  }

signUp(){
  var that = this
  $.ajax({
    method: 'POST',
    url:'http://localhost:7000/signup',
    data : JSON.stringify({
    username:that.state.username ,
    email: that.state.email,
    password:that.state.password
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
<input name='username' placeholder="username" onChange={this.getTheInfo.bind(this)}/>
<input name='email' type= 'email' placeholder="email" onChange={this.getTheInfo.bind(this)}/>
<input name='password' placeholder="password" type='password' onChange={this.getTheInfo.bind(this)}/>
<input type="file"  />

<button onClick={this.signUp.bind(this)}>Signup</button>
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