// import { Link } from 'react-router-dom';
import React from 'react'
 import Header from './header'
 import img from './CarSooqLogo.png'
//  import {DropdownButton, Dropdown} from 'react-bootstrap';
 import $ from 'jquery';
 function Carlist(props) {
   console.log(props.cars)
function clicked(id){
console.log(id)
 }
  return (
    <div className="row">
    {props.cars.map(car =>{
   return  (
    <div className="col-sm-6">
      <span id ={car._id} onClick={()=>{clicked(car._id)}}>
  <div className="card"  >
  <img src={img}  alt="car"/>
    <div className="card-body">
      <h5  className="card-title">Brand: {car.brand}</h5>
      <h6 className="card-text">Price: {car.price} $</h6>
      <p className="card-text">Description: {car.description}</p>
      {/* <button key= {car._id} onClick={()=>{clicked(car._id)}}> profile</button> */}
     {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
  </div></span></div>)
   } )}
</div>
)
}
class Inventory extends React.Component {
  constructor() {
    super()
    this.state={
      cars:[],
      brand: "", year: "", colour: "", price: ""
    }
   }
    clicked(id){
    console.log("thiiiiis",id)
   }
   click(){
     var context = this
    $.ajax({
      method:"GET",
      url: 'http://localhost:3000/lala',
      // data:JSON.stringify({word:word}),
      // contentType:"application/json",
      success: (data) => {
        console.log("hello from server")
        context.setState({definition:  data})
      },
      error: (err) => {
        console.log('err in get ', err);
        context.setState({word: "Can Not Find This Word Please Try Another One "})
      }
    });
   }
   onChangeBrandHandler(event) {
    this.setState(
      {
        brand: event.target.value,
      },
      () => {
        console.log(this.state)
        // this.props.onSubmit(this.state);
      },
    );
  }
  onChangeYearHandler(event) {
    this.setState(
      {
        year: event.target.value,
      },
      () => {  console.log(this.state)
        // this.props.onSubmit(this.state);
      },
    );
  }
  onChangeColorHandler(event) {
    this.setState(
      {
        colour: event.target.value,
      },
      () => {  console.log(this.state)
        // this.props.onSubmit(this.state);
      },
    );
  }
  onChangeCatHandler(event) {
    this.setState(
      {
        operation: event.target.value,
      },
      () => {   console.log(this.state)
        // this.props.onSubmit(this.state);
      },
    );
  }
   render(){
  return (
   <div>
     <Header/>
     <div className="d-flex">
     <div  className=" p-2 bg-light border-right" id="sidebar-wrapper" style ={{ width:"20rem"}}>
      <div className="sidebar-heading">Advertisement </div>
      <div className="list-group list-group-flush">
      <img src={img} style={{height:"100px", width:"100px"}}/>
        <li className="list-group-item list-group-item-action bg-light" id="bottom-list">addd</li>
        <li className="list-group-item list-group-item-action bg-light" id="active-list">adv</li>
        <li className="list-group-item list-group-item-action bg-light" id="bag-list">ad pic</li>
      </div>
    </div>
<div className="p-2 container">
<button onClick={this.click.bind(this)}>press</button>
<div className="d-flex">
<div className=" p-2">
<form>
<select onChange={this.onChangeBrandHandler.bind(this)}>
  <option>Select a brand </option>
   <option value ="BMW">BMW</option>
   <option  value ="Ford">Ford</option>
   <option  value ="Mercedes">Mercedes </option>
   <option  value ="chevrolet">chevrolet</option>
 </select>
</form>
</div>
<div className=" p-2">
<form>
<select onChange={this.onChangeYearHandler.bind(this)}>
  <option>Select a Year </option>
   <option value ="2020">2020</option>
   <option  value ="2019">2019</option>
   <option  value ="2018">2018</option>
   <option  value ="2017">2017</option>
   <option  value ="2016">2016</option>
   <option  value ="2015">2015</option>
 </select>
</form>
</div>
<div className=" p-2">
<form>
<select onChange={this.onChangeColorHandler.bind(this)}>
  <option>Select a color </option>
   <option value ="red">Red </option>
   <option  value ="black">Black</option>
   <option  value ="gray">Gray</option>
   <option  value ="white">White</option>
 </select>
</form>
</div>
<div className=" p-2">
<form>
<select onChange={this.onChangeCatHandler.bind(this)}>
  <option>Select a category</option>
   <option value ="sale">for sale </option>
   <option  value ="rent">for rent</option>
 </select>
</form>
</div>
</div>
<br/><br/><br/><br/><br/><br/>
<div className="row">
  <Carlist cars ={ [{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]} />
</div></div>
</div></div>
  )
}
}
export default Inventory