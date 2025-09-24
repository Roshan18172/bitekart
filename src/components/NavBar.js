import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const restaurantName = localStorage.getItem("restaurantName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-5">
      <Link className="navbar-brand fw-bold fs-5" to="/">🍴 BiteKart</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link active" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item d-flex align-items-center me-3">
                <i className="bi bi-person-circle fs-4 me-2"></i>
                <span className="text-white fw-bold">{restaurantName}</span>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/restaurant-dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light ms-3"
                  onClick={handleLogout}>Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
