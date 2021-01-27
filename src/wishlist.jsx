// import { Link } from 'react-router-dom';
import React from 'react'
import img from './CarSooqLogo.png'
 import Header from './header'
 import{Carlist} from './inventory'
 import $ from 'jquery';
 import wishlist from './heart.png'



 class Wishlist extends React.Component {
  constructor() {
    super()
    this.state = {
      cars : []
    }
    }

    handleDelete(id) {
      var that = this;
      $.ajax({
      type: 'DELETE',
      //  url:  `http://localhost:7000/delete/${id}`,
      url:  `http://localhost:7000/delete`,
       data : JSON.stringify({
        car:id,
        user:localStorage.getItem('id')
        }),
       contentType: "application/json",
       success: function(data) {
        that.setState({
          cars:data});
        console.log("deleted");
       },
       error: function(err) {
         console.log('error:' ,err)
       }
      });
     }


   componentDidMount() {
    var that = this;
     $.ajax({
       url: `http://localhost:7000/wishlist/'${localStorage.getItem('id')}'`,
       method: "GET",
       success: (data) => {
        console.log("I'm heeeeere");
        console.log("data" ,data);
         that.setState({
           cars:data});
       },
       error: (err) => {
         console.log("Post Method Failed");
       }
     });

    }
    render(){
      const mystyle = {
        width: "1.5rem",
        marginLeft:"150px"
        // padding: "10px"
      };
  return (
    <div>
    <Header/>
    <h1 style={{fontFamily: 'Lobster',color:"#3d4035", textAlign:"center", backgroundColor:"orange"}}>Your WishList</h1>
{/* <Carlist cars ={[{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]}/> */}

<div className="row" style={{margin:"0 auto"}}>


{this.state.cars.map((car,i) =>{
return  (
<div className="card" style={{width: "18rem"}}>
<img className="card-img-top" src={car.image}  alt="car"/>
<div className="card-body">
<h5 className="card-title">{car.brand}</h5>
<p className="card-text">{car.description}</p>
</div>
<ul className="list-group list-group-flush">
<li className="list-group-item">{car.op}</li>
<li className="list-group-item">For {car.operation}</li>
<li class="list-group-item">{car.color}</li>

</ul>
<div className="card-body">
<a href="https://github.com/RazanTashman?tab=repositories" class="card-link">contact</a>
<img className= {car.id }src={wishlist}  onClick={()=>this.handleDelete(car.id)} style={mystyle} alt="wishlist"/>

</div>
</div>
)
}
 )}
</div>



  </div>
  );
}
}
export default Wishlist;
//