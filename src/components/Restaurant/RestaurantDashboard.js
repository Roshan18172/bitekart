import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const RestaurantDashboard = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [stats, setStats] = useState({
        menuCount: 0,
        orderCount: 0,
        ratingCount: 0,
        todayEarnings: 0,
    });

    const [recentOrders, setRecentOrders] = useState([]);

    const restaurantId = localStorage.getItem("restaurantId"); // saved during login

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
            } catch (error) {
                console.error("Dashboard Load Error:", error);
            }
        };

        fetchData();
    }, [restaurantId]);

    if (!restaurant) return <h3 className="text-center mt-5">Loading...</h3>;

    return (
        <div className="container py-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-danger">🍽️ {restaurant.name} Dashboard</h2>
                <button className="btn btn-outline-danger">Logout</button>
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
                    </div>
                </div>
            </div>

            {/* Stats Section */}
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

            {/* Actions */}
            <div className="text-center my-4">
                <button className="btn btn-danger mx-2 px-4">➕ Add Menu Item</button>
                <button className="btn btn-primary mx-2 px-4">📦 View Orders</button>
                <button className="btn btn-secondary mx-2 px-4">⚙️ Edit Profile</button>
            </div>

            {/* Menu Section */}
            <div className="card shadow my-4 p-3">
                <h4 className="fw-bold mb-3">Menu Items</h4>
                <div className="row">
                    {restaurant.menu.map((item) => (
                        <div className="col-md-3 mb-3" key={item._id}>
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={`http://localhost:5000/uploads/${item.image}`}
                                    className="card-img-top"
                                    alt={item.name}
                                />
                                <div className="card-body">
                                    <h6 className="fw-bold">{item.name}</h6>
                                    <p className="text-muted mb-1">{item.cuisine}</p>
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
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.customerName}</td>
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
