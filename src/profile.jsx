import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import Wishlist from './wishlist';
import $ from 'jquery';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
    user: [{"image":"url", "username":"areen","email":"areen@gmail.com"}, [{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]]
    }
  }

  componentDidMount() {
    var that = this;
   $.ajax({
    method: 'GET',
    url:'http://localhost:7000/profile',
    contentType: "application/json",
    headers: { 'x-my-custom-header': 'some value' },
    success: function(){
      that.setState({
        user: [{"image":"url", "username":"areen","email":"areen@gmail.com"}, [{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]]
      })
      // console.log(data);
    },
    error: function(err){
      console.log('error:' ,err)
    }
   });
  }





render() {
  return (
    <div>
     <Header/>

     <div>
     <img src={this.state.user[0].image}/>
     <h5>{this.state.user[0].username}</h5>
      <h5>{this.state.user[0].email}</h5>
     </div>


 <button>wishlist</button>




    <div className="row">
    {this.state.user[1].map((element) => {


return (
    <div className="col-sm-6">
  <div className="card">
  <img src={element.image}  alt="car"/>
    <div className="card-body">
      <h5  className="card-title">Brand: {element.brand}</h5>
      <h6 className="card-text">Price: {element.price}</h6>
      <p className="card-text">Description: {element.description}</p>
  </div>
  </div>
  </div>
)
    })
  }
  </div>

</div>
  )
}

}
export default Profile;


