import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      {/* <h1>Footer</h1> */}
      <div className="links-wrapper">
        <ul>
          <div className="links-heading">About</div>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Careers</li>
        </ul>
        <ul>
          <div className="links-heading">Help</div>
          <li>Reports</li>
          <li>Cancellation & Returns</li>
          <li>FAQ</li>
        </ul>
        <ul>
          <div className="links-heading">Social</div>
          <li>YouTube</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
