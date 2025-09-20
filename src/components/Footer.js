import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5">
      <div className="container">
        <div className="row">
          {/* Brand */}
          <div className="col-md-2 mb-4">
            <h2 className="fw-bold text-danger">BiteKart</h2>
          </div>

          {/* About Section */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">ABOUT BITEKART</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Who We Are</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Blog</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Work With Us</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Investor Relations</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Contact Us</a></li>
            </ul>
          </div>

          {/* BiteKart Universe */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">BITEKART UNIVERSE</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">BiteKart</a></li>
              <li><a href="/" className="text-dark text-decoration-none">QuickBite</a></li>
              <li><a href="/" className="text-dark text-decoration-none">BiteKart Pro</a></li>
              <li><a href="/" className="text-dark text-decoration-none">BiteKart Live</a></li>
            </ul>
          </div>

          {/* For Restaurants */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">FOR RESTAURANTS</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Partner With Us</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Apps For You</a></li>
            </ul>
          </div>

          {/* Learn More */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">LEARN MORE</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Privacy</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Security</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Terms</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold mb-3">SOCIAL LINKS</h6>
            <div className="d-flex gap-3 mb-3">
              <a href="/" className="text-primary fs-5"><i className="bi bi-linkedin"></i></a>
              <a href="/" className="text-info fs-5"><i className="bi bi-instagram"></i></a>
              <a href="/" className="text-dark fs-5"><i className="bi bi-twitter-x"></i></a>
              <a href="/" className="text-danger fs-5"><i className="bi bi-youtube"></i></a>
              <a href="/" className="text-primary fs-5"><i className="bi bi-facebook"></i></a>
            </div>
            <div className="d-flex flex-column gap-2">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" width="150"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width="150"/>
            </div>
          </div>
        </div>

        <hr />
        <div className="text-center pb-3">
          <small>By using BiteKart, you agree to our Terms of Service, Cookie Policy, and Privacy Policy. <br /> © 2025 BiteKart Ltd. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
