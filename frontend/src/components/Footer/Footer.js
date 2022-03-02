import React from "react";
import {Link} from 'react-router-dom';

import './Footer.css'
const Footer = () => (
  <div className="footer">
   
   
  
    <div className="center">
        <p>Copyrights 2022 &copy;</p>
    </div>
    <div className="left">   
      <Link className="nav-link" style={{ color: '#FFF' }} to="/contactus" >Contact Us</Link> 
    </div>
    <div className="right">
      <Link className="nav-link" style={{ color: '#FFF' }} to="/aboutus">About Us</Link>   
    </div>
    

  </div>
  
);

export default Footer;