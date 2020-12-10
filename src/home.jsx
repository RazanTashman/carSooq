// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import React from 'react'
import Nav from './nav'


function Home () {
  return (
      <div className="bg-dark" >
    <Nav />
        <iframe src="https://www.youtube.com/embed/Xd0Ok-MkqoE?autoplay=1"  width="100%" height="800" frameBorder="0" allowFullScreen allow="autoplay" title="myFrame" ></iframe>


        <footer className="footer mt-auto py-3" style={{color:'lightgray', margin:"0 auto", textAlign:'center'}} >
      <div className="container"  >
        <span id = "footer" >&#169;  COPYRIGHT 2020. All Rights Reserved.</span><br/>
        <span >While using this site, you agree to have read and accepted our terms of use, cookie and privacy policy. </span>
      </div>
    </footer>
        </div>

  );
}

export default Home ;

// {/* <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
//         <Link to="/" className="navbar-brand">Carsooq</Link>
//             <div className="collpase navbar-collapse">
//             <ul className="navbar-nav mr-auto">

//                 <li className="navbar-item">
//                      <Link to="/inventory" className="nav-link">Inventory</Link>
//                 </li>
//                 <li className="navbar-item">
//                     <Link to="/signup" className="nav-link">SIGN UP</Link>
//                 </li>
//                 <li className="navbar-item">
//                       <Link to="/login" className="nav-link">LOG IN </Link>
//                 </li>
//                 <li className="navbar-item">
//                      <Link to="/home#footer" className="nav-link">ABOUT US</Link>
//                 </li>
//                 {/* <li className="navbar-item">
//                       <Link to="/createMark" className="nav-link">Add marks</Link>
//                 </li> */}

//                 </ul>
//             </div>
//         </nav> */}
