import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const BiteHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/public/restaurants/all");
        setRestaurants(res.data.restaurants);
      } catch (err) {
        console.error("Error loading restaurants:", err);
      }
    };

    loadRestaurants();
  }, []);

  const openRestaurant = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="container my-4">
      <div className="d-flex gap-3 mb-4">
        <button className="btn btn-outline-secondary">Filters</button>
        <button className="btn btn-outline-success">Pure Veg</button>
        <button className="btn btn-outline-danger">Non Veg</button>

        <div className="dropdown">
          <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
            Cuisines
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">North Indian</a></li>
            <li><a className="dropdown-item" href="#">Chinese</a></li>
            <li><a className="dropdown-item" href="#">Italian</a></li>
            <li><a className="dropdown-item" href="#">Fast Food</a></li>
          </ul>
        </div>
      </div>

      <h3 className="fw-bold mb-4">Top Restaurants</h3>

      <div className="row">
        {restaurants.map((res) => (
          <div key={res._id} className="col-md-4 mb-4">
            <div
              className="card h-100 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => openRestaurant(res._id)}
            >
              <img
                src={`http://localhost:5000/uploads/${res.image}`}
                className="card-img-top"
                alt={res.name}
                style={{ height: "250px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">{res.name}</h5>
                <p className="text-muted">{res.cuisine}</p>

                <div className="d-flex justify-content-between">
                  <span>⭐ {res.rating || 4.2}</span>
                  <span>₹{res.avgPrice || 150}</span>
                  <span>30 min</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BiteHome;
