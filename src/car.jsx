// import { Link } from 'react-router-dom';
import React from 'react';
 import Header from './header';
 import Feedback from './feedback';
 import $ from 'jquery';

class Car extends React.Component {
  constructor() {
    super();
    this.state = {
    car: [
      { _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj", "color":"pink","operation":"for rent", "image":"image here", "owner":"me"},
       [{"sender":"areen","comment":"htghgh"},{"sender":"areeeeen","comment":"hii"}, {"sender":"areeeeen","comment":"hii"}]
       ]
    }
  }

  componentDidMount() {
    var that = this;
    $.ajax({
     method: 'GET',
     url:'http://localhost:7000/car/:id',
     contentType: "application/json",
     success: function(){
       that.setState({
         car:  [{ "id":2 ,"brand":"BMW", "price": "15000", "description":"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj","color":"pink","operation":"for rent", "image":"image here", "owner":"me"}, [{"sender":"areen","comment":"htghgh"}, {"sender":"areeeeen","comment":"hii"}] ]
       })
      //  console.log(data);
     },
     error: function(err){
       console.log('error:' ,err)
     }
    });

  }


  // handleDelete() {
  //   var that = this;
  //  $.ajax({
  //   method: 'DELETE',
  //   url:'http://localhost:7000/car/:id',
  //   contentType: "application/json",
  //   success: function(){
  //     that.setState({
  //       car: data
  //     })
  //     console.log(data);
  //   },
  //   error: function(err){
  //     console.log('error:' ,err)
  //   }
  //  });
  // }
  // handleUpdate() {
  //   var that = this;
  //  $.ajax({
  //   method: 'UPDATE',
  //   url:'http://localhost:7000/car/:id',
  //   contentType: "application/json",
  //   data : JSON.stringify({
  //     }),
  //   success: function(){
  //     that.setState({
  //       car: data
  //     })
  //     console.log(data);
  //   },
  //   error: function(err){
  //     console.log('error:' ,err)
  //   }
  //  });
  // }


render () {
  return (
      <div>
   <Header/>

 <div className="card" style="width: 18rem;">
 <img className="card-img-top" src={this.state.car[0].image} alt="Card image cap"/>
 <div className="card-body">
   <h5 className="card-title">{this.state.car[0].operation}</h5>
   <p className="card-text">{this.state.car[0].description}</p>
 </div>
 <ul className="list-group list-group-flush">
   <li className="list-group-item">{this.state.car[0].brand}</li>
   <li className="list-group-item">{this.state.car[0].year}</li>
   <li className="list-group-item">{this.state.car[0].color}</li>
   <li className="list-group-item">{this.state.car[0].price}</li>
   <li className="list-group-item">{this.state.car[0].owner}</li>
   <Feedback/>
 </ul>
 <div className="card-body">
   {/* <a href="#" className="card-link">Card link</a>
   <a href="#" className="card-link">Another link</a> */}
   {/* <button onClick={this.handleDelete.bind(this)}>Delete</button> */}
   {/* <button onClick={this.handleUpdate.bind(this)}>Update</button> */}
 </div>
</div>


</div>
  )}


}
export default Car;