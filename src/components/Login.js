import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [userType, setUserType] = useState(""); // Added userType
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userType) {
      alert("Please select login type!");
      return;
    }

    let url = "";

    // Choose correct URL based on type
    if (userType === "user")
      url = "http://localhost:5000/api/auth/users/login";

    if (userType === "restaurant")
      url = "http://localhost:5000/api/auth/restaurants/login";

    if (userType === "delivery")
      url = "http://localhost:5000/api/auth/deliveries/login";

    try {
      const res = await axios.post(url, form);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", userType);
        // localStorage.setItem("name", res.data.user ? res.data.user.name : res.data.partner ? res.data.partner.name : "");
        if (userType === "restaurant" && res.data.data && res.data.data.name) {
          localStorage.setItem("restaurantName", res.data.data.name);
          localStorage.setItem("restaurantId", res.data.data._id);
        }
        if (userType === "delivery" && res.data.partner ) {
          localStorage.setItem("partnerName", res.data.partner.name);
          localStorage.setItem("partnerId", res.data.partner.id);
        }
        if (userType === "user" && res.data.data) {
          const user = res.data.data;
          localStorage.setItem("userName", user.name);
          localStorage.setItem("userId", user._id);
          localStorage.setItem("userData", JSON.stringify(user));
        }


        // Optional: save additional data
        if (res.data.data) {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
        }

        // Redirect based on user type
        if (userType === "restaurant") {
          navigate("/restaurant-dashboard");
        } else if (userType === "delivery") {
          navigate("/delivery-home");
        } else {
          navigate("/home");
        }
      } else {
        alert("Invalid login credentials!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center bgpic"
      style={{ minHeight: "92vh" }}>
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center text-danger fw-bold mb-3">Login to BiteKart</h2>

        {/* USER TYPE SELECTION */}
        <div className="mb-3">
          <label className="form-label">Login As</label>
          <select
            className="form-select"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="user">User</option>
            <option value="restaurant">Restaurant</option>
            <option value="delivery">Delivery Partner</option>
          </select>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <a href="/register" className="text-danger fw-bold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
