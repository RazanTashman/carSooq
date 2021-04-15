import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import React from 'react'
 import Header from './header'
 import img from './car.jpg'
 import Nav from './nav'
 import $ from 'jquery';
 import Car from './car'
import ad1 from './fordadd3.jpg'
import ad2 from './orange.jpg'
import Wishlist from './heart.png'
import Email from './email.png'
import Form from './form'
 function Carlist(props) {
var url = props.url || "/car"
   console.log("prooops",props.cars)
function clicked(id){
  console.log("id CLICKED:",id)
 }

 function sendEamil (id){
   localStorage.setItem("carID",id)
   window.location="/form"


}

 function handleWishlist(carId) {
 $.ajax({
  type: 'POST',
  url:'http://localhost:7000/wishlist',
  contentType: "application/json",
  data : JSON.stringify(
  {
     user: localStorage.getItem('id'),
     car: carId
  }),
  headers: { 'x-my-custom-header': 'some value' },
  success: function(success) {
   console.log("success");
  },
  error: function(err) {
    console.log('error:' ,err)
  }
 });
}

function WLonMouseOve(id) {
  document.getElementById(id).style.width = "32px";
}

function WLonMouseOut(id) {
  document.getElementById(id).style. width = "1.5rem";
}
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

 const mystyle = {
  width: "1.5rem",
  marginLeft:"150px"
  // padding: "10px"
};
const dateStyle = {
  color:"gray",
  marginLeft:"205px"
  // padding: "10px"
};


  return (

    <div className="row" style={{margin:"0 auto"}}>

      {/* <img  src={Wishlist}  alt="wishlist"/> */}
    {props.cars.map((car,i) =>{
   return  (

    <div className="card" style={{width: "18rem"}}>
   <h6 style={dateStyle} >{date}</h6>
    <img className="card-img-top" src={car.image}  alt="car"/>
    <div className="card-body">
      <h5 className="card-title">{car.brand}</h5>  <h6 style={{color:"gray"}} >{car.year}</h6>
      <p className="card-text">{car.description}</p>
    </div>
    <ul className="list-group list-group-flush">
    <li className="list-group-item">{car.price} JOD </li>
      <li className="list-group-item">For {car.operation}</li>
      <li class="list-group-item">{car.color}</li>
      {/* <li class="list-group-item">Vestibulum at eros</li> */}

    </ul>
    <div className="card-body">
    <img id= {car.id }src={Email}  onMouseOver={()=>WLonMouseOve(car.id)} onMouseOut={()=>WLonMouseOut(car.id)}  onClick={()=>sendEamil(car.id)}  style={{width: "1.5rem",}}  alt="Email"/>
      <img id= {car.id }src={Wishlist}  onMouseOver={()=>WLonMouseOve(car.id)} onMouseOut={()=>WLonMouseOut(car.id)} onClick={()=>handleWishlist(car.id)} style={mystyle} alt="wishlist"/>

    </div>
  </div>
  )
   } )}
</div>

)
}


class Inventory extends React.Component {
  constructor() {
    super()

    this.state={
      cars:[],
      brand: "", year: "", color: "", price: "",operation:''
    }
   }

   componentDidMount() {
     var that = this;
      $.ajax({
        method: "GET",
        url: "http://localhost:7000/allcars",
        contentType: "application/json",
        success: (data) => {
          console.log("data......",data)
          that.setState({
            cars:data});
        },
        error: (err) => {
          console.log("Post Method Failed");
        }
      });  }

ajax(){
  var that = this

  $.ajax({
    url: "http://localhost:7000/inventory",
    method: "POST",
    data: JSON.stringify({
      brand: that.state.brand,color: that.state.color,year: that.state.year,price: that.state.price, operation: that.state.operation
    }),
    contentType: "application/json",
    success: (data) => {
      console.log("heeeeeeeeeeeeeeeeeerree::::::::",data)
      that.setState({
        cars:data});
    },
    error: (err) => {
      console.log("Post Method Failed");
    }
  }) }




