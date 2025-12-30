import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryPartnerDashboard = () => {
    const partnerId = localStorage.getItem("partnerId");

    const [partner, setPartner] = useState(null);
    const [earnings, setEarnings] = useState(0);
    const [availability, setAvailability] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        phone: "",
        vehicleType: "",
        image: null
    });
    const [preview, setPreview] = useState("");

    useEffect(() => {
        fetchProfile();
        fetchEarnings();
    }, []);

    const fetchProfile = async () => {
        const res = await axios.get(
            `http://localhost:5000/api/auth/deliveries/profile/${partnerId}`
        );
        setPartner(res.data.partner);

        setEditData({
            name: res.data.partner.name,
            phone: res.data.partner.phone,
            vehicleType: res.data.partner.vehicleType,
            image: null
        });

        setPreview(`http://localhost:5000/uploads/${res.data.partner.image}`);
    };

    const fetchEarnings = async () => {
        const res = await axios.get(
            `http://localhost:5000/api/delivery/earnings/${partnerId}`
        );
        setEarnings(res.data.earnings);
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", editData.name);
        formData.append("phone", editData.phone);
        formData.append("vehicleType", editData.vehicleType);
        if (editData.image) formData.append("image", editData.image);

        await axios.put(
            `http://localhost:5000/api/auth/deliveries/update/${partnerId}`,
            formData
        );

        alert("Profile updated");
        setShowModal(false);
        fetchProfile();
    };

    if (!partner) return <h4 className="text-center mt-5">Loading...</h4>;

    return (
        <div className="container mt-4">

            <h2 className="fw-bold text-danger mb-4">🚴 Delivery Partner Dashboard</h2>

            {/* PROFILE CARD */}
            <div className="card shadow-sm mb-4">
                <div className="card-body d-flex align-items-center">
                    <img
                        src={preview}
                        alt="profile"
                        className="rounded-circle me-3"
                        width="90"
                        height="90"
                    />
                    <div className="flex-grow-1">
                        <h5 className="fw-bold mb-1">{partner.name}</h5>
                        <p className="mb-1">📞 {partner.phone}</p>
                        <p className="mb-1">🚲 {partner.vehicleType}</p>
                    </div>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowModal(true)}
                    >
                        ✏️ Edit
                    </button>
                </div>
            </div>

            {/* AVAILABILITY */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <button
                        className={`btn ${availability ? "btn-success" : "btn-secondary"}`}
                        onClick={() => setAvailability(!availability)}
                    >
                        {availability ? "🟢 Available" : "⚪ Go Available"}
                    </button>
                </div>
            </div>

            {/* EARNINGS */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="fw-bold">💰 Earnings</h5>
                    <h2 className="text-success">₹ {earnings}</h2>
                    <button className="btn btn-primary mt-2">Withdraw</button>
                </div>
            </div>

            {/* EDIT MODAL */}
            {showModal && (
                <div className="modal fade show d-block" style={{ background: "#00000080" }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h5>Edit Profile</h5>

                            <input
                                className="form-control mb-2"
                                placeholder="Name"
                                value={editData.name}
                                onChange={e => setEditData({ ...editData, name: e.target.value })}
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="Phone"
                                value={editData.phone}
                                onChange={e => setEditData({ ...editData, phone: e.target.value })}
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="Vehicle Type"
                                value={editData.vehicleType}
                                onChange={e => setEditData({ ...editData, vehicleType: e.target.value })}
                            />

                            <input
                                type="file"
                                className="form-control mb-2"
                                onChange={e => {
                                    setEditData({ ...editData, image: e.target.files[0] });
                                    setPreview(URL.createObjectURL(e.target.files[0]));
                                }}
                            />

                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-success" onClick={handleUpdate}>
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DeliveryPartnerDashboard;
