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
  this.setState({ message: event.target.value });}
  // readmsg(event){
  //   this.setState({ message: event.target.value });}
  //carID senderEmail msg RecieverEmail
  handleForm() {

    // var that = this.state.car[0];
    console.log(this.state);
    var obj = {sender:localStorage.getItem('id'), carID: localStorage.getItem("carID"),comment:this.state.message}
    $.ajax({
     type: 'POST',
     url:'http://localhost:7000/email',
     contentType: "application/json",
     data : JSON.stringify(obj),
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
    const mystyle = {
      width: "550px",
      marginLeft:"450px",
      marginTop:"80px"
      // padding: "10px"
    };
    return (
      <div>
    <Header/>
    <h1 style={{fontFamily: 'Lobster',color:"#3d4035", textAlign:"center", backgroundColor:"orange"}}>Contact The Seller </h1>
    <form  action="/inventory" style={mystyle}  >
    <textarea  class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Your Message" name="email"  onChange={this.readEmail.bind(this)} required/>

        {/* <input type='text' class="form-control" id="formGroupExampleInput2" placeholder='descreption'  onChange={this.changeStateDescreption}></input> */}
<br/><br/>
        <button type="submit" style={{width: "550px"} } class="btn btn-dark" onClick={()=>this.handleForm()}>Submit</button>
</form>
      </div>
    );
  }
}


export default Form;