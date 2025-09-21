import React, { useState } from "react";
import "./styles..css";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", form);
        // TODO: Call backend API /api/auth/login
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
