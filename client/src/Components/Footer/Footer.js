import React from "react";
import './footer.css'
import logo from '../../logo.png'
import { Link } from "react-router-dom";
 
const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="contentSection">
        <div className="footerLogoContainer">
          <div className="footerLogo"><img src={logo}></img></div>
        </div>
        <p>Be sure to follow @skylineculture on Instagram to stay up to date with our store!</p>
      </div>
      <div className="linkSection">
        <div className="Links">
        <h3 className="linkTitle">Navigate</h3>
          <ul className="listItems">
            <Link to='/'><li>Home</li></Link>
            <Link to="/keychains"><li>Keychains</li></Link>
            <Link to="/stickers"><li>Stickers</li></Link>
            <Link to="/diecast-cars"><li>Diecast Cars</li></Link>
          </ul>
        </div>
        <div className="Links" id="Inquiries">
        <h3 className="linkTitle">Inquiries</h3>
          <ul className="listItems">
            <Link to="/track-order"><li>Track Order</li></Link>
            <Link to="/contact-us"><li>Contact</li></Link>
            <Link to="/terms-and-service"><li>Terms and Service</li></Link>
            <Link to="/privacy-policy"><li>Privacy Policy</li></Link>
          </ul>
        </div>
      </div>
      <div className="copyrightBanner">
        &copy; {new Date().getFullYear()} Copyright: skylineculture.store
      </div>
    </div>
   
  );
}

export default Footer;