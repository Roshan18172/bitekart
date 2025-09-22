import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-5">
      <Link className="navbar-brand fw-bold fs-5" to="/">🍴 BiteKart</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link active" to="/home">Home</Link></li>
          <li className="nav-item"><Link className="nav-link active" to="/register">Register</Link></li>
          <li className="nav-item"><Link className="nav-link active" to="/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link active" to="/add-restaurant">Add Restaurant</Link></li>
          <li className="nav-item"><Link className="nav-link active" to="/cart"><i className="bi bi-cart2"></i> Cart</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
