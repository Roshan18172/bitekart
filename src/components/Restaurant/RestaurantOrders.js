import React, { useEffect, useState } from "react";
import axios from "axios";

const RestaurantOrders = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = "https://bitekart-backend-d7yr.onrender.com"

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                `${apiBaseUrl}/api/restaurant-orders/${restaurantId}`
            );
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        //eslint-disable-next-line
    }, []);

    const updateStatus = async (orderId, action) => {
        try {
            await axios.put(
                `${apiBaseUrl}/api/restaurant-orders/${action}/${orderId}`
            );
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="text-center mt-4">Loading orders...</p>;

    return (
        <div className="container my-4">
            <h3 className="mb-4">📦 Restaurant Order Management</h3>

            {orders.length === 0 && <p>No orders yet</p>}

            {orders.map((order) => (
                <div className="card mb-3 shadow-sm" key={order._id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5>Order #{order._id.slice(-6)}</h5>
                            <span className="badge bg-info text-uppercase">
                                {order.status}
                            </span>
                        </div>

                        <hr />

                        {/* Items */}
                        {order.items.map((item, index) => (
                            <p key={index}>
                                {item.name} × {item.quantity} — ₹
                                {item.price * item.quantity}
                            </p>
                        ))}

                        <hr />

                        <p><strong>Total:</strong> ₹{order.total}</p>
                        <p><strong>Payment:</strong> {order.paymentStatus}</p>

                        {/* ACTION BUTTONS */}
                        <div className="d-flex gap-2 mt-3 flex-wrap">
                            {order.status === "pending" && (
                                <>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => updateStatus(order._id, "accept")}
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => updateStatus(order._id, "reject")}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}

                            {order.status === "accepted" && (
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => updateStatus(order._id, "cooking")}
                                >
                                    Start Cooking
                                </button>
                            )}

                            {order.status === "cooking" && (
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => updateStatus(order._id, "dispatch")}
                                >
                                    Dispatch Order
                                </button>
                            )}

                            {order.status === "dispatched" && (
                                <span className="badge bg-success">
                                    Waiting for Delivery
                                </span>
                            )}

                            {order.status === "cancelled" && (
                                <span className="badge bg-danger">Cancelled</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RestaurantOrders;
