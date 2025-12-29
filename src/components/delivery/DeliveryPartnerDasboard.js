import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryPartnerDashboard = () => {

    const [partnerName, setPartnerName] = useState("");
    const [availability, setAvailability] = useState(true);
    const [earnings, setEarnings] = useState(0);

    const partnerId = localStorage.getItem("partnerId");

    useEffect(() => {
        const name = localStorage.getItem("partnerName");
        setPartnerName(name || "Delivery Partner");
        fetchEarnings();
    }, []);

    // Fetch earnings
    const fetchEarnings = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/delivery/earnings/${partnerId}`);
            setEarnings(res.data.earnings);
        } catch (error) {
            console.error(error);
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
                <div className="card-body ">
                    <button className="btn btn-primary">Withdraw</button>
                </div>
            </div>

            {/* Assigned Orders */}
            
        </div>
    );
};

export default DeliveryPartnerDashboard;
