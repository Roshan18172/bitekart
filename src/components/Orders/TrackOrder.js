import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
            setOrder(res.data);
        } catch (error) {
            console.error("TRACK ORDER ERROR:", error);
        }
    };

    const steps = ["Accepted", "Cooking", "Picked Up", "Out for Delivery", "Delivered"];

    const statusMap = {
        accepted: 0,

        cooking: 1,
        ready_for_pickup: 1,

        assigned: 1,

        picked_up: 2,          // 🟡 NEW STEP
        out_for_delivery: 3,
        reached_location: 3,

        delivered: 4
    };

    const getStatusIndex = () => statusMap[order?.status] ?? -1;
    // const getStatusIndex = () => steps.indexOf(order?.status);

    if (!order) {
        return (
            <div className="container text-center mt-5">
                <h4>Loading Order...</h4>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h3 className="fw-bold mb-3">Track Your Order</h3>

            {/* ORDER ID */}
            <p className="text-muted">Order ID: #{order._id.slice(-10)}</p>

            {/* STATUS TRACKING */}
            <div className="d-flex justify-content-between mt-4 mb-4">
                {steps.map((step, index) => (
                    <div key={index} className="text-center" style={{ width: "25%" }}>
                        <div
                            className={`rounded-circle mx-auto mb-2 p-3 
                                ${index <= getStatusIndex() ? "bg-success text-white" : "bg-secondary text-white"}`}
                            style={{ width: "50px", height: "50px" }}
                        >
                            {index + 1}
                        </div>
                        <small>{step}</small>
                    </div>
                ))}
            </div>

            <hr />

            {/* DELIVERY PARTNER INFO */}
            <div className="mt-4">
                <h5 className="fw-bold">Delivery Partner</h5>
                <p className="m-0">
                    <strong>Name:</strong> {order.deliveryPartner?.name || "Not Assigned"}
                </p>
                <p className="m-0">
                    <strong>Mobile:</strong> {order.deliveryPartner?.phone || "Not Available"}
                </p>
            </div>

            <hr />

            {/* MAP SECTION */}
            <h5 className="fw-bold mt-4">Live Delivery Map</h5>
            <div className="mt-2 mb-2">
                <iframe
                    src="https://maps.google.com/maps?q=India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%" height="300"
                    className="rounded" style={{ border: 0 }}
                    allowFullScreen loading="lazy"></iframe>
            </div>
            <hr />
            {/* ORDER SUMMARY */}
            <h5 className="fw-bold mt-4">Order Summary</h5>

            {order.items.map((item, index) => (
                <div
                    key={index}
                    className="d-flex justify-content-between py-1 border-bottom"
                >
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                </div>
            ))}

            <div className="d-flex justify-content-between mt-3 mb-3">
                <strong>Total:</strong>
                <strong>₹{order.total}</strong>
            </div>

        </div>
    );
};

export default TrackOrder;
