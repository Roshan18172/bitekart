import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userType");     // user / restaurant / delivery
  let name = "";
  if (role === "user") name = localStorage.getItem("userName");
  if (role === "restaurant") name = localStorage.getItem("restaurantName");
  if (role === "delivery") name = localStorage.getItem("deliveryName");     // store name on login

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-5">
      <Link className="navbar-brand fw-bold fs-5" to="/">
        🍴 BiteKart
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          {/* ----------------------- WHEN NOT LOGGED IN ----------------------- */}
          {!token && (
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
          )}

          {/* ----------------------- WHEN LOGGED IN ----------------------- */}
          {token && (
            <>
              {/* Show logged-in name */}
              <li className="nav-item d-flex align-items-center me-3">
                <i className="bi bi-person-circle fs-4 me-2"></i>
                <span className="text-white fw-bold">{name}</span>
              </li>

              {/* ----------------------- USER NAV ----------------------- */}
              {role === "user" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/home">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/my-orders">My Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/cart"><i className="bi bi-cart"></i>Cart</Link>
                  </li>
                </>
              )}

              {/* ----------------------- RESTAURANT NAV ----------------------- */}
              {role === "restaurant" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/restaurant-dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/restaurant/menu-manager">
                      Menu
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/manage-orders">
                      Orders
                    </Link>
                  </li>
                </>
              )}

              {/* ----------------------- DELIVERY PARTNER NAV ----------------------- */}
              {role === "delivery" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/delivery-home">
                      Delivery Panel
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/delivery/tasks">
                      My Tasks
                    </Link>
                  </li>
                </>
              )}

              {/* ----------------------- LOGOUT ----------------------- */}
              <li className="nav-item">
                <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                  Logout
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
