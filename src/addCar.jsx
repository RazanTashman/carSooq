import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
class AddCar extends React.Component {
  constructor() {
    super();
 this.state = {
      description:"",
      brand:"",
      year:0,
      color:"",
      price :0,
      opreation:"",
      image:""

 }
this.changeState=this.changeState.bind(this);

}

changeState(event){
  this.setState({ [event.target.name]: event.target.value });

}
signUp(){
  var that = this
  console.log(this.state.username)
  $.ajax({
    method: 'POST',
    url:'http://localhost:3000/signup',
    data : JSON.stringify({
    description:this.state.description ,
    brand: this.state.brand,
    year: this.state.year,
    color: this.state.color,
    price: this.state.price,
    opreation: this.state.opreation,
    image: this.state.image
    }),
    contentType: "application/json",
    success:function(){
      console.log('success')
    },
    error: function(err){
      console.log('error:' ,err)
    }
  })
}
render(){
  return (
//     // <div className="card">

//     //     <h5 className="card-header info-color white-text text-center py-4">
//     //         <strong>Add your car</strong>
//     //     </h5>

//     //     <div className="card-body px-lg-5 pt-0">

//     //         <form className="text-center" style="color: #757575;" action="#!">
// // className="mdb-select"
//                 <select >
//                     <option name="" disabled>Choose option</option>
//                     <option value="Brand" name ="brand" selected>Brand</option>
//                     <option value="BMW" name ="brand">BMW</option>
//                     <option value="Ford" name ="brand">Ford</option>
//                     <option value="Chevorlet" name ="brand">Chevrolet</option>
//                     <option value="Dodge" name ="brand">Dodge</option>

//                 </select>
// // className="mdb-select"
//                 <select >
//                     <option name="" disabled>Choose option</option>
//                     <option value="" selected>Year</option>
//                     <option value="2015" name ="year">2015</option>
//                     <option value="2016" name ="year">2016</option>
//                     <option value="2017" name ="year">2017</option>
//                     <option value="2018" name ="year">2018</option>
//                     <option value="2019" name ="year">2019</option>
//                     <option value="2020" name ="year">2020</option>
// {/* className="mdb-select" */}
//                 </select>
//                 <select >
//                     <option value="" disabled>Choose option</option>
//                     <option value="" selected>Color</option>
//                     <option value="Black" name ="color">Black</option>
//                     <option value="Grey" name ="color">Grey</option>
//                     <option value="White" name ="color">White</option>
//                     <option value="Blue" name ="color">Blue</option>
//                     <option value="Orange" name ="color">Orage</option>
// {/* className="mdb-select"> */}
//                 </select>
//                 <select >
//                     <option name="" disabled>Choose option</option>
//                     <option name="" selected>Opreation</option>
//                     <option name="opreation" value="rent">For rent</option>
//                     <option name="opreation" value="sale">For sale</option>
//                 </select>
//                 // <form>
//   {/* <div className="form-group">class="form-control-file"  */}
//     <input type="file" id="exampleFormControlFile1"/>
//   // </div>
// // </form>
// // id="materialContactFormMessage"
//                 // <div className="md-form">className="form-control md-textarea"
//                     <textarea  rows="3"></textarea>
//                     <label for="materialContactFormMessage">Description</label>
//                 // </div>


//                 <button className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Post</button>

//         //     </form>
//         // </div>

//     // </div>
<h1>gjhdfjh</h1>
)}}
export default AddCar;