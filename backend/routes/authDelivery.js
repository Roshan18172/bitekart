const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DeliveryPartner = require("../models/DeliveryPartner");

const router = express.Router();
const JWT_SECRET = "mysecretkey";
// Register Delivery Partner
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, vehicleType } = req.body;

        let partner = await DeliveryPartner.findOne({ email });
        if (partner) return res.status(400).json({ msg: "Delivery Partner already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        partner = new DeliveryPartner({ name, email, password: hashedPassword, phone, vehicleType });
        await partner.save();

        const token = jwt.sign({ id: partner._id, role: "delivery" }, JWT_SECRET);

        res.json({ token, partner });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// Login Delivery Partner
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let partner = await DeliveryPartner.findOne({ email });
        if (!partner) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, partner.password);
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: partner._id, role: "delivery" },
            JWT_SECRET,
            { expiresIn: "9h" }
        );

        return res.json({
            success: true,
            msg: "Login successful",
            token,
            userType: "delivery",
            partner: {
                id: partner._id,
                name: partner.name,
                email: partner.email
            }
        });

    } catch (err) {
        return res.status(500).json({ success: false, msg: "Server Error" });
    }
});


module.exports = router;
