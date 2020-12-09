import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand" style={{marginLeft:"50px" ,fontWeight: 'bold', fontSize:"30px"}}>Carsooq</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                     <Link to="/inventory" className="nav-link" style={{marginLeft:"430px", fontWeight: 'bold', fontSize:"21px"}} >Inventory</Link>
                </li>

                <li className="navbar-item">
                     <Link to="/profile" className="nav-link"><i style={{fontSize:"35px", marginLeft:"650px"}} className="fas fa-user-circle"></i></Link>
                </li>
                <li>
               <div className="dropdown">
                {/* <form> */}

                  <select style={{maxWidth:"7px" , maxHeight:"5px", marginTop:"20px",marginLeft:"10px" }}>
                    <option ></option>
                    <option value ="signout">Profile </option>
                    <option value ="signout">Sign Out</option>
                    </select>
                  {/* </form> */}
                  </div >
                {/* <li className="nav-item dropdown">
        <li className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

        </li>
        <div className="dropdown-menu" >
          <li className="dropdown-item" to="/profile">Profile</li>

          <div className="dropdown-divider"></div>
          <li className="dropdown-item"to="/">Sign Out </li>
        </div> */}

            </li>
                </ul>
            </div>
                </nav>
                </div>
  );
}

export default Header;
