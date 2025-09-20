import React, { useState } from "react";
import "./styles..css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", form);
    // TODO: Call backend API /api/auth/register
  };

  return (
    <div className="container d-flex justify-content-center align-items-center bgpic" style={{ minHeight: "90vh" }}>
      <div className="card shadow-lg p-3 w-50">
        <h2 className="text-center text-danger fw-bold mb-3">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" placeholder="Enter your name"
              value={form.name} onChange={handleChange} required />
          </div>

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

          <div className="mb-3">
            <label className="form-label">Register As</label>
            <select name="role" className="form-select" value={form.role} onChange={handleChange}>
              <option value="customer">Customer</option>
              <option value="restaurant_owner">Restaurant Owner</option>
              <option value="delivery">Delivery Partner</option>
            </select>
          </div>

          <button type="submit" className="btn btn-danger w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-danger fw-bold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
