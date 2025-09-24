import React, { useState, useEffect } from "react";
import axios from "axios";

function RestaurantDashboard() {
    const [menu, setMenu] = useState([]);
    const [form, setForm] = useState({
        name: "",
        type: "veg",
        price: "",
        cuisine: "",
        description: "",
        image: null,
    });

    // For Editing
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const token = localStorage.getItem("restaurantToken");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    // Replace with actual restaurant ID after implementing authentications
    const restaurantId = "replace_with_loggedIn_restaurant_id"; // get from JWT/localStorage

    // Fetch menu items
    useEffect(() => {
        axios.get(`http://localhost:5000/api/restaurants/${restaurantId}`)
            .then((res) => setMenu(res.data.menu))
            .catch((err) => console.error(err));
    }, [restaurantId, token]);

    // Handle form input
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Add Menu Item
    const addMenuItem = async () => {
        const formData = new FormData();
        for (let key in form) formData.append(key, form[key]);

        try {
            const res = await axios.post(
                `http://localhost:5000/api/restaurants/${restaurantId}/menu`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setMenu(res.data.menu);
            setForm({ name: "", type: "veg", price: "", cuisine: "", description: "", image: null });
        } catch (err) {
            console.error(err);
        }
    };
    // Delete Menu Item
    const handleDelete = async (itemId) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/restaurants/${restaurantId}/menu/${itemId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMenu({ ...menu, menu: res.data.menu });
        } catch (err) {
            console.error(err);
        }
    };
    // Open Edit Modal
    const openEditModal = (item) => {
        setEditItem(item);
        setShowEditModal(true);
    };
    // Save Edit
    const handleEditSave = async () => {
        try {
            const formData = new FormData();
            Object.keys(editItem).forEach((key) => {
                formData.append(key, editItem[key]);
            });

            const res = await axios.put(
                `http://localhost:5000/api/restaurants/${restaurantId}/menu/${editItem._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMenu({ ...menu, menu: res.data.menu });
            setShowEditModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">🍽 Restaurant Dashboard</h2>

            <div className="card shadow-lg p-4 mb-5">
                <h4 className="mb-3">Add New Menu Item</h4>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Item Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control"
                            placeholder="Enter item name" required />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label">Type</label>
                        <select name="type" className="form-select" value={form.type} onChange={handleChange} required >
                            <option value="veg">Veg</option>
                            <option value="nonveg">Non-Veg</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <label className="form-label">Price (₹)</label>
                        <input type="number" name="price" value={form.price} onChange={handleChange}
                            className="form-control" placeholder="Price" required />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Cuisine Type</label>
                        <select name="cuisine" className="form-select" value={form.cuisine} onChange={handleChange} required >
                            <option value="">Select Cuisine</option>
                            <option value="Indian">Indian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Italian">Italian</option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange}
                            className="form-control" placeholder="Enter item description" rows="2"></textarea>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Upload Image</label>
                        <input type="file" name="image" className="form-control" accept="image/*" onChange={handleChange} />
                    </div>

                    <div className="col-md-6 d-flex align-items-end">
                        <button className="btn btn-success w-100" onClick={addMenuItem}>➕ Add Item</button>
                    </div>
                </div>
            </div>

            <h4 className="mb-3">📋 Current Menu</h4>
            <div className="row">
                {menu.length > 0 ? (
                    menu.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                {item.image && (
                                    <img src={`http://localhost:5000/uploads/${item.image}`} className="card-img-top"
                                        alt={item.name} style={{ height: "200px", objectFit: "cover" }} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {item.name}{" "}
                                        <span className={`badge ${item.type === "veg" ? "bg-success" : "bg-danger"}`}>
                                            {item.type}</span>
                                    </h5>
                                    <p className="card-text">{item.description || "No description provided"}</p>
                                    <p><strong>₹{item.price}</strong> | {item.cuisine}</p>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(item)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)} >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items added yet.</p>
                )}
            </div>
            {editItem && (
                <div className="modal fade show" id="editModal" tabIndex="-1"
                    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Item</h5>
                                <button type="button" className="btn-close" onClick={() => setEditItem(null)} ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Item Name</label>
                                    <input type="text" className="form-control" value={editItem.name}
                                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value }) } />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input type="number" className="form-control" value={editItem.price}
                                        onChange={(e) => setEditItem({ ...editItem, price: e.target.value }) } />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Cuisine</label>
                                    <select className="form-select" value={editItem.cuisine}
                                        onChange={(e) => setEditItem({ ...editItem, cuisine: e.target.value }) } >
                                        <option value="Indian">Indian</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Fast Food">Fast Food</option>
                                        <option value="Bakery">Bakery</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Type</label>
                                    <select className="form-select" value={editItem.type}
                                        onChange={(e) => setEditItem({ ...editItem, type: e.target.value }) } >
                                        <option value="veg">Veg</option>
                                        <option value="nonveg">Non-Veg</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Change Image</label>
                                    <input type="file" className="form-control"
                                        onChange={(e) => setEditItem({ ...editItem, image: e.target.files[0] })}  />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setEditItem(null)} >Close </button>
                                <button className="btn btn-primary" onClick={handleEditSave} > Save Changes </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantDashboard;
