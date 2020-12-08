// import { Link } from 'react-router-dom';
import React from 'react'
 import Header from './header'
//  import img from './CarSooqLogo.png'

//  function CarList(props) {
//   return (
//   <div className="col-sm-6">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">Special title treatment</h5>
//         <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
//         <a href="#" className="btn btn-primary">Go somewhere</a>
//       </div>
//     </div>
//   </div>

// )
// }


function Inventory() {
  return (
   <div>
     <Header/>

     <div className="d-flex">

     <div  className=" p-2 bg-light border-right" id="sidebar-wrapper" style ={{ width:"20rem"}}>
      <div className="sidebar-heading">Advertisement </div>
      <div className="list-group list-group-flush">
      {/* <img src={img} style={{height:"100px", width:"100px"}}/>
        <a href="" className="list-group-item list-group-item-action bg-light" id="bottom-list">addd</a>
        <a href="" className="list-group-item list-group-item-action bg-light" id="active-list">adv</a>
        <a href="" className="list-group-item list-group-item-action bg-light" id="bag-list">ad pic</a> */}

      </div>
    </div>

<div className=" p-2 container">

<div className="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
  {/* <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div> */}
</div>

  {/* <div className="row">
    <div className="col ">
      <img src="images/b1.png" />
      <p>Pleated PU leather midi skirt  </p>
      <h5>price: 80$</h5>

      <button type="button" className="btn btn-dark"> kjdj c </button>
    </div>
    <div className="col">
      <img src="images/b2.png" />
      <p>Corset lace-up PU Leather  flare skirt  </p>
      <h5>price: 95$</h5>

      <button type="button" className="btn btn-dark"> ajknk</button>

    </div>
    <div className="col">
      <img src="images/b3.png" />
      <p>Black high waist cargo pants</p>
      <h5>price: 85$</h5>

      <button type="button" className="btn btn-dark">hahdbdb</button>

    </div>
  </div>
  <div className="row">
    <div className="col">
      <img src="images/b4.png" />
      <p> Black Jeans high waist baggy pants</p>
      <h5>price: 50$</h5>

      <button type="button" className="btn btn-dark"> ahshdh</button>

    </div>
    <div className="col">
      <img src="images/b5.png" />
      <p>Belted PU leather shorts</p>
      <h5>price: 36$</h5>

      <button type="button" className="btn btn-dark"> ahsdldl</button>

    </div>
    <div className="col">
      <img src="images/b6.png" />
      <p>Paperbag waist jean  shorts  </p>
      <h5>price: 35$</h5>


      <button type="button" className="btn btn-dark"> Ajsjk 9</button>

    </div>
  </div>
</div> */}
</div></div>
</div>
  );
}

export default Inventory;
