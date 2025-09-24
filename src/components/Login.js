import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
// localStorage.clear();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/restaurants/login", form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", res.data.userType);
        localStorage.setItem("restaurantName", res.data.data.name);

        if (res.data.userType === "restaurant") {
          navigate("/restaurant-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        alert("Invalid login credentials!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again!");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center bgpic" style={{ minHeight: "92vh" }}>
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center text-danger fw-bold mb-3">Login to BiteKart</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email"
              value={form.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter your password"
              value={form.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-danger w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don’t have an account? <a href="/register" className="text-danger fw-bold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
