import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { storage } from './firebase/firebase'
import Nav from './nav'
// import {getTOKEN} from './hel'


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
      image:null,
      url:"",
      nameOftheimage:""


 }
this.changeStateDescreption=this.changeStateDescreption.bind(this);
this.changeStatePrice=this.changeStatePrice.bind(this);
this.changeState=this.changeState.bind(this);
}

changeState(event){
  this.setState({ [event.target.name]: event.target.value });
  // this.setState({descreption : event.target.value})

}

changeStateDescreption(event){
  // this.setState({ [event.target.name]: event.target.value });
  this.setState({descreption : event.target.value})

}
changeStatePrice(event){
  this.setState({price : event.target.value})

}
handleChange(e){
  if (e.target.files[0]) {
this.setState({
  image:e.target.files[0]
})
 }}


handleUpload () {
  var that=this;
  const uploadTask = storage.ref(`cars/${this.state.nameOftheimage}`).put(this.state.image);
  uploadTask.on(
    "state_changed",
    snapshot => {},

    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("cars")
        .child(this.state.nameOftheimage )
        .getDownloadURL()
        .then(url => {
          this.setState({url:url});
        });
    }
  );
};




addCar(){
  var that = this
   var token =(localStorage.getItem('token'));
//   const header = new Headers();
// header.append('Authorization',token );
//   console.log(this.state.brand)
//   console.log("ifvkv")
//   this.handleUpload()
  console.log("tTTTTT:",token)
// var token=localStorage.getItem("token")
//   var headers = new HttpHeaders().set('Authorization', '' + this.token).set('Content-Type', 'application/json; charset=utf-8')
  $.ajax({
    method: 'POST',
    url:'http://localhost:7000/add',
    data : JSON.stringify({
    description:this.state.description ,
    brand: this.state.brand,
    year: this.state.year,
    color: this.state.color,
    price: this.state.price,
    opreation: this.state.opreation,
    url:this.state.url
    }),
    contentType: "application/json",

      headers: {"Authorization": localStorage.getItem('token')}
    ,
    success:function(){
      console.log('this.state.year')
    },
    error: function(err){
      console.log('error:' ,err)
    }
  })
}
render(){
  return (
    <div>
       <Nav />
       <form action="/profile">
    <select name ="brand"
        onChange={this.changeState}  >
                    <option name="" disabled>Choose option</option>
                    <option  value="Brand"  selected>Brand</option>
                    <option  value="BMW" >BMW</option>
                    <option  value="Ford" >Ford</option>
                    <option  value="Chevorlet" >Chevrolet</option>
                    <option  value="Dodge" >Dodge</option>
                                </select>

    <select name ="year"
        onChange={this.changeState}>
                     <option  name="" disabled>Choose option</option>
                     <option  value="" selected>Year</option>
                     <option  value="2015" >2015</option>
                     <option  value="2016" >2016</option>
                     <option  value="2017" >2017</option>
                     <option  value="2018" >2018</option>
                     <option  value="2019" >2019</option>
                     <option  value="2020" >2020</option>
</select>

                     <select name ="color"
        onChange={this.changeState}>
                       <option value="" disabled>Choose option</option>
                       <option value="" selected>Color</option>
                       <option value="Black" >Black</option>
                       <option value="Grey" >Grey</option>
                       <option value="White" >White</option>
                       <option value="Blue" >Blue</option>
                       <option value="Orange" >Orage</option>
</select>

    <select name ="opreation"
        onChange={this.changeState}>
                    <option name="" disabled>Choose option</option>
                    <option name="" selected>Opreation</option>
                    <option value="rent">For rent</option>
                    <option value="sale">For sale</option>
                </select>

<input type='text' placeholder='descreption'  onChange={this.changeStateDescreption}></input>
<input type='text' placeholder='price'  onChange={this.changeStatePrice}></input>

<input type="file" onChange={this.handleChange.bind(this)} />

 <button  onClick ={this.addCar.bind(this) } type="submit">Post</button>
 </form>
</div>

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

//     // </div> */}
)}}
export default AddCar;