import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand" style={{marginLeft:"50px"}}>Carsooq</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                     <Link to="/inventory" className="nav-link" style={{marginLeft:"500px"}} >Inventory</Link>
                </li>
                <li className="navbar-item">
                     <Link to="/profile" className="nav-link"><i style={{fontSize:"35px", marginLeft:"550px"}}className="fas fa-user-circle"></i></Link>
                </li>
                <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/profile">Profile</Link>

          <div className="dropdown-divider"></div>
          <Link className="dropdown-item"to="/">Sign Out </Link>
        </div>

            </li>
                </ul>
            </div>
                </nav>
                </div>
  );
}

export default Header;
