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
      { id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj", "color":"pink","operation":"for rent", "image":"./CarSooqLogo.png", "owner":"me","year":2020},
       [{"sender":"areen","comment":"htghgh"},{"sender":"areeeeen","comment":"hii"}, {"sender":"areeeeen","comment":"hii"}]
       ]
    }
  }


  handleDelete(id) {

     $.ajax({
     type: 'DELETE',
      url:  `/car/${id}`,
      contentType: "application/json",
      success: function(deleted) {
       console.log(deleted);
      },
      error: function(err) {
        console.log('error:' ,err)
      }
     });
    }


render () {
  return (
      <div>
   <Header/>
   <button onClick={()=>this.handleDelete(this.state.car[0].id)}>wishlist</button>
 <div className="card" style={{width: "60rem"}}>
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

 </ul>
 <div className="card-body">
 
   <button onClick={()=>this.handleDelete(this.state.car[0].id)}>delete</button>

 </div>
</div>
</div>
  )
}


}
export default Car;
