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
