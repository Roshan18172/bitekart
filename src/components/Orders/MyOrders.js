import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

    // CANCEL ORDER
    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/orders/cancel/${orderId}`);

            // Remove from UI instantly
            setOrders((prev) => prev.filter((order) => order._id !== orderId));

            alert("Order cancelled successfully!");
        } catch (error) {
            console.error("CANCEL ORDER ERROR:", error);
            alert("Failed to cancel order");
        }
    };

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
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title">Order #{order._id.slice(-10)}</h5>

                            <Link
                                className="badge bg-primary"
                                to={`/track-order/${order._id}`}
                            >
                                Track Order
                            </Link>

                            <span
                                className={`badge 
                                    ${
                                        order.paymentStatus === "paid"
                                            ? "bg-success"
                                            : order.paymentStatus === "unpaid"
                                            ? "bg-warning text-dark"
                                            : "bg-secondary"
                                    }`}
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
                            <span>₹{order.gst}</span>
                        </div>

                        <div className="d-flex justify-content-between py-1">
                            <span className="text-muted" style={{ fontSize: "0.9em" }}>
                                Delivery Charge
                            </span>
                            <span>₹{order.deliveryCharge}</span>
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

                        {/* PAY + CANCEL BUTTONS */}
                        {order.paymentStatus === "unpaid" &&
                            order.status === "pending" && (
                                <div className="d-flex gap-2 mt-3">
                                    <button
                                        className="btn btn-success w-50"
                                        onClick={() =>
                                            navigate(`/payment/${order._id}`)
                                        }
                                    >
                                        Pay Now
                                    </button>

                                    <button
                                        className="btn btn-danger w-50"
                                        onClick={() =>
                                            handleCancelOrder(order._id)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
