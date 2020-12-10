// import { Link } from 'react-router-dom';
import React from 'react'
import img from './CarSooqLogo.png'
 import Header from './header'
 import{Carlist} from './inventory'
 import $ from 'jquery';
 class Wishlist extends React.Component {
  constructor() {
    super()
    this.state = {
      cars : []
    }
    }

   componentDidMount() {
    var that = this;
     $.ajax({
       url: "/wishlist",
       method: "GET",
       success: (data) => {
         that.setState({
           cars:data});
       },
       error: (err) => {
         console.log("Post Method Failed");
       }
     });

    }
    render(){
  return (
    <div>
    <Header/>
    <h1 style={{fontFamily: 'Lobster',color:"#3d4035", textAlign:"center", backgroundColor:"orange"}}>Your WishList</h1>
<Carlist cars ={[{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]}/>

  </div>
  );
}
}
export default Wishlist;
//