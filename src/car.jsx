 import React from 'react';
 import Header from './header';
 import Feedback from './feedback';
 import $ from 'jquery';
 import Form from './form';
 import { Link } from 'react-router-dom';
 import  { Redirect } from 'react-router-dom'

class Car extends React.Component {
  constructor(props) {
    super(props);
  }


  handleWishlist() {
 
   $.ajax({
    type: 'POST',
    url:'/wishlist',
    contentType: "application/json",
    data : JSON.stringify({ id: that.id}),
    headers: { 'x-my-custom-header': 'some value' },
    success: function(success) {
     console.log(success);
    },
    error: function(err) {
      console.log('error:' ,err)
    }
   });
  }
  ProtectedComponent() {
    if (!localStorage.getItem('token')){
      localStorage.setItem('id', this.props.location.state)
      return <Redirect to='/login'/>
  }

  }



}



export default Car;
