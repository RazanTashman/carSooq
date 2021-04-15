import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { storage } from './firebase/firebase'
import Nav from './nav'
import { Spinner } from 'reactstrap'
class AddCar extends React.Component {
  constructor() {
    super();
 this.state = {
      descreption:"",
      brand:"",
      year:0,
      color:"",
      price :0,
      operation:"",
      image:null,
      // url:"",
      nameOftheimage:"",
      loading:false


 }
this.changeStateDescreption=this.changeStateDescreption.bind(this);
this.changeStatePrice=this.changeStatePrice.bind(this);
this.changeState=this.changeState.bind(this);
}

changeState(event){
  this.setState({ [event.target.name]: event.target.value });

}

changeStateDescreption(event){
  this.setState({descreption : event.target.value})

}
changeStatePrice(event){
  this.setState({price : event.target.value})


}
handleChange(e){
if (e.target.files[0]) {
  console.log("imageINNN::",e.target.files[0])
  const image = e.target.files[0];
  this.setState(() => ({image}));
  console.log("image::",this.state.image)
}
console.log("image::",this.state.image)
 }


 async imageUpload (e)  {
  const {image} = this.state;
   const imageLink = storage.ref(`images/${image.name}`).put(image)

   imageLink.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error)
      },
      () => {
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          console.log(url)
          this.state.image=url

          $.ajax({
            method: 'POST',
            url:'http://localhost:7000/add',
            data : JSON.stringify({
            descreption:this.state.descreption ,
            brand: this.state.brand,
            year: this.state.year,
            color: this.state.color,
            price: this.state.price,
            operation: this.state.operation,
            image:this.state.image,
            id:localStorage.getItem('id')
            }),
            contentType: "application/json",
            success:function(){

              console.log('DONE.............................')
            },
            error: function(err){
              console.log('error:' ,err)
            }
          })
          this.setState({loading:true});
          window.location = '/profile';
        })
      })


}


async addCar (e)  {
  e.preventDefault();
  this.imageUpload ()

}

render(){
  const mystyle = {
    width: "550px",
    marginLeft:"450px",
    marginTop:"80px"
  };
  return (
    <div>

<h1 style={{fontFamily: 'Lobster',color:"#3d4035", textAlign:"center", backgroundColor:"orange"}}>Add Cars </h1>



       <form  action="/profile" style={mystyle}  >
    <select name ="brand" id="inputState" class="form-control"
        onChange={this.changeState}  >
                    <option name="" disabled>Choose option</option>
                    <option  value="Brand"  selected>Brand</option>
                    <option  value="BMW" >BMW</option>
                    <option  value="Chevorlet" >Chevrolet</option>
                    <option  value="Dodge" >Dodge</option>
                    <option  value="Ford" >Ford</option>
                    <option  value ="Mercedes">Mercedes </option>
                                </select>
<br/>
    <select name ="year" id="inputState" class="form-control"
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
<br/>
                     <select name ="color" id="inputState" class="form-control"
        onChange={this.changeState}>
                       <option value="" disabled>Choose option</option>
                       <option value="" selected>Color</option>
                       <option value="Black" >Black</option>
                       <option value="Blue" >Blue</option>
                       <option value="Grey" >Grey</option>
                       <option value="Orange" >Orage</option>
                       <option value ="red">Red </option>
                       <option value="White" >White</option>
</select>
<br/>
    <select id="inputState" class="form-control" name ="operation"
        onChange={this.changeState}>
                    <option name="" disabled>Choose option</option>
                    <option name="" selected>operation</option>
                    <option value="rent">For rent</option>
                    <option value="sale">For sale</option>
                </select>
                <br/>
<input type='text' class="form-control" id="formGroupExampleInput2" placeholder='descreption'  onChange={this.changeStateDescreption}></input>
<br/>
<input type='text' placeholder='price'  class="form-control" id="formGroupExampleInput2" onChange={this.changeStatePrice}></input>
<br/>
<div class="custom-file">
<input type="file"  class="custom-file-input" id="customFile"  onChange={this.handleChange.bind(this)} />
<label class="custom-file-label" for="customFile">Choose file</label>
</div>
<br/><br/>
<button type="submit" onClick ={this.addCar.bind(this) }  style={{width: "550px"} } class="btn btn-dark"> {  this.state.loading && <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />} Add</button>
 </form>
</div>
  )


}}

export default AddCar;
