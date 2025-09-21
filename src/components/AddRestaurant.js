import React, { useState } from "react";
import "./styles..css";

const AddRestaurant = () => {
    const [form, setForm] = useState({
        name: "",
        address: "",
        cuisine: "",
        priceRange: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Restaurant Data:", form);
        // TODO: send to backend via POST /api/restaurants
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center bgpic" style={{ minHeight: "92vh" }}>
            <div className="card shadow-lg p-4 w-50 mt-2">
                <h2 className="text-center text-danger fw-bold mb-2">Add Your Restaurant 🍴</h2>
                <p className="text-muted text-center mb-3">
                    Fill out the details below to list your restaurant on <span className="fw-bold">BiteKart</span>.
                </p>
                <form onSubmit={handleSubmit}>
                    {/* Restaurant Name */}
                    <div className="mb-3">
                        <label className="form-label">Restaurant Name</label>
                        <input type="text" name="name" className="form-control" placeholder="Enter restaurant name"
                            value={form.name} onChange={handleChange} required />
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea name="address" className="form-control" rows="2" placeholder="Enter full address"
                            value={form.address} onChange={handleChange} required></textarea>
                    </div>

                    {/* Cuisine */}
                    <div className="mb-3">
                        <label className="form-label">Cuisine Type</label>
                        <select name="cuisine" className="form-select" value={form.cuisine} onChange={handleChange} required>
                            <option value="">Select Cuisine</option>
                            <option value="Indian">Indian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Italian">Italian</option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="mb-3">
                        <label className="form-label">Average Price Range</label>
                        <select name="priceRange" className="form-select" value={form.priceRange} onChange={handleChange} required>
                            <option value="">Select Price Range</option>
                            <option value="₹100 - ₹300">₹100 - ₹300</option>
                            <option value="₹300 - ₹600">₹300 - ₹600</option>
                            <option value="₹600 - ₹1000">₹600 - ₹1000</option>
                            <option value="₹1000+">₹1000+</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-3">
                        <label className="form-label">Upload Restaurant Logo/Image</label>
                        <input type="file" name="image" className="form-control" onChange={handleChange} />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-danger w-100">Add Restaurant</button>
                </form>
            </div>
        </div>
    );
};

export default AddRestaurant;
