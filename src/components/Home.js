import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-4">
        <Link className="navbar-brand fw-bold fs-3" to="/">🍴 BiteKart</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-restaurant">Add Restaurant</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center text-dark d-flex flex-column justify-content-center align-items-center"
        style={{ height: "70vh", background: "url('https://source.unsplash.com/1600x900/?food,restaurant') center/cover no-repeat" }}>
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

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        <p className="mb-0">© 2025 BiteKart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
