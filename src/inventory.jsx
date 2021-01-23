import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import React from 'react'
 import Header from './header'
 import img from './car.jpg'
 import Nav from './nav'
//  import {DropdownButton, Dropdown} from 'react-bootstrap';
 import $ from 'jquery';
 import Car from './car'
import ad1 from './fordadd3.jpg'
import ad2 from './orange.jpg'
 function Carlist(props) {
var url = props.url || "/car"
   console.log("prooops",props.cars)
function clicked(id){
  console.log("id CLICKED:",id)
 }

  return (
    <div className="row" style={{margin:"0 auto"}}>
    {props.cars.map((car,i) =>{
   return  (

    <div className="col-sm-6" key= {car._id}>

  <div className="card"  style={{border: "solid  black 2px",cursor: 'pointer',  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.6)' }} onClick={()=>{clicked(car.id)}} ><Link to={{pathname: url, state: car.id }}>
  <img src={img}  alt="car" style={{width:"100%", height:"400px", margin:" 0 auto"}}/></Link>
    <div className="card-body">
      <h6  className="card-title">Brand: {car.brand}</h6>
      <h6 className="card-text">Price: {car.price} $</h6>
      <p className="card-text">Description: {car.description}</p>


  </div>
  </div>
  </div>)
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
        url: "/allcars",
        contentType: "application/json",
        // headers: { 'x-my-custom-header': 'some value' },
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
    url: "/inventory",
    method: "POST",
    data: JSON.stringify({
      brand: that.state.brand,color: that.state.color,year: that.state.year,price: that.state.price, operation: that.state.operation
    }),
    contentType: "application/json",
    success: (data) => {
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
        // this.props.onSubmit(this.state);
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
        this.ajax()
        // this.props.onSubmit(this.state);
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
        // this.props.onSubmit(this.state);
      }
    );
  }
isLogged(){
  // localStorage.setItem('token','srdtfyguhi')
  // if(localStorage.getItem('token')){
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
      {/* {this.ProtectedComponent()} */}
{this.isLogged()}

     <div className="d-flex">
     <div  className=" p-2 bg-light border-right" id="sidebar-wrapper" style ={{ width:"20rem"}}>
      <div className="sidebar-heading"></div>
      <div className="list-group list-group-flush">
      <img src={ad2} alt="add"style={{height:"500px", width:"300px"}}/>
      <img src={ad1} alt="add" style={{height:"500px", width:"300px"}}/>
        {/* <li className="list-group-item list-group-item-action bg-light" id="bottom-list">addd</li> */}
        {/* <li className="list-group-item list-group-item-action bg-light" id="active-list">adv</li>
        <li className="list-group-item list-group-item-action bg-light" id="bag-list">ad pic</li> */}

      </div>
    </div>

<div className="p-2 container">



<div className="d-flex">
<div className=" p-2" style={{marginLeft:"200px"}}>


<select style={{fontWeight:"bold",border: "solid  black 2px",borderRadius:"6px", size:'30px',cursor: 'pointer'}} onChange={this.onChangeBrandHandler.bind(this)}>
  <option style={{textAlign:"center"}}> Brand </option>
   <option value ="BMW">BMW</option>
   <option  value ="Ford">Ford</option>
   <option  value ="Mercedes">Mercedes </option>
   <option  value ="chevrolet">chevrolet</option>
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
   <option value ="red">Red </option>
   <option  value ="black">Black</option>
   <option  value ="gray">Gray</option>
   <option  value ="white">White</option>
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
  {/* <Carlist cars ={ [{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]} /> */}
  <Carlist cars={this.state.cars}/>

</div></div>
</div></div>
  )
}
}
export default Inventory
export { Carlist }
