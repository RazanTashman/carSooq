// import { Link } from 'react-router-dom';
import React from 'react';
 import Header from './header';
 import $ from 'jquery';
 import { Link } from 'react-router-dom';

 class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      message:''
    };
    console.log(this.props.state);
  }
  readEmail(event){
  this.setState({ email: event.target.value });}
  readmsg(event){
    this.setState({ message: event.target.value });}
  //carID senderEmail msg RecieverEmail
  handleForm() {
    // var that = this.state.car[0];
    console.log(this.state);
    var obj = {id:this.props.location.state, email: this.state.email, comment:this.state.message}
    $.ajax({
     type: 'POST',
     url:'/email',
     contentType: "application/json",
     data : JSON.stringify({  }),
     headers: { 'x-my-custom-header': 'some value' },
     success: function(success) {
      console.log(success);
     },
     error: function(err) {
       console.log('error:' ,err)
     }
    });
  }



  render() {
    return (
      <div>
    <Header/>
    <h1>Contact Owner</h1>
        <label for="email"><b>User Email</b></label>
        <input type="text" placeholder="Enter your Email" name="email"  onChange={this.readEmail.bind(this)} required/>
        <label for="email"><b>message</b></label>
        <input type="text" placeholder="Write your message here..." onChange={this.readmsg.bind(this)} />
        <button type="submit" className="btn" onClick={()=>this.handleForm()}>Submit</button>

      </div>
    );
  }
}


export default Form;