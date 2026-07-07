import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [editData, setEditData] = useState({});
    const apiBaseUrl = "https://bitekart-backend-d7yr.onrender.com"
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${apiBaseUrl}/api/auth/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
                setEditData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(`${apiBaseUrl}/api/auth/users/update`, editData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(res.data);
            alert("Profile Updated Successfully!");

            document.getElementById("closeModalBtn").click();
        } catch (err) {
            console.error(err);
            alert("Update failed!");
        }
    };

    if (!user) return <h3 className="text-center mt-5">Loading Profile...</h3>;

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center text-primary mb-4">My Profile</h2>

                <div className="row mb-3">
                    <div className="col-md-6"><strong>Name:</strong> {user.name}</div>
                    <div className="col-md-6"><strong>Email:</strong> {user.email}</div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6"><strong>Phone:</strong> {user.phone}</div>
                    <div className="col-md-6"><strong>Address:</strong> {user.address}</div>
                </div>

                <button className="btn btn-primary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#editModal">
                    Edit Profile
                </button>
            </div>

            {/* MODAL */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" className="form-control"
                                    name="name" value={editData.name}
                                    onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" className="form-control"
                                    name="email" value={editData.email}
                                    onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label>Password (optional)</label>
                                <input type="password" className="form-control"
                                    name="password"
                                    placeholder="Enter new password" 
                                    onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label>Phone</label>
                                <input type="text" className="form-control"
                                    name="phone" value={editData.phone}
                                    onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <input type="text" className="form-control"
                                    name="address" value={editData.address}
                                    onChange={handleChange} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button id="closeModalBtn" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
