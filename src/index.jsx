import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'


import {BrowserRouter as Router,Route} from   "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './home';
import Inventory from './inventory';
import Signup from './signup';
import Login from './login';
import Profile from './profile';
import Wishlist from './wishlist';
import Car from './car';
import Filter from './filter'
import About from './about'
import AddCar from './addCar';
import Car2 from './car2'
import Form from './form'


function App()  {

  return (

    <Router>
        <div >
         <Route path ='/' exact  component ={Home}></Route>
         <Route path ='/inventory' exact component ={Inventory}></Route>
         <Route path ='/signup' exact  component ={Signup}></Route>
         <Route path ='/login' exact component ={Login}></Route>
         <Route path ='/profile' exact component ={Profile}></Route>
         <Route path ='/wishlist' exact component ={Wishlist}></Route>
         <Route path ='/car'  component ={Car}></Route>
         <Route path ='/filter'  component ={Filter}></Route>
         <Route path ='/filter'  component ={AddCar}></Route>
         <Route path ='/aboutus'  component ={About}></Route>
         <Route path ='/car2'  component ={Car2}></Route>
         <Route path ='/form'  component ={Form}></Route>
        </div>
  </Router>

  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


