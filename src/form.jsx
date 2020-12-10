// import { Link } from 'react-router-dom';
import React from 'react';
 import Header from './header';
 import $ from 'jquery';
 import { Link } from 'react-router-dom';

 class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    console.log(this.props.state);
  }

  //carID senderEmail msg RecieverEmail
  handleForm() {
    // var that = this.state.car[0];
    $.ajax({
     type: 'POST',
     url:'http://localhost:3001/email',
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
        <input type="text" placeholder="Enter your Email" name="email" required/>
        <label for="email"><b>message</b></label>
        <input type="text" placeholder="Write your message here..." />
        <button type="submit" className="btn" onClick={()=>this.handleForm()}>Submit</button>

      </div>
    );
  }
}


export default Form;