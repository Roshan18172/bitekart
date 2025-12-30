const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DeliveryPartner = require("../models/DeliveryPartner");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const JWT_SECRET = "mysecretkey";


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

module.exports = upload;
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

/* ---------------- GET PARTNER PROFILE ---------------- */
router.get("/profile/:id", async (req, res) => {
    try {
        const partner = await DeliveryPartner.findById(req.params.id);
        res.json({ success: true, partner });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

/* ---------------- UPDATE PARTNER PROFILE ---------------- */
router.put("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const updates = {
            name: req.body.name,
            phone: req.body.phone,
            vehicleType: req.body.vehicleType
        };

        if (req.file) {
            updates.image = req.file.filename;
        }

        const partner = await DeliveryPartner.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        res.json({ success: true, partner });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Update failed" });
    }
});

module.exports = router;
