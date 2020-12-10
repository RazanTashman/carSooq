// import React, { Component } from 'react';
import React from 'react'
import logo from './logo.webp'
import { Link } from 'react-router-dom';

function Nav () {
  return (
      <div>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    <Link to="/" className="navbar-brand" ><img src={logo}  style={{width:"90px" , height:"60px"}}/></Link>
        <Link  to="/#" className="navbar-brand"  style={{marginLeft :"10px",fontWeight: 'bold', fontSize:"30px"}}>Carsooq</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">

                <li className="navbar-item">
                     <Link to="/inventory" className="nav-link" style={{marginLeft:"420px",fontWeight: 'bold', fontSize:"21px"}} >Inventory</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/signup" className="nav-link" style={{marginLeft:"400px",fontWeight: 'bold', fontSize:"15px"}}>SIGN UP</Link>
                </li>
                <li className="navbar-item">
                      <Link to="/login" className="nav-link" style={{marginLeft:"20px",fontWeight: 'bold', fontSize:"15px"}}>LOG IN </Link>
                </li>
                <li className="navbar-item">
                     <Link to="/aboutus" className="nav-link" style={{marginLeft:"30px",fontWeight: 'bold', fontSize:"15px"}}>ABOUT US</Link>
                </li>


                </ul>
            </div>



       </nav>
        </div>

  );
}

export default Nav ;
