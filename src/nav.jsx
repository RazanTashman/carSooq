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
                     <Link to="/inventory" className="nav-link" style={{marginLeft:"90px",fontWeight: 'bold', fontSize:"15px"}} >Inventory</Link>
                </li>

                <li className="navbar-item">
                     <Link to="/filter" className="nav-link" style={{marginLeft:"50px",fontWeight: 'bold', fontSize:"15px"}} >Add Cars</Link>
                </li>

                <li className="navbar-item">
                     <Link to="/profile" className="nav-link" style={{marginLeft:"15px",fontWeight: 'bold', fontSize:"15px"}} >profile</Link>
                </li>

                <li className="navbar-item">
                     <Link to="/aboutus" className="nav-link" style={{marginLeft:"1px",fontWeight: 'bold', fontSize:"15px"}}>About Us</Link>
                </li>

                <li className="navbar-item">
                    <Link to="/signup" className="nav-link" style={{marginLeft:"500px",fontWeight: 'bold', fontSize:"15px"}}>Sign up</Link>
                </li>
                <li className="navbar-item">
                      <Link to="/login" className="nav-link" style={{marginLeft:"20px",fontWeight: 'bold', fontSize:"15px"}}>Login  </Link>
                </li>



                </ul>
            </div>



       </nav>
        </div>

  );
}

export default Nav ;
