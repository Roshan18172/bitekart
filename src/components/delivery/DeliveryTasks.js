import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryTasks = () => {
    const partnerId = localStorage.getItem("partnerId");
    const apiBaseUrl = "https://bitekart-backend-d7yr.onrender.com"

    const [availableOrders, setAvailableOrders] = useState([]);
    const [activeOrder, setActiveOrder] = useState(null);

    const fetchOrders = async () => {
        const res = await axios.get(
            `${apiBaseUrl}/api/delivery/available-orders`
        );
        setAvailableOrders(res.data.orders);
    };

    const fetchActiveOrder = async () => {
        const res = await axios.get(
            `${apiBaseUrl}/api/delivery/active-order/${partnerId}`
        );
        setActiveOrder(res.data);
    };

    useEffect(() => {
        fetchOrders();
        fetchActiveOrder();
        //eslint-disable-next-line
    }, []);

    const acceptOrder = async (orderId) => {
        await axios.put(
            `${apiBaseUrl}/api/delivery/accept-order`,
            { orderId, partnerId }
        );
        fetchActiveOrder();
        fetchOrders();
    };

    const updateStatus = async (status) => {
        await axios.put(
            `${apiBaseUrl}/api/delivery/update-status/${activeOrder._id}`,
            { status }
        );
        fetchActiveOrder();
    };

    return (
        <div className="container mt-4">
            <h3>🚚 Delivery Tasks</h3>

            {/* ACTIVE ORDER */}
            {activeOrder && (
                <div className="card p-3 mb-3">
                    <h5>Active Order</h5>
                    <p>Status: <strong>{activeOrder.status}</strong></p>

                    {/* <p><strong>Status:</strong> {activeOrder.status}</p> */}
                    <p><strong>Customer:</strong> {activeOrder.userId?.name}</p>
                    <p><strong>Phone:</strong> {activeOrder.userId?.phone}</p>
                    <p><strong>Address:</strong> {activeOrder.userId?.address}</p>

                    {activeOrder.status === "assigned" && (
                        <button onClick={() => updateStatus("picked_up")} className="btn btn-warning">
                            Picked Up </button>
                    )}

                    {activeOrder.status === "picked_up" && (
                        <button onClick={() => updateStatus("out_for_delivery")} className="btn btn-info">
                            Out for Delivery </button>
                    )}

                    {activeOrder.status === "out_for_delivery" && (
                        <button onClick={() => updateStatus("reached_location")} className="btn btn-secondary">
                            Reached Location </button>
                    )}

                    {activeOrder.status === "reached_location" && (
                        <button onClick={() => updateStatus("delivered")} className="btn btn-success">
                            Delivered </button>
                    )}
                </div>
            )}

            {/* AVAILABLE ORDERS */}
            {!activeOrder && (
                <>
                    <h5>Available Orders</h5>
                    {availableOrders.length === 0 && <p>No orders available</p>}

                    {availableOrders.map(order => (
                        <div className="card p-3 mb-2" key={order._id}>
                            <p>Order ID: {order._id}</p>
                            <p>Total: ₹{order.total}</p>
                            <p><strong>Customer:</strong> {order.userId?.name || "N/A"}</p>
                            <p><strong>Phone:</strong> {order.userId?.phone || "N/A"}</p>
                            <p><strong>Address:</strong> {order.userId?.address || "N/A"}</p>

                            <p><strong>Total:</strong> ₹{order.total}</p>

                            <button
                                className="btn btn-primary"
                                onClick={() => acceptOrder(order._id)}
                            >
                                Accept Order
                            </button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default DeliveryTasks;