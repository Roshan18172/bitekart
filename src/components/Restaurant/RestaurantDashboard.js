import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [stats, setStats] = useState({
        menuCount: 0,
        orderCount: 0,
        ratingCount: 0,
        todayEarnings: 0,
    });

    const [recentOrders, setRecentOrders] = useState([]);

    const restaurantId = localStorage.getItem("restaurantId");

    // --------- EDIT PROFILE STATES ----------
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        cuisine: "",
        image: null,
    });
    const [previewImage, setPreviewImage] = useState("");

    // Fetch dashboard data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/auth/restaurants/dashboard/${restaurantId}`
                );

                setRestaurant(res.data.restaurant);
                setStats(res.data.stats);
                setRecentOrders(res.data.recentOrders);

                // preload values
                setEditData({
                    name: res.data.restaurant.name,
                    email: res.data.restaurant.email,
                    phone: res.data.restaurant.phone,
                    address: res.data.restaurant.address,
                    cuisine: res.data.restaurant.cuisine,
                    type: res.data.restaurant.type,
                    image: null,
                });

                setPreviewImage(
                    `http://localhost:5000/uploads/${res.data.restaurant.image}`
                );
            } catch (error) {
                console.error("Dashboard Load Error:", error);
            }
        };

        fetchData();
    }, [restaurantId]);

    // Handle Input Change
    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Handle Image Upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditData({ ...editData, image: file });
        setPreviewImage(URL.createObjectURL(file));
    };

    // Submit Updated Data
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("name", editData.name);
            formData.append("email", editData.email);
            formData.append("phone", editData.phone);
            formData.append("address", editData.address);
            formData.append("cuisine", editData.cuisine);

            if (editData.image) {
                formData.append("image", editData.image);
            }

            const response = await axios.put(
                `http://localhost:5000/api/auth/restaurants/update/${restaurantId}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Profile Updated!");
            setShowModal(false);
            setRestaurant(response.data.restaurant);

        } catch (error) {
            console.error("Update Error:", error);
            alert("Update failed!");
        }
    };

    if (!restaurant) return <h3 className="text-center mt-5">Loading...</h3>;

    return (
        <div className="container py-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-danger">🍽️ {restaurant.name} Dashboard</h2>
            </div>

            {/* Restaurant Info */}
            <div className="card shadow mb-4 p-3">
                <h4 className="fw-bold mb-3">Restaurant Details</h4>
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={`http://localhost:5000/uploads/${restaurant.image}`}
                            alt="Restaurant"
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-8">
                        <p><strong>Name:</strong> {restaurant.name}</p>
                        <p><strong>Email:</strong> {restaurant.email}</p>
                        <p><strong>Phone:</strong> {restaurant.phone}</p>
                        <p><strong>Address:</strong> {restaurant.address}</p>
                        <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="row g-3">
                <div className="col-md-3">
                    <div className="card shadow p-3 text-center">
                        <h5>Total Menu</h5>
                        <span className="fs-3 fw-bold text-danger">{stats.menuCount}</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3 text-center">
                        <h5>Total Orders</h5>
                        <span className="fs-3 fw-bold text-primary">{stats.orderCount}</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3 text-center">
                        <h5>User Ratings</h5>
                        <span className="fs-3 fw-bold text-success">{stats.ratingCount}</span>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow p-3 text-center">
                        <h5>Today's Earnings</h5>
                        <span className="fs-3 fw-bold text-warning">₹{stats.todayEarnings}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center my-4">
                <button className="btn btn-danger mx-2 px-4">
                    <Link className="nav-link active" to="/restaurant/menu-manager">➕ Add Menu Item</Link>
                </button>

                <button className="btn btn-primary mx-2 px-4">
                    <Link className="nav-link active" to="/manage-orders">📦 View Orders</Link>
                </button>

                <button
                    className="btn btn-secondary mx-2 px-4"
                    onClick={() => setShowModal(true)}
                >
                    ⚙️ Edit Profile
                </button>
            </div>

            {/* ----------------------------------
                EDIT PROFILE MODAL  
            ------------------------------------ */}
            {showModal && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content p-3">

                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>

                            <div className="modal-body">
                                <div className="row">
                                    {/* Image Preview */}
                                    <div className="col-md-4">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="img-fluid rounded mb-3"
                                        />
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    {/* Form Fields */}
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Restaurant Name"
                                            className="form-control mb-2"
                                            value={editData.name}
                                            onChange={handleChange}
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="form-control mb-2"
                                            value={editData.email}
                                            onChange={handleChange}
                                        />

                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone"
                                            className="form-control mb-2"
                                            value={editData.phone}
                                            onChange={handleChange}
                                        />

                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            className="form-control mb-2"
                                            value={editData.address}
                                            onChange={handleChange}
                                        />

                                        <input
                                            type="text"
                                            name="cuisine"
                                            placeholder="Cuisine Type"
                                            className="form-control mb-2"
                                            value={editData.cuisine}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-success" onClick={handleUpdate}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Menu Section */}
            <div className="card shadow my-4 p-3">
                <h4 className="fw-bold mb-3">Menu Items</h4>
                <div className="row">
                    {restaurant.menu.map((item) => (
                        <div className="col-md-3 mb-3" key={item._id}>
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={`http://localhost:5000/uploads/${item.image}`}
                                    className="card-img-top fixed-img-height"
                                    alt={item.name}
                                    height="200"
                                />
                                <div className="card-body">
                                    <h6 className="fw-bold">{item.name}</h6>
                                    <p className="text-muted mb-1">{item.cuisine}</p>
                                    <p className={`badge ${ item.type === "veg" ? "bg-success" : "bg-danger" }`}>{item.type}</p>
                                    <p className="fw-bold">₹{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            <div className="card shadow p-3 mb-5">
                <h4 className="fw-bold mb-3">Recent Orders</h4>

                {recentOrders.length === 0 ? (
                    <p className="text-muted">No recent orders.</p>
                ) : (
                    <table className="table table-bordered">
                        <thead className="table-danger">
                            <tr>
                                <th>Order ID</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>₹{order.total}</td>
                                    <td>
                                        <span className="badge bg-success">{order.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
};

export default RestaurantDashboard;
