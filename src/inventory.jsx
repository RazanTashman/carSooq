// import { Link } from 'react-router-dom';
import React from 'react'
 import Header from './header'
 import img from './car.jpg'
//  import {DropdownButton, Dropdown} from 'react-bootstrap';
 import $ from 'jquery';
 import car from './car'
import ad1 from './total.jpg'
import ad2 from './drive.jpg'
 function Carlist(props) {

   console.log(props.cars)
function clicked(id){
  console.log(id)
  $.ajax({
    url: `/car/${id}`,
    method: "GET",
    success: (data) => {
    //  <Car info={data}/>
    console.log("i got cars ")
    },
    error: (err) => {
      console.log("Post Method Failed");
    },
  });


 }

  return (
    <div className="row" style={{margin:"0 auto"}}>
    {props.cars.map((car,i) =>{



   return  (

    <div className="col-sm-6" key= {car._id}>

  <div className="card"  onClick={()=>{clicked(car._id)}} >
  <img src={img}  alt="car" style={{width:"500px", height:"400px", margin:" 0 auto"}}/>
    <div className="card-body">
      <h5  className="card-title">Brand: {car.brand}</h5>
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
      brand: "", year: "", colour: "", price: ""
    }
   }

   componentDidMount() {
     var that = this;
      $.ajax({
        url: "/allcars",
        method: "GET",
        success: (data) => {
          that.setState({
            cars:data});
        },
        error: (err) => {
          console.log("Post Method Failed");
        }
      });  }





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
      <div className="sidebar-heading"></div>
      <div className="list-group list-group-flush">
      <img src={ad1} style={{height:"500px", width:"300px"}}/>
      <img src={ad2} style={{height:"500px", width:"300px"}}/>
        <li className="list-group-item list-group-item-action bg-light" id="bottom-list">addd</li>
        {/* <li className="list-group-item list-group-item-action bg-light" id="active-list">adv</li>
        <li className="list-group-item list-group-item-action bg-light" id="bag-list">ad pic</li> */}

      </div>
    </div>

<div className="p-2 container">



<div className="d-flex">
<div className=" p-2" style={{marginLeft:"200px"}}>


<select onChange={this.onChangeBrandHandler.bind(this)}>
  <option>Select a brand </option>
   <option value ="BMW">BMW</option>
   <option  value ="Ford">Ford</option>
   <option  value ="Mercedes">Mercedes </option>
   <option  value ="chevrolet">chevrolet</option>
 </select>

</div>
<div className=" p-2">


<select onChange={this.onChangeYearHandler.bind(this)}>
  <option>Select a Year </option>
   <option value ="2020">2020</option>
   <option  value ="2019">2019</option>
   <option  value ="2018">2018</option>
   <option  value ="2017">2017</option>
   <option  value ="2016">2016</option>
   <option  value ="2015">2015</option>
 </select>

</div>

<div className=" p-2">


<select onChange={this.onChangeColorHandler.bind(this)}>
  <option>Select a color </option>
   <option value ="red">Red </option>
   <option  value ="black">Black</option>
   <option  value ="gray">Gray</option>
   <option  value ="white">White</option>
 </select>

</div>
<div className=" p-2">


<select onChange={this.onChangeCatHandler.bind(this)}>
  <option>Select a category</option>
   <option value ="sale">for sale </option>
   <option  value ="rent">for rent</option>

 </select>

</div>
</div>
<br/><br/>
<div className="row">
  <Carlist cars ={ [{ _id :1 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"},{ _id :2 ,brand:"BMW", price: "15000", description:"rtcyvubhjnkxcyvuhbkjxcfgvhbjcfgvhj"}]} />

</div></div>
</div></div>
  )
}
}
export default Inventory
export { Carlist }