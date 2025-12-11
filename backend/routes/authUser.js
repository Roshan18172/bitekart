const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const JWT_SECRET = "mysecretkey";
// Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, phone, address });
        await user.save();

        const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET );

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: "user" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.json({
            success: true,
            msg: "Login Successful",
            token,
            userType: "user",
            data : user
        });

    } catch (err) {
        return res.status(500).json({ success: false, msg: "Server Error" });
    }
});

router.get("/profile", authMiddleware(), async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

router.put("/update", authMiddleware(), async (req, res) => {
    const updates = req.body;

    // If updating password, hash it
    if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");

    res.json(user);
});


module.exports = router;
