import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className="text-center text-light d-flex flex-column justify-content-center align-items-center"
        style={{ height: "70vh", background: "url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg') center/cover no-repeat" }}>
        <h1 className="fw-bold display-3">Delicious Food, Delivered Fast 🚀</h1>
        <p className="fs-5">Order from your favorite restaurants or manage your own on BiteKart</p>
        <div className="input-group w-50 mt-3">
          <input type="text" className="form-control" placeholder="Search restaurants or cuisines..." />
          <button className="btn btn-warning">Search</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <h3>🍔 Order Food</h3>
              <p>Explore menus and get your favorite meals delivered in minutes.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <h3>📦 Track Orders</h3>
              <p>Stay updated with real-time tracking of your food order.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <h3>🏪 Add Restaurant</h3>
              <p>Restaurant owners can add menus and manage incoming orders easily.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer/>

      {/* Footer */}
      {/* <footer className="bg-dark text-light text-center py-3">
        <p className="mb-0">© 2025 BiteKart. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;
