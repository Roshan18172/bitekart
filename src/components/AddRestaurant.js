import React, { useState } from "react";
import axios from "axios";

const AddRestaurant = () => {
    const [form, setForm] = useState({
        name: "",
        address: "",
        cuisine: "",
        priceRange: "",
        image: null,
    });

    const [menuItems, setMenuItems] = useState([
        { name: "", type: "veg", price: "", cuisine: "", description: "", image: null }
    ]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleMenuChange = (index, e) => {
        const { name, value, files } = e.target;
        const updatedMenu = [...menuItems];
        updatedMenu[index][name] = files ? files[0] : value;
        setMenuItems(updatedMenu);
    };

    const addMenuItem = () => {
        setMenuItems([
            ...menuItems,
            { name: "", type: "veg", price: "", cuisine: "", description: "", image: null }
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        // Restaurant details
        data.append("name", form.name);
        data.append("address", form.address);
        data.append("cuisine", form.cuisine);
        data.append("priceRange", form.priceRange);
        if (form.image) data.append("image", form.image);

        // Menu items (JSON + images)
        data.append("menu", JSON.stringify(menuItems.map(item => ({
            name: item.name,
            type: item.type,
            price: item.price,
            cuisine: item.cuisine,
            description: item.description
        }))));

        // Append images separately
        menuItems.forEach((item, index) => {
            if (item.image) {
                data.append(`menuImage_${index}`, item.image);
            }
        });

        try {
            const res = await axios.post("http://localhost:5000/api/restaurants/add", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Restaurant Added Successfully!");
            console.log(res.data);

        } catch (err) {
            console.error(err);
            alert("Error adding restaurant");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-danger fw-bold">Add Your Restaurant 🍴</h2>

                <form onSubmit={handleSubmit}>

                    {/* Restaurant Details */}
                    <div className="mb-3">
                        <label>Restaurant Name</label>
                        <input type="text" name="name" className="form-control"
                            value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label>Address</label>
                        <textarea name="address" className="form-control"
                            value={form.address} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label>Cuisine Type</label>
                        <select name="cuisine" className="form-select"
                            value={form.cuisine} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option>Indian</option>
                            <option>Chinese</option>
                            <option>Italian</option>
                            <option>Fast Food</option>
                            <option>Bakery</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Price Range</label>
                        <select name="priceRange" className="form-select"
                            value={form.priceRange} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option>₹100 - ₹300</option>
                            <option>₹300 - ₹600</option>
                            <option>₹600 - ₹1000</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Restaurant Image</label>
                        <input type="file" name="image" className="form-control" onChange={handleChange} />
                    </div>

                    <hr />

                    {/* Menu Section */}
                    <h4 className="text-danger">Menu Items</h4>

                    {menuItems.map((item, index) => (
                        <div key={index} className="card p-3 mb-3 border rounded">
                            <h5>Menu Item {index + 1}</h5>

                            <input type="text" name="name" className="form-control mb-2"
                                placeholder="Item name"
                                value={item.name} onChange={(e) => handleMenuChange(index, e)} />

                            <select name="type" className="form-select mb-2"
                                value={item.type} onChange={(e) => handleMenuChange(index, e)}>
                                <option value="veg">Veg</option>
                                <option value="nonveg">Non-Veg</option>
                            </select>

                            <input type="number" name="price" className="form-control mb-2"
                                placeholder="Price"
                                value={item.price} onChange={(e) => handleMenuChange(index, e)} />

                            <input type="text" name="cuisine" className="form-control mb-2"
                                placeholder="Cuisine (e.g., North Indian)"
                                value={item.cuisine} onChange={(e) => handleMenuChange(index, e)} />

                            <textarea name="description" className="form-control mb-2"
                                placeholder="Description"
                                value={item.description} onChange={(e) => handleMenuChange(index, e)} />

                            <input type="file" name="image" className="form-control"
                                onChange={(e) => handleMenuChange(index, e)} />
                        </div>
                    ))}

                    <button type="button" className="btn btn-warning mb-3"
                        onClick={addMenuItem}>
                        + Add More Menu Items
                    </button>

                    <button type="submit" className="btn btn-danger w-100">
                        Add Restaurant
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRestaurant;
