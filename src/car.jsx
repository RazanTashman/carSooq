// // import { Link } from 'react-router-dom';
// import React from 'react';
//  import Header from './header';
//  import Feedback from './feedback';
//  import $ from 'jquery';
//  import Form from './form';
//  import { Link } from 'react-router-dom';


// class Car extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//     car: [
//       { id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj", "color":"pink","operation":"for rent", "image":"image here", "owner":"me","year":2020},
//        [{"sender":"areen","comment":"htghgh"},{"sender":"areeeeen","comment":"hii"}, {"sender":"areeeeen","comment":"hii"}]
//        ]
//     }
// import { Link } from 'react-router-dom';
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
    this.state = {
    car: [
      { id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj", "color":"pink","operation":"for rent", "image":"image here", "owner":"me","year":2020},
       [{"sender":"areen","comment":"htghgh"},{"sender":"areeeeen","comment":"hii"}, {"sender":"areeeeen","comment":"hii"}]
       ]
    }
  }


  // componentDidMount() {
  //   var that = this;
  //    $.ajax({
  //   url: `/car/${this.props.location.state}`,
  //   method: "GET",
  //   success: (data) => {
  //    that.setState({car:data[0]})
  //   },
  //   error: (err) => {
  //     console.log("Post Method Failed");
  //   },
  // }); }
//send carID and token to know the user
  handleWishlist() {
    var that = this.state.car[0];
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


//   handleContact() {
//     console.log("clicked")
//     return(
// <div>
// <link to="/form" className="nav-link" style={{marginLeft:"300px"}}></link>
// </div> )
//   }



// //send carID and token to know the user
//   handleWishlist() {
//     var that = this.state.car[0];
//    $.ajax({
//     type: 'POST',
//     url:'http://localhost:3001/wishlist',
//     contentType: "application/json",
//     data : JSON.stringify({ id: that.id}),
//     headers: { 'x-my-custom-header': 'some value' },
//     success: function(success) {
//      console.log(success);
//     },
//     error: function(err) {
//       console.log('error:' ,err)
//     }
//    });
//   }

// //   handleContact() {
// //     console.log("clicked")
// //     return(
// // <div>
// // <link to="/form" className="nav-link" style={{marginLeft:"300px"}}></link>
// // </div> )
// //   }



// render () {
//   return (
//       <div>
//    <Header/>

//  <div className="card" style={{width: "60rem"}}>
//  <img className="card-img-top" src={this.state.car[0].image} alt="Card image cap"/>
//  <div className="card-body">
//    <h5 className="card-title">{this.state.car[0].operation}</h5>
//    <p className="card-text">{this.state.car[0].description}</p>
//  </div>
//  <ul className="list-group list-group-flush">
//    <li className="list-group-item">{this.state.car[0].brand}</li>
//    <li className="list-group-item">{this.state.car[0].year}</li>
//    <li className="list-group-item">{this.state.car[0].color}</li>
//    <li className="list-group-item">{this.state.car[0].price}</li>
//    <li className="list-group-item">{this.state.car[0].owner}</li>

//  </ul>
//  <div className="card-body">
//    <button onClick={()=>this.handleWishlist()}>Add to wishlist</button>
//    <button><Link to={{
//  pathname: "/form",
//  state={ this.state.car}
// }}>Contact Owner</Link></button>
//    {/* <button onClick={()=>this.handleContact()}>
//    <link to="/form" className="nav-link" style={{marginLeft:"300px"}}>  Contact owner   </link>
//    </button> */}



//  </div>
// </div>
// </div>

}



export default Car;
