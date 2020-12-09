// import logo from './logo.svg';
import React from 'react'
import './about.css';
import Header from './header'
function About() {
  return (
    <div >
      <Header/>
      <br/>
      <div style={{maxWidth: "1200px", margin:"0 auto"}}>
      <div className="about-section" style={{backgroundColor:'orange'}}>
  <h1 style={{fontWeight:'bold'}}>About Carsooq</h1>
  {/* <p>Some text about who we are and what we do.</p> */}
  <p style={{fontWeight:'bold', fontSize:"20px"}}>  CarSooq team understands that buying a car is a significant
                  and impactful life decision. Therefore, we like to know our
                  customers and taking the time to build a meaningful, long-term
                  relationship. We interview our customers because we believe in
                  establishing or re-establishing a positive credit history, to
                  benefit them -not only on the short term- on the long term as
                  well.</p><br/>
                  <h5 style={{color: 'gray', fontWeight:'bold'}}>SIGN UP TO BE PART OF OUR FAMILY.</h5>
      <i style={{marginLeft: '5px', marginRight: '20px',fontSize:"30px"}} class="fab fa-facebook"></i><i style={{marginLeft: '5px', marginRight: "20px" ,fontSize:"30px"}} class="fab fa-whatsapp"></i><i style={{marginLeft: '5px', marginRight: "20px" ,fontSize:"30px"}}  class="fab fa-twitter"></i><i style={{marginLeft: '5px', marginRight: "20px" ,fontSize:"30px"}}  class="fab fa-instagram"></i>
</div>

<h2 style={{textAlign:"center"}}>Our Team</h2>
<div className="row">
  <div className="column">
    <div className="card">
      <img src="/w3images/team1.jpg" alt="Jane" style={{width:"100%"}}/>
      <div className="container">
        <h2>Jane Doe</h2>
        <p className="title">CEO & Founder</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>jane@example.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="/w3images/team2.jpg" alt="Mike" style={{width:"100%"}}/>
      <div className="container">
        <h2>Mike Ross</h2>
        <p className="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>mike@example.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="/w3images/team3.jpg" alt="John" style={{width:"100%"}}/>
      <div className="container">
        <h2>John Doe</h2>
        <p className="title">Designer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>john@example.com</p>
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>
</div>
    </div>

  );
}

export default About;
