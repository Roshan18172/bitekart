import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuManager = () => {
    const restaurantId = localStorage.getItem("restaurantId");

    // MISSING — now added
    const [restaurant, setRestaurant] = useState(null);

    const [menu, setMenu] = useState([]);
    const [form, setForm] = useState({
        name: "",
        type: "veg",
        price: "",
        cuisine: "",
        description: "",
        image: null,
    });

    const [editItem, setEditItem] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);

    // ------------------ Fetch Restaurant + Menu ------------------
    useEffect(() => {
        if (!restaurantId) {
            console.error("Restaurant ID missing in localStorage");
            return;
        }

        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/auth/restaurants/${restaurantId}`
                );

                // Backend may return either:
                // { restaurant: {...} } OR direct restaurant object
                const data = res.data.restaurant ? res.data.restaurant : res.data;

                setRestaurant(data);
                setMenu(data.menu || []);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchRestaurant();
    }, [restaurantId]);

    // ------------------ Input Handler ------------------
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    // ------------------ Add Menu Item ------------------
    const handleAddMenu = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("name", form.name);
        data.append("type", form.type);
        data.append("price", form.price);
        data.append("cuisine", form.cuisine);
        data.append("description", form.description);

        if (form.image) data.append("image", form.image);

        try {
            const res = await axios.post(
                `http://localhost:5000/api/auth/restaurants/${restaurantId}/menu`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setMenu(res.data.menu);
            alert("Menu item added!");

            setForm({
                name: "",
                type: "veg",
                price: "",
                cuisine: "",
                description: "",
                image: null,
            });
        } catch (err) {
            console.error("Add error:", err);
            alert(err.response?.data?.msg || "Error Adding Item");
        }
    };

    // ------------------ Update Menu Item ------------------
    const handleUpdate = async () => {
        const data = new FormData();

        Object.keys(editItem).forEach((key) => {
            if (key === "image" && editItem[key] instanceof File) {
                data.append("image", editItem[key]);
            } else {
                data.append(key, editItem[key]);
            }
        });

        try {
            const res = await axios.put(
                `http://localhost:5000/api/auth/restaurants/${restaurantId}/menu/${editItem._id}`,
                data
            );

            setMenu(res.data.menu);
            alert("Item updated!");
            setEditItem(null);
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    // ------------------ Delete Menu Item ------------------
    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:5000/api/auth/restaurants/${restaurantId}/menu/${deleteItemId}`
            );

            setMenu(menu.filter((item) => item._id !== deleteItemId));

            alert("Item deleted!");
            setDeleteItemId(null);
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // ------------------ UI ------------------
    return (
        <div className="container mt-4">
            <h2 className="text-danger fw-bold">🍽 Menu Management</h2>

            {/* ------------ ADD MENU FORM ------------ */}
            <form className="card shadow p-4 mt-3" onSubmit={handleAddMenu}>
                <h4>Add New Item</h4>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            required
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label>Type</label>
                        <select
                            name="type"
                            className="form-select"
                            value={form.type}
                            onChange={handleChange}
                        >
                            <option value="veg">Veg</option>
                            <option value="nonveg">Non-Veg</option>
                        </select>
                    </div>

                    <div className="col-md-3 mb-3">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            required
                            value={form.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Cuisine</label>
                        <select
                            name="cuisine"
                            className="form-select"
                            value={form.cuisine}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Cuisine</option>
                            <option value="Indian">Indian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Italian">Italian</option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label>Image</label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-danger w-100">Add Item</button>
            </form>

            {/* ------------ MENU LIST ------------ */}
            <h3 className="mt-4">📋 Menu Items</h3>
            <div className="row mt-3">
                {menu.map((item) => (
                    <div className="col-md-4 mb-4" key={item._id}>
                        <div className="card shadow-sm">
                            {item.image && (
                                <img
                                    src={`http://localhost:5000/uploads/${item.image}`}
                                    className="card-img-top"
                                    alt=""
                                    height="180"
                                />
                            )}

                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                <h5>{item.name}</h5>
                                <p className="text-muted">{item.cuisine}</p>
                                </div>

                                <span 
                                    className={`badge ${
                                        item.type === "veg"
                                            ? "bg-success"
                                            : "bg-danger"
                                    }`}
                                >
                                    {item.type}
                                </span>
                                <span className="mt-2 fw-bold"> ₹ {item.price}</span>
                                {/* <p>{item.description}</p> */}
                                <div className="mt-3 d-flex justify-content-between">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => setEditItem(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            setDeleteItemId(item._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ------------ EDIT MODAL ------------ */}
            {editItem && (
                <div
                    className="modal d-block"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h4>Edit Item</h4>

                            <input
                                className="form-control my-2"
                                name="name"
                                value={editItem.name}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <input
                                className="form-control my-2"
                                name="price"
                                type="number"
                                value={editItem.price}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        price: e.target.value,
                                    })
                                }
                            />

                            <select
                                className="form-select my-2"
                                value={editItem.cuisine}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        cuisine: e.target.value,
                                    })
                                }
                            >
                                <option value="Indian">Indian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Italian">Italian</option>
                                <option value="Fast Food">Fast Food</option>
                                <option value="Bakery">Bakery</option>
                                <option value="Other">Other</option>
                            </select>

                            <textarea
                                className="form-control my-2"
                                name="description"
                                value={editItem.description}
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        description: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="file"
                                className="form-control my-2"
                                onChange={(e) =>
                                    setEditItem({
                                        ...editItem,
                                        image: e.target.files[0],
                                    })
                                }
                            />

                            <div className="text-end mt-3">
                                <button
                                    className="btn btn-secondary me-2"
                                    onClick={() => setEditItem(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ------------ DELETE MODAL ------------ */}
            {deleteItemId && (
                <div
                    className="modal d-block"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-4">
                            <h5 className="text-danger">Confirm Delete?</h5>
                            <p>This action cannot be undone.</p>

                            <div className="text-end">
                                <button
                                    className="btn btn-secondary me-3"
                                    onClick={() => setDeleteItemId(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuManager;
