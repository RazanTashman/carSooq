import React from 'react'
import { Link } from 'react-router-dom'

import logo from './logo.webp'
function Header() {
  return (
    <div>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

    <Link to="/" className="navbar-brand" ><img src={logo}  style={{width:"90px" , height:"60px"}}/></Link>
        <Link to="/" className="navbar-brand" style={{marginLeft:"5px" ,fontWeight: 'bold', fontSize:"30px"}}>Carsooq</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                     <Link to="/inventory" className="nav-link" style={{marginLeft:"440px", fontWeight: 'bold', fontSize:"21px"}} >Inventory</Link>
                </li>

                <li className="navbar-item">
                     <Link to="/profile" className="nav-link"><i style={{fontSize:"35px", marginLeft:"550px"}} className="fas fa-user-circle"></i></Link>
                </li>
                <li className="navbar-item">
                     <Link to="/" className="nav-link"  onClick={()=>{localStorage.removeItem('token')}}>Sign Out</Link>
                </li>
                </ul>
            </div>
                </nav>
                </div>
  );
}

export default Header;
