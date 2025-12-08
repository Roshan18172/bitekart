import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const DeliveryPartnerDashboard = () => {
    // const navigate = useNavigate();

    const [partnerName, setPartnerName] = useState("");
    const [availability, setAvailability] = useState(true);
    const [orders, setOrders] = useState([]);
    const [earnings, setEarnings] = useState(0);

    useEffect(() => {
        const name = localStorage.getItem("partnerName");
        setPartnerName(name || "Delivery Partner");

        fetchOrders();
        fetchEarnings();
    }, []);

    // Fetch assigned orders
    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/delivery/orders");
            setOrders(res.data.orders);
        } catch (error) {
            console.error(error);
            alert("Error fetching orders");
        }
    };

    // Fetch earnings
    const fetchEarnings = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/delivery/earnings");
            setEarnings(res.data.earnings);
        } catch (error) {
            console.error(error);
        }
    };

    // Update delivery status
    const updateStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/delivery/update-status/${orderId}`, {
                status: newStatus,
            });
            alert("Status updated!");
            fetchOrders();
        } catch (error) {
            console.error(error);
            alert("Error updating status");
        }
    };

   
    return (
        <div className="container mt-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-danger">🚴 Delivery Partner Dashboard</h2>
            </div>

            {/* Welcome Card */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h4>Hello, <span className="text-danger">{partnerName}</span> 👋</h4>
                    <p>Manage your deliveries and track your activity here.</p>

                    {/* Availability Toggle */}
                    <button
                        className={`btn ${availability ? "btn-success" : "btn-secondary"}`}
                        onClick={() => setAvailability(!availability)}
                    >
                        {availability ? "🟢 Available" : "⚪ Go Available"}
                    </button>
                </div>
            </div>

            {/* Earnings Section */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="fw-bold">💰 Earnings</h5>
                    <h2 className="text-success">₹ {earnings}</h2>
                </div>
            </div>

            {/* Assigned Orders */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-3">📦 Assigned Orders</h5>

                    {orders.length === 0 ? (
                        <p className="text-muted">No assigned orders yet.</p>
                    ) : (
                        <div className="list-group">
                            {orders.map((order) => (
                                <div className="list-group-item mb-2 shadow-sm" key={order._id}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h6 className="fw-bold">Order #{order.orderId}</h6>
                                            <p className="mb-1">Restaurant: <strong>{order.restaurantName}</strong></p>
                                            <p className="mb-1">Customer: <strong>{order.customerName}</strong></p>
                                            <p className="mb-1">Address: {order.address}</p>
                                            <p className="mb-1">Status:
                                                <span className="text-primary fw-bold"> {order.status}</span>
                                            </p>
                                        </div>

                                        {/* Status Update Buttons */}
                                        <div>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => updateStatus(order._id, "Picked Up")}
                                            >
                                                Picked Up
                                            </button>

                                            <button
                                                className="btn btn-info btn-sm me-2"
                                                onClick={() => updateStatus(order._id, "On the Way")}
                                            >
                                                On the Way
                                            </button>

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => updateStatus(order._id, "Delivered")}
                                            >
                                                Delivered
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DeliveryPartnerDashboard;