   onChangeBrandHandler(event){
    this.setState(
      {
        brand: event.target.value
      },
      () => {
        console.log(this.state)
        this.ajax()
        // this.props.onSubmit(this.state);
      }
    );
  }
  onChangeYearHandler(event) {
    this.setState(
      {
        year: event.target.value,
      },
      () => {  console.log(this.state)
        this.ajax()

      },
    );
  }
  onChangeColorHandler(event) {
    this.setState(
      {
        color: event.target.value,
      },
      () => {  console.log(this.state)
        this.ajax()

      },
    );
  }
  onChangeCatHandler(event) {
    this.setState(
      {
        operation: event.target.value,
      },
      () => {   console.log(this.state)
        this.ajax()

      }
    );
  }
  onChangePriceHandler(event) {
    this.setState(
      {
        price: event.target.value,
      },
      () => {   console.log(this.state)
        this.ajax()

      }
    );
  }
isLogged(){

    if(true){
    return (<Header/>)
  }
  else {
    return (<Nav/>)
  }
}

 ProtectedComponent() {
  if (!localStorage.getItem('token'))
    return <Redirect to='/login'  />


}
   render(){
  return (
   <div>
   
{this.isLogged()}

     <div className="d-flex">
     <div  className=" p-2 bg-light border-right" id="sidebar-wrapper" style ={{ width:"20rem"}}>
      <div className="sidebar-heading"></div>
      <div className="list-group list-group-flush">
  
      </div>
    </div>

<div className="p-2 container">



<div className="d-flex">
<div className=" p-2" style={{marginLeft:"200px"}}>


<select style={{fontWeight:"bold",border: "solid  black 2px",borderRadius:"6px", size:'30px',cursor: 'pointer'}} onChange={this.onChangeBrandHandler.bind(this)}>
  <option style={{textAlign:"center"}}> Brand </option>
   <option value ="BMW">BMW</option>
   <option  value ="Chevrolet">chevrolet</option>
   <option  value="Dodge" >Dodge</option>
   <option  value ="Ford">Ford</option>
   <option  value ="Mercedes">Mercedes </option>


 </select>

</div>
<div className=" p-2">


<select  style={{fontWeight:"bold",border: "solid  black 2px",borderRadius:"6px", size:'30px',cursor: 'pointer'}} onChange={this.onChangeYearHandler.bind(this)}>
  <option style={{textAlign:"center"}}>Year </option>
   <option value ="2020">2020</option>
   <option  value ="2019">2019</option>
   <option  value ="2018">2018</option>
   <option  value ="2017">2017</option>
   <option  value ="2016">2016</option>
   <option  value ="2015">2015</option>
 </select>

</div>

<div className=" p-2">


<select  style={{fontWeight:"bold",border: "solid  black 2px",borderRadius:"6px", size:'30px',cursor: 'pointer'}} onChange={this.onChangeColorHandler.bind(this)}>
  <option style={{textAlign:"center"}}>Color </option>
  <option value="Black" >Black</option>
  <option value="Blue" >Blue</option>
  <option value="Grey" >Grey</option>
  <option value="Orange" >Orage</option>
  <option value ="Red">Red </option>
  <option value="White" >White</option>
 </select>

</div>
<div className=" p-2">


<select  style={{fontWeight:"bold",border: "solid  black 2px",borderRadius:"6px", size:'30px',cursor: 'pointer'}}  onChange={this.onChangeCatHandler.bind(this)}>
  <option style={{textAlign:"center"}}>category</option>
   <option value ="sale">for sale </option>
   <option  value ="rent">for rent</option>

 </select>

</div>

<div className=" p-2">


<select  style={{fontWeight:"bold",border: "solid  black 2px",borderRadius:"6px", size:'30px',cursor: 'pointer'}}  onChange={this.onChangePriceHandler.bind(this)}>
  <option style={{textAlign:"center"}}>Price</option>
   <option value ="lowestToHighest">lowestToHighest </option>
   <option  value ="highestToLowest">highestToLowest</option>

 </select>

</div>

</div>
<br/><br/>
<div className="row">

  <Carlist cars={this.state.cars}/>
{console.log("cars:::::",this.state.cars)}
</div></div>
</div></div>
  )
}
}
export default Inventory
export { Carlist }
