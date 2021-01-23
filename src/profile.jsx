
import React from 'react';
import { Link } from 'react-router-dom';
import AddCar from './addCar';
import { Carlist } from './inventory'


import Header from './header';
import Wishlist from './wishlist';
import Car from './car';
import $ from 'jquery';
import image from './drive.jpg'

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
    // user: [{"image":"url", "username":"areen","email":"areen@gmail.com"}, [{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]],
    username:"",
    email:"",
    list :[]
    }
  }

  clicked(id) {
    console.log(id)
    $.ajax({
      url: `/car/${id}`,
      type: "GET",
      success: (data) => {
      //  <Car data={this.state.car2}/>
      // console.log("i got cars ");
      },
      error: (err) => {
        console.log("Post Method Failed");
      }
    });
   }

  componentDidMount() {
    var that = this;
    console.log('IIIIDDDD',localStorage.getItem('id'))
   $.ajax({
    type: 'GET',
    // url:'http://localhost:7000/profile',
    url:`http://localhost:7000/profile/${localStorage.getItem('id')}`,
    contentType: "application/json",
    headers: { 'x-my-custom-header': 'some value' },
    success: function(data){
      // that.setState({
      //   user: [{"image":"url", "username":"areen","email":"areen@gmail.com"}, [{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]]
      // })
      // console.log(data);


      console.log("getSuccess:",data)
      that.setState({
        list : data.cars,
        username: data.username,
        email: data.email
      })
    },
    error: function(err){
      console.log('error:' ,err)
    }
   });

  }





render() {
  return(
    <div>
    <Header/>
     <div>
       <br/>
     <img src={image} width="90px" height="90px"/>
     <h5>{this.state.username}</h5>
      <h5>{this.state.email}</h5>
     </div>
 <button style={{margin:"-50px 0px 0px 1400px"}} ><Link to="/wishlist">Wishlist</Link></button>
 {/* <Carlist cars ={this.state.user[1]} url="/car2"  /> */}
 <Carlist cars={this.state.list}/>
</div>
  )
}
}
export default Profile;
