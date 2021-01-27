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
                     <Link to="/inventory" className="nav-link" style={{marginLeft:"90px",fontWeight: 'bold', fontSize:"15px"}} >Inventory</Link>
                </li>




                <li className="navbar-item">
                     <Link to="/filter" className="nav-link" style={{marginLeft:"50px",fontWeight: 'bold', fontSize:"15px"}} >Add Cars</Link>
                </li>

                <li className="navbar-item">
                     <Link to="/profile" className="nav-link" style={{marginLeft:"50px",fontWeight: 'bold', fontSize:"15px"}} >profile</Link>
                </li>


                <li className="navbar-item">
                     <Link to="/aboutus" className="nav-link" style={{marginLeft:"50px",fontWeight: 'bold', fontSize:"15px"}}>About Us</Link>
                </li>

                <li className="navbar-item">
                     <Link to="/wishlist" className="nav-link" style={{marginLeft:"400px",fontWeight: 'bold', fontSize:"15px"}} >wishlist</Link>
                </li>

                <li className="navbar-item">
                     <Link to="/" className="nav-link"  style={{marginLeft:"50px",fontWeight: 'bold', fontSize:"15px"}} onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('id')}}>Sign Out</Link>
                </li>
                </ul>

            </div>
                </nav>
                </div>
  );
}

export default Header;
