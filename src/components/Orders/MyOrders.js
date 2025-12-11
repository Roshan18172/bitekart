import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/orders/user/${userId}`
                );
                setOrders(res.data);
            } catch (error) {
                console.error("MY ORDERS ERROR:", error);
            }
        };

        loadOrders();
    }, [userId]);

    if (!orders.length) {
        return (
            <div className="container my-5 text-center">
                <h3>No Orders Found</h3>
                <p>You haven’t placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h3 className="mb-4">My Orders</h3>

            {orders.map((order) => (
                <div key={order._id} className="card mb-3 shadow-sm">
                    <div className="card-body">

                        {/* Order ID + Status */}
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title">
                                Order #{order._id.slice(-10)}
                            </h5>

                            <span
                                className={`badge 
                                    ${order.paymentStatus === "paid" ? "bg-success" :
                                        order.paymentStatus === "unpaid" ? "bg-warning text-dark" :
                                            "bg-secondary"}`}
                            >
                                {order.status.toUpperCase()}
                            </span>
                        </div>

                        <hr />

                        {/* Items List */}
                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                className="d-flex justify-content-between py-1"
                            >
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>

                        ))}
                        <div className="d-flex justify-content-between py-1">
                            <span className="text-muted" style={{ fontSize: "0.9em" }}>
                                (GST: 5%)
                            </span>
                            <span>₹{order.gst} </span>
                        </div>
                        <div className="d-flex justify-content-between py-1">
                            <span className="text-muted" style={{ fontSize: "0.9em" }}>
                                Delivery Charge
                            </span>
                            <span>₹{order.deliveryCharge} </span>
                        </div>

                        <hr />

                        {/* Total Price */}
                        <div className="d-flex justify-content-between">
                            <strong>Total Amount</strong>
                            <strong>₹{order.total}</strong>
                        </div>

                        <p className="text-muted mt-2">
                            Ordered on: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        {/* PAY NOW BUTTON */}
                        {order.paymentStatus === "unpaid" && order.status === "pending" && (
                            <button
                                className="btn btn-success w-100 mt-3"
                                onClick={() => navigate(`/payment/${order._id}`)}
                            >
                                Pay Now
                            </button>
                        )}

                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
