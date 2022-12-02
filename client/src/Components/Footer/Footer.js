import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './footer.css'
import logo from '../../logo.png'
 
const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="contentSection">
        <div className="footerLogoContainer">
          <div className="footerLogo"><img src={logo}></img></div>
        </div>
        <p>Welcome to SkylineCulture webstore! Support the page by shopping our items and be sure to follow us on Instagram: @skylineculture.</p>
      </div>
      <div className="linkSection">
        <div className="Links">
        <h3 className="linkTitle">Navigate</h3>
          <ul className="listItems">
            <li>Home</li>
            <li>Keychains</li>
            <li>Stickers</li>
            <li>Diecast Cars</li>
          </ul>
        </div>
        <div className="Links" id="Inquiries">
        <h3 className="linkTitle">Inquiries</h3>
          <ul className="listItems">
            <li>Track Order</li>
            <li>Contact</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="copyrightBanner">
        &copy; {new Date().getFullYear()} Copyright: skylineculture.onrender.com
      </div>
    </div>
   
  );
}

export default Footer;