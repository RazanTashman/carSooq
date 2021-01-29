
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



 {/* <Carlist cars ={this.state.user[1]} url="/car2"  /> */}
 {/* <Carlist cars={this.state.list}/> */}
 {console.log("list:::::",this.state.list)}






 <div className="row" style={{margin:"0 auto"}}>
    {this.state.list.map((car,i) =>{
   return  (
    <div className="card" style={{width: "18rem"}}>
    <img className="card-img-top" src={car.image}  alt="car"/>
    <div className="card-body">
      <h5 className="card-title">{car.brand}</h5> <h6 >{car.year}</h6>
      <p className="card-text">{car.description}</p>
    </div>
    <ul className="list-group list-group-flush">
    <li className="list-group-item">{car.price} JOD</li>
      <li className="list-group-item">For {car.operation}</li>
      <li class="list-group-item">{car.color}</li>
      {/* <li class="list-group-item">Vestibulum at eros</li> */}
    </ul>

  </div>
  )
   } )}
</div>




</div>
  )
}
}
export default Profile;
