// import { Link } from 'react-router-dom';
import React from 'react';
 import Header from './header';
 import Feedback from './feedback';
//  import $ from 'jquery';
class Car extends React.Component {
  constructor() {
    super();
    this.state = {
    car: []
    }
    // this.car = this.car.bind
  }
  // getCar() {
  //   var that = this;
  //  $.ajax({
  //   method: 'GET',
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
  return(
      <div>
   <Header/>

{this.state.car.map((element) => {
return (
  <div>
 <div class="card" style="width: 18rem;">
 <img class="card-img-top" src={element.image} alt="Card image cap"/>
 <div class="card-body">
   <h5 class="card-title">{element.operation}</h5>
   <p class="card-text">{element.description}</p>
 </div>
 <ul class="list-group list-group-flush">
   <li class="list-group-item">{element.brand}</li>
   <li class="list-group-item">{element.year}</li>
   <li class="list-group-item">{element.color}</li>
   <li class="list-group-item">{element.price}</li>
   <li class="list-group-item">{element.owner}</li>
   <Feedback/>
 </ul>
 <div class="card-body">
   <a href="#" class="card-link">Card link</a>
   <a href="#" class="card-link">Another link</a>
   <button onClick={this.handleDelete.bind(this)}>Delete</button>
   <button onClick={this.handleUpdate.bind(this)}>Update</button>
 </div>
</div>
</div>
)
}
)}
</div>
)
}

}
export default Car;