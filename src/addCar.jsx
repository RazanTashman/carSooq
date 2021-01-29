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
          // this.setState({url:url});
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
          // this.state.loading=true
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
    // padding: "10px"
  };
  return (
    <div>

<h1 style={{fontFamily: 'Lobster',color:"#3d4035", textAlign:"center", backgroundColor:"orange"}}>Add Cars </h1>






{/* <form>
  <div class="form-group">
    <label for="formGroupExampleInput">Example label</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Another label</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input">
  </div>
</form>

 */}




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


///*********************************************************************************************************** */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import { storage } from './firebase/firebase'
// import Nav from './nav'
// import { Spinner } from 'reactstrap'
// // import {getTOKEN} from './hel'


// class AddCar extends React.Component {
//   constructor() {
//     super();
//  this.state = {
//       descreption:"",
//       brand:"",
//       year:0,
//       color:"",
//       price :0,
//       operation:"",
//       image:null,
//       url:"",
//       nameOftheimage:"",
//       loading:false


//  }
// this.changeStateDescreption=this.changeStateDescreption.bind(this);
// this.changeStatePrice=this.changeStatePrice.bind(this);
// this.changeState=this.changeState.bind(this);
// }

// changeState(event){
//   this.setState({ [event.target.name]: event.target.value });
//   // this.setState({descreption : event.target.value})

// }

// changeStateDescreption(event){
//   // this.setState({ [event.target.name]: event.target.value });
//   this.setState({descreption : event.target.value})

// }
// changeStatePrice(event){
//   this.setState({price : event.target.value})

// }
// // handleChange(e){
// //   if (e.target.files[0]) {
// // this.setState({
// //   image:e.target.files[0]
// // })
// // console.log("image::::", this.state.image)
// //  }}


// // handleUpload () {
// //   var that=this;
// //   const uploadTask = storage.ref(`cars/${this.state.nameOftheimage}`).put(this.state.image);
// //   uploadTask.on(
// //     "state_changed",
// //     snapshot => {},

// //     error => {
// //       console.log(error);
// //     },
// //     () => {
// //       storage
// //         .ref("cars")
// //         .child(this.state.nameOftheimage )
// //         .getDownloadURL()
// //         .then(url => {
// //           console.log('url:' ,url)
// //           this.setState({url:url});
// //         });
// //     }
// //   );
// // };



// // Upload(){
// //   this.handleUpload()
// // }
// // ******************************************************

// handleChange(e){

//   // e.preventDefault();
// // this.setState({
// //   image:e.target.files[0]
// // })
// if (e.target.files[0]) {
//   console.log("imageINNN::",e.target.files[0])
//   const image = e.target.files[0];
//   this.setState(() => ({image}));
//   console.log("image::",this.state.image)
// }

// console.log("image::",this.state.image)
//  }


//  async imageUpload (e)  {
//   const {image} = this.state;
//    const imageLink = storage.ref(`images/${image.name}`).put(image)

//    imageLink.on(
//       "state_changed",
//       snapshot => {},
//       error => {
//         console.log(error)
//       },
//       () => {
//         storage
//         .ref("images")
//         .child(image.name)
//         .getDownloadURL()
//         .then(url => {
//         //  orderData.image = url

//           console.log(url)
//           this.setState({url:url});
//           this.setState({loading:true});
//         })
//       })


// }

// // addCar(){
//   async addCar (e)  {
//     this.imageUpload ()
//   var that = this
//   //  var token =(localStorage.getItem('token'));
// // eader.append('Authorization',token );
// //   console.log(this.state.brand)
// //   console.log("ifvkv")

//   // console.log("tTTTTT:",token)  const header = new Headers();
// // h
// // var token=localStorage.getItem("token")
// //   var headers = new HttpHeaders().set('Authorization', '' + this.token).set('Content-Type', 'application/json; charset=utf-8')
//   $.ajax({
//     method: 'POST',
//     url:'http://localhost:7000/add',
//     data : JSON.stringify({
//     descreption:this.state.descreption ,
//     brand: this.state.brand,
//     year: this.state.year,
//     color: this.state.color,
//     price: this.state.price,
//     operation: this.state.operation,
//     // url:this.state.url
//     }),
//     contentType: "application/json",

//       headers: {"Authorization": localStorage.getItem('token')}
//     ,
//     success:function(){

//       console.log('DONE.............................')
//     },
//     error: function(err){
//       console.log('error:' ,err)
//     }
//   })

// }
// render(){
//   return (
//     <div>
//        <Nav />
//        <form >
//     <select name ="brand"
//         onChange={this.changeState}  >
//                     <option name="" disabled>Choose option</option>
//                     <option  value="Brand"  selected>Brand</option>
//                     <option  value="BMW" >BMW</option>
//                     <option  value="Ford" >Ford</option>
//                     <option  value="Chevorlet" >Chevrolet</option>
//                     <option  value="Dodge" >Dodge</option>
//                                 </select>

//     <select name ="year"
//         onChange={this.changeState}>
//                      <option  name="" disabled>Choose option</option>
//                      <option  value="" selected>Year</option>
//                      <option  value="2015" >2015</option>
//                      <option  value="2016" >2016</option>
//                      <option  value="2017" >2017</option>
//                      <option  value="2018" >2018</option>
//                      <option  value="2019" >2019</option>
//                      <option  value="2020" >2020</option>
// </select>

//                      <select name ="color"
//         onChange={this.changeState}>
//                        <option value="" disabled>Choose option</option>
//                        <option value="" selected>Color</option>
//                        <option value="Black" >Black</option>
//                        <option value="Grey" >Grey</option>
//                        <option value="White" >White</option>
//                        <option value="Blue" >Blue</option>
//                        <option value="Orange" >Orage</option>
// </select>

//     <select name ="operation"
//         onChange={this.changeState}>
//                     <option name="" disabled>Choose option</option>
//                     <option name="" selected>operation</option>
//                     <option value="rent">For rent</option>
//                     <option value="sale">For sale</option>
//                 </select>

// <input type='text' placeholder='descreption'  onChange={this.changeStateDescreption}></input>
// <input type='text' placeholder='price'  onChange={this.changeStatePrice}></input>

// <input type="file" onChange={this.handleChange.bind(this)} />
// {/*
//  <button  onClick ={this.addCar.bind(this) } type="submit">
//  class="btn btn-primary"><i class="fa fa-paper-plane"></i> {  this.state.loading && <SpinnerBS.Spinner
//                   as="span"
//                   animation="grow"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                 />}
//    Post</button> */}


//    <button type="submit" onClick ={this.addCar.bind(this) } class="btn btn-primary"><i class="fa fa-paper-plane"></i> {  this.state.loading && <Spinner
//                   as="span"
//                   animation="grow"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                 />} Add</button>
//  {/* <button  onClick ={this.Upload.bind(this) } type="submit">Upload</button> */}
//  </form>
// </div>

// //     //     <h5 className="card-header info-color white-text text-center py-4">
// //     //         <strong>Add your car</strong>
// //     //     </h5>

// //     //     <div className="card-body px-lg-5 pt-0">

// //     //         <form className="text-center" style="color: #757575;" action="#!">
// // // className="mdb-select"
// //                 <select >
// //                     <option name="" disabled>Choose option</option>
// //                     <option value="Brand" name ="brand" selected>Brand</option>
// //                     <option value="BMW" name ="brand">BMW</option>
// //                     <option value="Ford" name ="brand">Ford</option>
// //                     <option value="Chevorlet" name ="brand">Chevrolet</option>
// //                     <option value="Dodge" name ="brand">Dodge</option>

// //                 </select>
// // // className="mdb-select"
// //                 <select >
// //                     <option name="" disabled>Choose option</option>
// //                     <option value="" selected>Year</option>
// //                     <option value="2015" name ="year">2015</option>
// //                     <option value="2016" name ="year">2016</option>
// //                     <option value="2017" name ="year">2017</option>
// //                     <option value="2018" name ="year">2018</option>
// //                     <option value="2019" name ="year">2019</option>
// //                     <option value="2020" name ="year">2020</option>
// // {/* className="mdb-select" */}
// //                 </select>
// //                 <select >
// //                     <option value="" disabled>Choose option</option>
// //                     <option value="" selected>Color</option>
// //                     <option value="Black" name ="color">Black</option>
// //                     <option value="Grey" name ="color">Grey</option>
// //                     <option value="White" name ="color">White</option>
// //                     <option value="Blue" name ="color">Blue</option>
// //                     <option value="Orange" name ="color">Orage</option>
// // {/* className="mdb-select"> */}
// //                 </select>
// //                 <select >
// //                     <option name="" disabled>Choose option</option>
// //                     <option name="" selected>Opreation</option>
// //                     <option name="opreation" value="rent">For rent</option>
// //                     <option name="opreation" value="sale">For sale</option>
// //                 </select>
// //                 // <form>
// //   {/* <div className="form-group">class="form-control-file"  */}
// //     <input type="file" id="exampleFormControlFile1"/>
// //   // </div>
// // // </form>
// // // id="materialContactFormMessage"
// //                 // <div className="md-form">className="form-control md-textarea"
// //                     <textarea  rows="3"></textarea>
// //                     <label for="materialContactFormMessage">Description</label>
// //                 // </div>


// //                 <button className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect" type="submit">Post</button>

// //         //     </form>
// //         // </div>

// //     // </div> */}
// )}}
// export default AddCar;

