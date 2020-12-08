// import React, { Component } from 'react';
import React from 'react'

import { Link } from 'react-router-dom';

function Nav () {
  return (
      <div>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link  to="/#" className="navbar-brand"  style={{marginLeft :"30px"}}>Carsooq</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">

                <li className="navbar-item">
                     <Link to="/inventory" className="nav-link" style={{marginLeft:"400px"}} >Inventory</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/signup" className="nav-link" style={{marginLeft:"300px"}}>SIGN UP</Link>
                </li>
                <li className="navbar-item">
                      <Link to="/login" className="nav-link" style={{marginLeft:"50px"}}>LOG IN </Link>
                </li>
                <li className="navbar-item">
                     <Link to="/footer" className="nav-link" style={{marginLeft:"90px"}}>ABOUT US</Link>
                </li>


                </ul>
            </div>



       </nav>
        </div>

  );
}

export default Nav ;
